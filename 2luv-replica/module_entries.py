#!/usr/bin/env python
"""List the module entry points each captured page declares."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
SOURCES = {
    "index": "../2luv_birthday.html",
    "home": "../2luv_home.html",
    "pricing": "../2luv_pricing.html",
    "create": "../2luv_create.html",
    "blog": "../2luv_blog.html",
    "contact": "../2luv_contact.html",
    "about": "../2luv_about.html",
}

for key, rel in SOURCES.items():
    path = os.path.join(HERE, rel.replace("/", os.sep))
    if not os.path.isfile(path):
        print("%-8s MISSING" % key)
        continue
    html = open(path, encoding="utf-8").read()
    srcs = re.findall(r'<script[^>]*type="module"[^>]*src="([^"]+)"', html)
    print("%-8s %d entry point(s)" % (key, len(srcs)))
    for s in srcs:
        print("      ", s)
