#!/usr/bin/env python
"""Compare the <html> and <body> opening tags: original capture vs rebuilt page."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
SOURCES = {
    "index": ("../2luv_birthday.html", "index.html"),
    "home": ("../2luv_home.html", "home/index.html"),
    "pricing": ("../2luv_pricing.html", "pricing/index.html"),
    "create": ("../2luv_create.html", "create/index.html"),
    "blog": ("../2luv_blog.html", "blog/index.html"),
    "contact": ("../2luv_contact.html", "contact/index.html"),
    "about": ("../2luv_about.html", "about/index.html"),
}

for key, (src_rel, out_rel) in SOURCES.items():
    src_path = os.path.join(HERE, src_rel.replace("/", os.sep))
    out_path = os.path.join(HERE, out_rel.replace("/", os.sep))
    if not os.path.isfile(src_path):
        print("%-8s source missing" % key)
        continue
    src = open(src_path, encoding="utf-8").read()
    out = open(out_path, encoding="utf-8").read()

    src_html = re.search(r"<html\b[^>]*>", src)
    out_html = re.search(r"<html\b[^>]*>", out)
    src_body = re.search(r"<body\b[^>]*>", src)
    out_body = re.search(r"<body\b[^>]*>", out)

    print("== %s" % key)
    print("   src <html>:", (src_html.group(0)[:160] if src_html else "-"))
    print("   out <html>:", (out_html.group(0)[:160] if out_html else "-"))
    print("   src <body>:", (src_body.group(0)[:160] if src_body else "-"))
    print("   out <body>:", (out_body.group(0)[:160] if out_body else "-"))
    print()
