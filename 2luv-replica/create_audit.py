#!/usr/bin/env python
"""What does the SvelteKit create page reference?"""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
for label, path in [("built", os.path.join(HERE, "create", "index.html")),
                    ("source", os.path.join(HERE, "..", "2luv_create.html"))]:
    if not os.path.isfile(path):
        print(label, "missing")
        continue
    html = open(path, encoding="utf-8").read()
    print("== %s (%d bytes)" % (label, len(html)))
    print("   <link> hrefs:")
    for m in re.finditer(r"<link\b[^>]*>", html):
        print("     " + m.group(0)[:160])
    print("   <script> srcs:")
    for m in re.finditer(r"<script\b[^>]*src=\"([^\"]+)\"[^>]*>", html):
        print("     " + m.group(1)[:160])
    print("   _app occurrences:", html.count("_app"))
    print("   .css occurrences :", html.count(".css"))
    print()
