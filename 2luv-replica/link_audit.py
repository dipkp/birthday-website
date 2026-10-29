#!/usr/bin/env python
"""Inventory the link targets across the built pages."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
PAGES = ["index.html", "home/index.html", "pricing/index.html", "create/index.html",
         "blog/index.html", "contact/index.html", "about/index.html"]

for page in PAGES:
    path = os.path.join(HERE, page.replace("/", os.sep))
    html = open(path, encoding="utf-8").read()
    hrefs = re.findall(r'href="([^"]+)"', html)
    buckets = {"root-relative": [], "absolute-2luv": [], "local": [], "anchor": [],
               "mail-tel": [], "other-abs": []}
    for h in hrefs:
        if h.startswith("#"):
            buckets["anchor"].append(h)
        elif h.startswith(("mailto:", "tel:")):
            buckets["mail-tel"].append(h)
        elif h.startswith("https://www.2-luv.com"):
            buckets["absolute-2luv"].append(h)
        elif h.startswith("http"):
            buckets["other-abs"].append(h)
        elif h.startswith("/"):
            buckets["root-relative"].append(h)
        else:
            buckets["local"].append(h)

    print("== %s" % page)
    for k, v in buckets.items():
        if v:
            uniq = sorted(set(v))
            print("   %-15s %3d  e.g. %s" % (k, len(v), ", ".join(uniq[:4])))
    print()
