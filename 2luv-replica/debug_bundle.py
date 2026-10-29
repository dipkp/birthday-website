#!/usr/bin/env python
"""Reproduce mirror_routes' module extraction for one route."""
import hashlib
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
route = "/en/event/anniversary-gift"
key = hashlib.sha1(route.encode()).hexdigest()
path = os.path.join(HERE, "_htmlcache", key + ".html")
print("cache file exists:", os.path.isfile(path))

html = open(path, encoding="utf-8", errors="replace").read()
print("bytes:", len(html))
print("type=module count:", html.count('type="module"'))

srcs = re.findall(r'<script[^>]*type="module"[^>]*src="([^"]+)"', html)
print("srcs found:", srcs)

for src in srcs:
    name = os.path.basename(src)
    target = os.path.join(HERE, "assets", "_astro", name)
    print("  %-70s exists=%s" % (name[:70], os.path.isfile(target)))
