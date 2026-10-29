#!/usr/bin/env python
"""What scripts does an event page carry, and why was no bundle produced?"""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
page = os.path.join(HERE, "en", "event", "anniversary-gift", "index.html")
html = open(page, encoding="utf-8").read()

print("script tags:", len(re.findall(r"<script", html)))
print("type=module:", len(re.findall(r'type="module"', html)))
print("src tags:")
for m in re.finditer(r'<script[^>]*src="([^"]+)"', html):
    print("   " + m.group(1)[:110])

print("\nastro-island count:", len(re.findall(r"<astro-island", html)))
for m in re.finditer(r'component-url="([^"]+)"', html):
    print("   island component: " + m.group(1))

print("\ninline scripts:", len(re.findall(r"<script(?![^>]*src=)[^>]*>", html)))

# what modules does the captured source declare?
src = os.path.join(HERE, "_htmlcache")
