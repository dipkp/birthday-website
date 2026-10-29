#!/usr/bin/env python
"""
Mirror the SvelteKit client bundle for the create page.

The page ships an inline __sveltekit_* bootstrap that imports
/_app/immutable/entry/*.js and then the route nodes. Without those files the
markup is styled (after repair_create.py) but never hydrates, so the theme
switcher, wizard steps and preview do nothing.

Fetches the entry graph breadth-first, following relative and root-absolute
specifiers, and stores everything under <replica>/_app/ so the page's own
"../_app/..." links resolve.
"""
import os
import posixpath
import re
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ORIGIN = "https://www.2-luv.com"
SOURCE = os.path.join(HERE, "..", "2luv_create.html")
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
CAP = 600

src = open(SOURCE, encoding="utf-8").read()

# every _app specifier mentioned anywhere in the markup / inline scripts
seeds = set(re.findall(r"[\"']((?:\.{0,2}/)*_app/immutable/[^\"']+?\.js)[\"']", src))
seeds |= set(re.findall(r"base\s*:\s*new URL\(\"([^\"]+)\"", src) and [])
print("seed entries from markup: %d" % len(seeds))
for s in sorted(seeds):
    print("   " + s)

done, failed = set(), []
queue = [(s if s.startswith("/") else posixpath.normpath("/" + s)) for s in seeds]
queue = [q for q in queue if q.startswith("/_app/")]
seen = set()


def local_for(path):
    return os.path.join(HERE, path.lstrip("/").replace("/", os.sep))


while queue and len(done) < CAP:
    path = queue.pop(0)
    if path in seen:
        continue
    seen.add(path)
    dest = local_for(path)
    if os.path.isfile(dest):
        data = open(dest, "rb").read()
    else:
        req = urllib.request.Request(ORIGIN + path, headers={"User-Agent": UA, "Accept": "*/*"})
        try:
            with urllib.request.urlopen(req, timeout=40) as resp:
                data = resp.read()
        except Exception as exc:
            failed.append((path, str(exc)[:60]))
            continue
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, "wb") as fh:
            fh.write(data)
    done.add(path)

    if not path.endswith(".js"):
        continue
    text = data.decode("utf-8", "replace")
    for spec in re.findall(r'(?:import|from)\s*\(?\s*["\']([^"\']+)["\']', text):
        if spec.startswith("/_app/"):
            queue.append(spec)
        elif spec.startswith(("./", "../")):
            queue.append(posixpath.normpath(posixpath.join(posixpath.dirname(path), spec)))
        elif re.match(r"^[A-Za-z0-9._\-]+\.js$", spec):
            queue.append(posixpath.normpath(posixpath.join(posixpath.dirname(path), spec)))

print("\nmirrored %d file(s)" % len(done))

# ---- post-pass: assets the JS pulls in at runtime ------------------------
# SvelteKit lazily imports per-component CSS (CinematicOffer, music-controller,
# BloomFinale, ...) and theme thumbnails by name. Those never appear as <link>
# tags, so they are invisible to the HTML crawl and 404 once the app runs.
import glob

extra = set()
for js in glob.glob(os.path.join(HERE, "_app", "**", "*.js"), recursive=True):
    text = open(js, encoding="utf-8", errors="replace").read()
    for name in re.findall(r'["\'](?:assets/)?([A-Za-z0-9._\-]+\.css)["\']', text):
        extra.add("/_app/immutable/assets/" + name)
    for p in re.findall(r'["\'](/(?:themes|icons|images)/[A-Za-z0-9._/\-]+\.[a-z]{3,4})["\']', text):
        extra.add(p)

pulled = 0
candidates = sorted(extra)
print("runtime-referenced assets: %d candidates" % len(candidates))
for path in candidates[:250]:
    dest = local_for(path)
    if os.path.isfile(dest):
        continue
    req = urllib.request.Request(ORIGIN + path, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
    except Exception as exc:
        failed.append((path, str(exc)[:60]))
        continue
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "wb") as fh:
        fh.write(data)
    pulled += 1
    if pulled % 20 == 0:
        print("   pulled %d..." % pulled)
print("runtime-referenced assets: %d pulled" % pulled)
if failed:
    print("failed %d:" % len(failed))
    for p, e in failed[:8]:
        print("   %s (%s)" % (p, e))
total = sum(len(f) for _, _, f in os.walk(os.path.join(HERE, "_app")))
size = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(os.path.join(HERE, "_app")) for f in fs)
print("_app tree: %d files, %.1f MB" % (total, size / 1048576))
