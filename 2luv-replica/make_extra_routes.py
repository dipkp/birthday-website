#!/usr/bin/env python
"""Turn the crawl's 404 page-URLs into a route list mirror_routes can consume."""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ORIGIN = "https://www.2-luv.com"
data = json.load(open(os.path.join(HERE, "..", "audit-tools", "missing-all.json"), encoding="utf-8"))

pages, assets = [], []
for p in data["missing"]:
    if p.startswith("/en/") and p.endswith("/"):
        pages.append(ORIGIN + p.rstrip("/"))
    elif not p.startswith("/en/"):
        assets.append(p)

# anything already declared is not "extra"
known = set(json.load(open(os.path.join(HERE, "routes_en.json"), encoding="utf-8")))
extra = sorted(set(pages) - known)

json.dump(extra, open(os.path.join(HERE, "routes_extra.json"), "w", encoding="utf-8"), indent=2)
print("extra page routes: %d" % len(extra))
print("asset paths to fetch: %d" % len(assets))
for a in assets:
    print("   " + a)
