#!/usr/bin/env python
"""Inspect why /assets/ and _cdn URLs are malformed."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))

print("=== index.html: assets/_astro refs ===")
html = open(os.path.join(HERE, "index.html"), encoding="utf-8").read()
for m in re.findall(r".{30}assets/_astro/[A-Za-z0-9._\-]+\.js.{10}", html)[:4]:
    print("  " + m.replace("\n", " "))

print("\n=== bundle root.js: assets/_astro context ===")
b = open(os.path.join(HERE, "assets", "_bundle", "root.js"), encoding="utf-8").read()
for m in re.findall(r".{60}assets/_astro/[A-Za-z0-9._\-]+\.js.{10}", b)[:4]:
    print("  " + m.replace("\n", " "))

print("\n=== bundle: privacy-controls context ===")
for m in re.findall(r".{60}privacy-controls[A-Za-z0-9._\-]*\.js.{20}", b)[:3]:
    print("  " + m.replace("\n", " "))

print("\n=== _lazy/privacy bundle: bare chunk imports ===")
p = os.path.join(HERE, "assets", "_lazy", "privacy-controls-DtZB9K6_.js")
if os.path.isfile(p):
    t = open(p, encoding="utf-8").read()
    for m in re.findall(r'["\'](chunks/[^"\']+)["\']', t)[:5]:
        print("  bare specifier: " + m)
    print("  count:", len(re.findall(r'["\']chunks/', t)))
    print("  size: %d bytes" % len(t))

print("\n=== blog/index.html: _cdn refs ===")
blog = open(os.path.join(HERE, "blog", "index.html"), encoding="utf-8").read()
for m in re.findall(r".{30}_cdn/media[^\"']{0,60}", blog)[:3]:
    print("  " + m.replace("\n", " "))
