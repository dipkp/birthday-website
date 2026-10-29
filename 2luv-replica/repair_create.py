#!/usr/bin/env python
"""
Repair the SvelteKit create page.

Unlike the Astro marketing pages, /en/create/love-letter carries almost no inline
CSS - its styling lives in external /_app/immutable/assets/*.css files, several of
them deliberately `disabled media="(max-width: 0)"` so the app can switch skins at
runtime. Rebuilding <head> from scratch dropped every one of those links, which is
why the page rendered as unstyled HTML.

This script:
  1. resolves each stylesheet / font-preload link from the capture against the
     real route depth (/en/create/love-letter -> /),
  2. mirrors those files (and the whole _app asset tree they reference) locally,
  3. re-injects the links into the built page as depth-relative `../_app/...`,
     preserving media/disabled so the runtime skin logic still behaves.
"""
import os
import posixpath
import re
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ORIGIN = "https://www.2-luv.com"
SOURCE = os.path.join(HERE, "..", "2luv_create.html")
BUILT = os.path.join(HERE, "create", "index.html")
ROUTE = "/en/create/love-letter"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

_cache = {}
failed = []
seen = set()


def fetch(path):
    if path in _cache:
        return _cache[path]
    if not path.startswith("/"):
        return None
    local = os.path.join(HERE, path.lstrip("/").replace("/", os.sep))
    if os.path.isfile(local):
        data = open(local, "rb").read()
        _cache[path] = data
        return data
    req = urllib.request.Request(ORIGIN + path, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            data = resp.read()
    except Exception as exc:
        print("   !! %s (%s)" % (path, exc))
        failed.append(path)
        _cache[path] = None
        return None
    dest = os.path.join(HERE, path.lstrip("/").replace("/", os.sep))
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "wb") as fh:
        fh.write(data)
    _cache[path] = data
    return data


def resolve(href):
    """Resolve a link href against the captured route, returning a root-absolute path."""
    if href.startswith("http"):
        return href
    if href.startswith("/"):
        return href.split("?")[0]
    base_dir = ROUTE.rsplit("/", 1)[0] + "/"
    return posixpath.normpath(posixpath.join(base_dir, href.split("?")[0]))


src = open(SOURCE, encoding="utf-8").read()
head = src[: src.index("<body")]

links = re.findall(r"<link\b[^>]*>", head)
stylesheets, preloads = [], []
for tag in links:
    href = re.search(r'href="([^"]+)"', tag)
    if not href:
        continue
    rel = re.search(r'rel="([^"]+)"', tag)
    if not rel:
        continue
    kind = rel.group(1)
    if kind == "stylesheet":
        stylesheets.append((resolve(href.group(1)), tag))
    elif kind == "preload" and 'as="font"' in tag:
        preloads.append((resolve(href.group(1)), tag))

print("stylesheets found: %d" % len(stylesheets))
for path, _ in stylesheets:
    print("   " + path)

# ---- mirror the CSS (and anything it references) --------------------------
for path, _ in stylesheets:
    data = fetch(path)
    if data is None:
        continue
    text = data.decode("utf-8", "replace")
    for ref in set(re.findall(r"url\(([^)]+)\)", text)):
        ref = ref.strip().strip("'\"").split("#")[0].split("?")[0]
        if not ref or ref.startswith(("data:", "http", "//")):
            continue
        # absolute (/fonts/...) or relative, which can climb out of _app into /themes
        target = (resolve(ref) if ref.startswith("/")
                  else posixpath.normpath(posixpath.join(posixpath.dirname(path), ref)))
        if target.startswith("/"):
            fetch(target)

for path, _ in preloads:
    fetch(path)

# ---- rebuild the link block ----------------------------------------------
def to_local(path):
    """From create/index.html (depth 1) a root-absolute path needs one ../"""
    return "../" + path.lstrip("/")


blocks = []
for path, tag in stylesheets:
    local = to_local(path)
    media = re.search(r'media="([^"]*)"', tag)
    disabled = " disabled" if re.search(r"\bdisabled\b", tag) else ""
    extra = ' data-create-style="cinematic-create"' if "data-create-style" in tag else ""
    media_attr = ' media="%s"' % media.group(1) if media else ""
    blocks.append('<link rel="stylesheet" href="%s"%s%s%s>' % (local, disabled, media_attr, extra))

for path, tag in preloads:
    blocks.append('<link rel="preload" as="font" type="font/woff2" href="%s" crossorigin="anonymous">'
                  % to_local(path))

inject = ("<!-- SvelteKit stylesheets, mirrored from /_app. The origin ships these as\n"
          "     external files and enables several of them lazily at runtime; keeping\n"
          "     disabled/media intact preserves that behaviour. -->\n" + "\n".join(blocks) + "\n")

built = open(BUILT, encoding="utf-8").read()
built = re.sub(r"<!-- SvelteKit stylesheets.*?-->\n(?:<link[^>]*>\n)*", "", built, flags=re.S)
if "SvelteKit stylesheets" not in built:
    built = built.replace("</head>", inject + "</head>", 1)

open(BUILT, "w", encoding="utf-8").write(built)

print("\ninjected %d link tags" % len(blocks))
print("mirrored _app files: %d" % len(seen))
if failed:
    print("failed: %d" % len(failed))
    for f in failed[:10]:
        print("   " + f)
