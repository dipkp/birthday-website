#!/usr/bin/env python
"""
Verify the SvelteKit create page is fully styled from local files:
  - every stylesheet / font-preload link resolves on disk
  - every url() inside those stylesheets resolves inside the replica
  - no link still points at the origin
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PAGE = os.path.join(HERE, "create", "index.html")
problems = []

html = open(PAGE, encoding="utf-8").read()
base = os.path.dirname(PAGE)

links = re.findall(r'<link\b[^>]*href="([^"]+)"[^>]*>', html)
local = [h for h in links if h.endswith(".css") or h.endswith(".woff2")]
print("stylesheet / font links on the page: %d" % len(local))

for href in local:
    if href.startswith(("http", "//")):
        problems.append("still remote: %s" % href)
        continue
    target = os.path.normpath(os.path.join(base, href.replace("/", os.sep)))
    if not os.path.isfile(target):
        problems.append("missing file: %s" % href)
        continue
    if not href.endswith(".css"):
        continue
    css = open(target, encoding="utf-8").read()
    for ref in set(re.findall(r"url\(([^)]+)\)", css)):
        ref = ref.strip().strip("'\"").split("#")[0].split("?")[0]
        if not ref or ref.startswith(("data:", "http", "//", "#")):
            continue
        if ref.startswith("/"):
            # root-absolute: resolves against the replica root
            dest = os.path.normpath(os.path.join(HERE, ref.lstrip("/").replace("/", os.sep)))
        else:
            dest = os.path.normpath(os.path.join(os.path.dirname(target), ref.replace("/", os.sep)))
        if not os.path.isfile(dest):
            problems.append("css asset missing: %s (from %s)" % (ref, os.path.basename(target)))

# the page must not still be relying on the origin's _app host
if re.search(r'https://www\.2-luv\.com/_app', html):
    problems.append("page still points at the origin _app tree")

print("files checked: %d" % len(local))
if problems:
    print("\nproblems (%d):" % len(problems))
    for p in sorted(set(problems))[:25]:
        print("  " + p)
    sys.exit(1)
print("OK - create page is fully styled from local files")
