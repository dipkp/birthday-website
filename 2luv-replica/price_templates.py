#!/usr/bin/env python
"""Print each price slot with its template placeholder."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
html = open(os.path.join(HERE, "index.html"), encoding="utf-8").read()

for m in re.finditer(r'<span[^>]*data-lv3-price="[^"]+"[^>]*>', html):
    tag = m.group(0)
    key = re.search(r'data-lv3-price="([^"]+)"', tag)
    tpl = re.search(r'data-lv3-template="([^"]*)"', tag)
    print("  price=%s" % (key.group(1) if key else "?"))
    print("    template: %r" % (tpl.group(1) if tpl else None))
    end = html.find("</span>", m.end())
    print("    content : %r" % html[m.end():end][:100])
    print()
