#!/usr/bin/env python
"""Do the page stylesheets depend on the stripped body classes / astro scope ids?"""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
TOKENS = ["lv3-body", "lv3-party-body", "contact-page-body", "pricing-page-body",
          "landing-v2-body", "37fxchfa"]

for page in ["styles.css", "home/styles.css", "pricing/styles.css", "create/styles.css",
             "blog/styles.css", "contact/styles.css", "about/styles.css"]:
    path = os.path.join(HERE, page.replace("/", os.sep))
    if not os.path.isfile(path):
        continue
    css = open(path, encoding="utf-8").read()
    hits = {t: css.count(t) for t in TOKENS if t in css}
    print("%-22s %s" % (page, hits if hits else "-"))

# and what the html actually carries now
print("\nhtml/body attrs now in use:")
for page in ["index.html", "home/index.html", "pricing/index.html", "create/index.html",
             "blog/index.html", "contact/index.html", "about/index.html"]:
    path = os.path.join(HERE, page.replace("/", os.sep))
    html = open(path, encoding="utf-8").read()
    body = re.search(r"<body\b[^>]*>", html)
    print("   %-22s %s" % (page, body.group(0) if body else "-"))
