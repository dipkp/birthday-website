#!/usr/bin/env python
"""Inspect the hero inline script: is the tag intact or is the JS leaking as text?"""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
for page in ["home/index.html", "index.html", "pricing/index.html", "contact/index.html"]:
    path = os.path.join(HERE, page.replace("/", os.sep))
    html = open(path, encoding="utf-8").read()
    print("== %s" % page)
    print("   <script open :", len(re.findall(r"<script\b", html)))
    print("   </script>    :", html.count("</script>"))
    print("   tableSources :", html.count("tableSources"))
    print("   unbalanced   :", len(re.findall(r"<script\b", html)) != html.count("</script>"))
    if "tableSources" in html:
        i = html.find("tableSources")
        lo = html.rfind("<script", 0, i)
        print("   nearest <script before tableSources:", html[lo:lo + 60].replace("\n", " ") if lo != -1 else "NONE")
    print()
