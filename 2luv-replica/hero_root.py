#!/usr/bin/env python
"""Print the home hero root element and any recent-item hooks."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
html = open(os.path.join(HERE, "home", "index.html"), encoding="utf-8").read()

print("=== elements carrying lv3-hero classes ===")
for m in re.finditer(r'<(div|section|header)\s[^>]*class="[^"]*lv3-hero[^"]*"[^>]*>', html):
    tag = m.group(0)
    if len(tag) > 400:
        tag = tag[:400] + " ..."
    print("  " + tag)
    print()

print("=== recent-item hooks present ===")
for attr in ["has-recent-item", "data-recent-hero-content", "data-recent-hero-media",
             "data-recent-open-link", "hero-returning"]:
    print("  %-28s %s" % (attr, html.count(attr)))
