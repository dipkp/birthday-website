#!/usr/bin/env python
"""
Mirror root-absolute assets requested at runtime.

Themes, fonts and showcase videos are referenced from JS as /themes/..., /fonts/...
etc. and only surface when a specific page runs. Scans all page HTML and every
mirrored JS module, then fetches whatever is missing to the matching root path.
"""
import glob
import os
import re
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ORIGIN = "https://www.2-luv.com"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

REF = re.compile(
    r'["\'](/(?:themes|fonts|images|icons|videos)/[A-Za-z0-9._/~%\-]+\.'
    r'(?:avif|webp|png|jpe?g|svg|gif|mp4|webm|mp3|m4a|aac|ogg|wav|flac|opus|woff2?))["\']', re.I)

SKIP = {"_htmlcache", "_bundle"}
refs = set()

for page in glob.glob(os.path.join(HERE, "**", "index.html"), recursive=True):
    rel = os.path.relpath(page, HERE).replace(os.sep, "/")
    if any(p in SKIP for p in rel.split("/")[:-1]):
        continue
    refs |= set(REF.findall(open(page, encoding="utf-8", errors="replace").read()))

for root, dirs, files in os.walk(os.path.join(HERE, "assets")):
    for name in files:
        if not name.endswith(".js"):
            continue
        refs |= set(REF.findall(open(os.path.join(root, name), encoding="utf-8",
                                      errors="replace").read()))

print("distinct runtime refs found: %d" % len(refs))

pulled, failed = 0, []
for path in sorted(refs):
    dest = os.path.join(HERE, path.lstrip("/").replace("/", os.sep))
    if os.path.isfile(dest):
        continue
    req = urllib.request.Request(ORIGIN + path, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=40) as resp:
            data = resp.read()
    except Exception:
        failed.append(path)
        continue
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "wb") as fh:
        fh.write(data)
    pulled += 1

print("pulled %d   failed %d" % (pulled, len(failed)))
for f in failed[:10]:
    print("   ! " + f)
