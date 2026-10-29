#!/usr/bin/env python
"""Inspect the two remaining JS problems."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))

p = os.path.join(HERE, "assets", "_lazy", "privacy-controls-DtZB9K6_.js")
t = open(p, encoding="utf-8").read()
print("=== privacy bundle: every import specifier ===")
for m in re.finditer(r'import[^;]{0,120}?from\s*["\']([^"\']+)["\']', t):
    print("  from: " + m.group(1))
for m in re.finditer(r'import\s*\(\s*["\']([^"\']+)["\']\s*\)', t):
    print("  dyn : " + m.group(1))

print("\n=== bundle: __vite__mapDeps definition ===")
b = open(os.path.join(HERE, "assets", "_bundle", "root.js"), encoding="utf-8").read()
m = re.search(r"__vite__mapDeps\s*=.{0,400}?;", b, re.S)
print("  " + (m.group(0)[:400].replace("\n", " ") if m else "not found"))

print("\n=== bundle: any /undefined or empty dep array left ===")
print("  '=[]' count:", b.count("m4.f||(m4.f=[])"), " empty array occurrences:", len(re.findall(r"m\d*\.f\s*\|\|\s*\(\s*m\d*\.f\s*=\s*\[\]", b)))
