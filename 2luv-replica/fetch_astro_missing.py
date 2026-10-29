#!/usr/bin/env python
"""
Mirror the _astro / _lazy modules that later pages reference but the first seven
never pulled in (BlogImageLightbox, client.svelte, MyGiftsSearchIsland, the
season landing bundles, ...).

Scans every built page for module references, fetches what is missing, then walks
each file's own imports until the graph closes.
"""
import glob
import os
import posixpath
import re
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ORIGIN = "https://www.2-luv.com"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

REF = re.compile(r'["\']/?((?:assets/)?(?:_astro|_lazy)/[A-Za-z0-9._\-/]+\.js)')
SKIP_DIRS = {"_htmlcache", "_app", "_bundle", "assets", "features"}


def local_for(origin_path):
    """Origin path (/_astro/x.js) -> stored path (assets/_astro/x.js)."""
    return os.path.join(HERE, "assets", origin_path.lstrip("/").replace("/", os.sep))


def origin_of(ref):
    """Normalise any reference into an origin path (/...)."""
    if ref.startswith("/"):
        return ref
    if ref.startswith("assets/"):
        return "/" + ref[len("assets/"):]
    return "/" + ref


# ---- collect seeds -------------------------------------------------------
# The ORIGIN html is authoritative: an earlier build stripped the module tags
# out of pages that never got a bundle, so scanning the built tree would find
# nothing and those pages would stay without JavaScript forever.
seeds = set()
pages = 0
sources = glob.glob(os.path.join(HERE, "_htmlcache", "*.html")) + \
          glob.glob(os.path.join(HERE, "**", "index.html"), recursive=True)
for page in sources:
    rel = os.path.relpath(page, HERE).replace(os.sep, "/")
    if any(part in SKIP_DIRS for part in rel.split("/")[:-1]) and not rel.startswith("_htmlcache/"):
        continue
    pages += 1
    text = open(page, encoding="utf-8", errors="replace").read()
    for match in REF.findall(text):
        seeds.add(origin_of(match))

print("pages scanned: %d   module refs found: %d" % (pages, len(seeds)))

# ---- fetch, then walk imports -------------------------------------------
queue = sorted(seeds)
seen, pulled, failed = set(), 0, []
while queue:
    site_path = queue.pop(0)          # origin path, e.g. /_astro/x.js
    if site_path in seen:
        continue
    seen.add(site_path)
    dest = local_for(site_path)
    if os.path.isfile(dest):
        data = open(dest, "rb").read()
    else:
        req = urllib.request.Request(ORIGIN + site_path,
                                     headers={"User-Agent": UA, "Accept": "*/*"})
        try:
            with urllib.request.urlopen(req, timeout=40) as resp:
                data = resp.read()
        except Exception:
            failed.append(site_path)
            continue
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, "wb") as fh:
            fh.write(data)
        pulled += 1

    if not site_path.endswith(".js"):
        continue
    text = data.decode("utf-8", "replace")
    base = posixpath.dirname(site_path)
    for spec in set(re.findall(r'(?:from\s*|import\s*\(?\s*)["\']([^"\']+\.js)["\']', text)):
        if spec.startswith("/"):
            queue.append(spec)
        elif spec.startswith(("/", "./", "../")):
            queue.append(posixpath.normpath(posixpath.join(base, spec)))
        elif re.match(r"^(?:_astro|_lazy|chunks)/", spec):
            queue.append("/" + spec)
        elif "/" not in spec:
            queue.append(posixpath.normpath(posixpath.join(base, spec)))

print("modules pulled: %d   failed: %d" % (pulled, len(failed)))
for f in failed[:8]:
    print("   ! " + f)
