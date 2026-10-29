#!/usr/bin/env python
"""Find what selects the seasonal (Halloween) dark treatment on the home page."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "2luv_home.html"), encoding="utf-8").read()
css = open(os.path.join(HERE, "home", "styles.css"), encoding="utf-8").read()

print("=== seasonal-theme attributes in the captured home page ===")
for m in re.finditer(r'data-seasonal-theme="([^"]*)"', src):
    pass
vals = re.findall(r'data-seasonal-theme="([^"]*)"', src)
print("  occurrences:", len(vals), "values:", sorted(set(vals))[:10])

print("\n=== halloween mentions in captured html ===")
for m in sorted(set(re.findall(r'data-[a-z-]*halloween[a-z-]*="[^"]*"', src))):
    print("  ", m)
print("  'halloween' count in html:", src.lower().count("halloween"))

print("\n=== css selectors mentioning halloween ===")
sels = sorted(set(re.findall(r'[^{}]*halloween[^{}]*\{', css, re.I)))
for s in sels[:12]:
    print("  ", s.strip()[:120])

print("\n=== css: seasonal-theme token blocks ===")
sels = sorted(set(re.findall(r'[^{}]*data-seasonal-theme[^{}]*\{', css)))
for s in sels[:12]:
    print("  ", s.strip()[:120])

print("\n=== does css force dark for seasonal? ===")
for m in re.finditer(r'[^{}]*(?:seasonal|halloween)[^{}]*\{[^}]{0,200}', css, re.I):
    pass
print("  html.dark occurrences:", css.count("html.dark"))
