#!/usr/bin/env python
"""Verify every built page: local references resolve, CSS balanced, JS parses."""
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PAGES = ["index.html", "home/index.html", "pricing/index.html", "create/index.html",
         "blog/index.html", "contact/index.html", "about/index.html", "features/index.html"]

# Paths the feature lab builds in JavaScript (digit art is assembled at runtime),
# so they never appear as literal attributes to crawl.
RUNTIME_ASSETS = []
for _d in range(10):
    RUNTIME_ASSETS.append("features/../assets/images/landing/v3/party/balloons/digit-%d-lg.webp" % _d)
    RUNTIME_ASSETS.append("features/../assets/images/landing/v3/party/balloons/digit-%d-lg.avif" % _d)
    RUNTIME_ASSETS.append("features/../assets/images/landing/v3/responsive/party/balloons/digit-%d-lg-192.webp" % _d)
    RUNTIME_ASSETS.append("features/../assets/images/landing/v3/responsive/party/balloons/digit-%d-lg-192.avif" % _d)

problems = []
stats = []

for page in PAGES:
    path = os.path.join(HERE, page.replace("/", os.sep))
    if not os.path.isfile(path):
        problems.append("missing page: %s" % page)
        continue
    html = open(path, encoding="utf-8").read()
    prefix = "../" if "/" in page else ""
    css_path = os.path.join(os.path.dirname(path), "styles.css")
    if os.path.isfile(css_path):
        css = open(css_path, encoding="utf-8").read()
    else:
        # hand-written pages carry their styles inline
        css = "\n".join(re.findall(r"<style[^>]*>(.*?)</style>", html, re.S))

    refs = set()
    for m in re.finditer(r'(?:src|href|poster)="([^"]+)"', html):
        refs.add(m.group(1))
    for m in re.finditer(r'srcset="([^"]+)"', html):
        for part in m.group(1).split(","):
            part = part.strip().split(" ")[0]
            if part:
                refs.add(part)

    missing = 0
    for ref in sorted(refs):
        if not ref or ref.startswith(("#", "http", "mailto:", "tel:", "data:")):
            continue
        if not ref.startswith("assets/"):
            continue
        # local files ignore the origin's cache-busting query, if any survived
        ref = ref.split("?")[0]
        target = os.path.normpath(os.path.join(os.path.dirname(path), ref.replace("/", os.sep)))
        if not os.path.isfile(target):
            problems.append("%s: missing %s" % (page, ref))
            missing += 1

    if css.count("{") != css.count("}"):
        problems.append("%s: css brace mismatch" % page)

    leftovers = re.findall(r'(?:src|href)="(/(?:_astro|_lazy|images|fonts|icons)/[^"]*)"', html)
    for lo in leftovers:
        problems.append("%s: unrewritten path %s" % (page, lo))

    stats.append((page, len(refs), missing))

print("=== per page ===")
for page, n, missing in stats:
    print("  %-22s %3d refs, %d missing" % (page, n, missing))

runtime_missing = 0
for rel in RUNTIME_ASSETS:
    target = os.path.normpath(os.path.join(HERE, rel.replace("/", os.sep)))
    if not os.path.isfile(target):
        problems.append("runtime asset missing: %s" % rel)
        runtime_missing += 1
print("  %-22s %3d runtime-built asset paths, %d missing"
      % ("features (digits)", len(RUNTIME_ASSETS), runtime_missing))

# ---- JS parse check across the shared module tree -------------------------
mods = []
for root, _d, files in os.walk(os.path.join(HERE, "assets")):
    for name in files:
        if name.endswith(".js"):
            mods.append(os.path.join(root, name))
for m in sorted(mods):
    res = subprocess.run(["node", "--input-type=module", "--check"],
                         input=open(m, encoding="utf-8").read(),
                         capture_output=True, text=True, shell=False)
    if res.returncode != 0:
        err = (res.stderr or "").strip().splitlines()
        problems.append("js parse %s: %s" % (os.path.relpath(m, HERE), err[0] if err else "?"))
print("\n=== js modules parsed: %d ===" % len(mods))

if problems:
    print("\nFAILED (%d):" % len(problems))
    for p in problems:
        print("  " + p)
    sys.exit(1)
print("\nOK - all pages verified")
