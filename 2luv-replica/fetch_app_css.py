#!/usr/bin/env python
"""
Mirror the CSS chunks that the SvelteKit app imports lazily.

SvelteKit code-splits per component, so styles like CinematicOffer.css,
music-controller.css and BloomFinale.css are requested by JS at runtime and never
appear as <link> tags. They are only discoverable by reading the chunk sources.
"""
import glob
import os
import re
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ORIGIN = "https://www.2-luv.com"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

names = set()
for js in glob.glob(os.path.join(HERE, "_app", "**", "*.js"), recursive=True):
    text = open(js, encoding="utf-8", errors="replace").read()
    # names appear either bare ("X.css"), under assets/ ("assets/X.css") or as a
    # full path ("/_app/immutable/assets/X.css") - capture the basename from any
    for match in re.findall(r'["\'`](?:[A-Za-z0-9./_\-]*/)?([A-Za-z0-9][A-Za-z0-9._\-]*\.css)["\'`]', text):
        names.add(match)

print("distinct css names referenced from _app js: %d" % len(names))

pulled, missing, failed = [], [], []
for name in sorted(names):
    dest = os.path.join(HERE, "_app", "immutable", "assets", name)
    if os.path.isfile(dest):
        continue
    try:
        req = urllib.request.Request(ORIGIN + "/_app/immutable/assets/" + name,
                                     headers={"User-Agent": UA, "Accept": "*/*"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, "wb") as fh:
            fh.write(data)
        pulled.append(name)
    except Exception as exc:
        code = getattr(exc, "code", None)
        (missing if code == 404 else failed).append(name)

print("pulled: %d" % len(pulled))
for n in pulled:
    print("   + " + n)
if missing:
    print("404 upstream (not in the origin build): %d" % len(missing))
    for n in missing:
        print("   - " + n)
if failed:
    print("other errors: %d" % len(failed))
    for n in failed:
        print("   ! " + n)

total = len([f for f in os.listdir(os.path.join(HERE, "_app", "immutable", "assets"))
             if f.endswith(".css")])
print("css files now in _app/immutable/assets: %d" % total)
