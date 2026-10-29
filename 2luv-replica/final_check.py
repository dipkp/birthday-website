#!/usr/bin/env python
"""Final gate: no module scripts, bundles wired, fallbacks installed, JS parses."""
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PAGES = ["index.html", "home/index.html", "pricing/index.html", "create/index.html",
         "blog/index.html", "contact/index.html", "about/index.html"]

problems = []

for page in PAGES:
    path = os.path.join(HERE, page.replace("/", os.sep))
    html = open(path, encoding="utf-8").read()

    if 'type="module"' in html:
        problems.append("%s: still has type=module" % page)

    if "_bundle/" not in html and page not in ("create/index.html",):
        problems.append("%s: no bundle script" % page)

    # pricing fallback must run after the pricing module could have failed
    if page in ("index.html", "home/index.html", "pricing/index.html"):
        if "Pricing fallback" not in html:
            problems.append("%s: no pricing fallback" % page)
        if "data-header-region" not in html.split("Pricing fallback")[-1]:
            problems.append("%s: fallback does not sync the currency picker" % page)

    bundles = [s for s in __import__("re").findall(r'src="([^"]*_bundle/[^"]+)"', html)]
    for b in bundles:
        # the src is already relative to the page itself (../ for subpages)
        target = os.path.normpath(os.path.join(os.path.dirname(path), b.replace("/", os.sep)))
        if not os.path.isfile(target):
            problems.append("%s: bundle missing %s" % (page, b))

print("pages checked: %d" % len(PAGES))

for b in sorted(os.listdir(os.path.join(HERE, "assets", "_bundle"))):
    if not b.endswith(".js") or b.startswith("entry-"):
        continue
    res = subprocess.run("node --check assets/_bundle/%s" % b,
                         cwd=HERE, capture_output=True, text=True, shell=True)
    if res.returncode != 0:
        problems.append("bundle %s does not parse" % b)

if problems:
    print("\nFAILED:")
    for p in problems:
        print("  " + p)
    sys.exit(1)
print("OK - bundles wired, no module scripts, fallbacks present")
