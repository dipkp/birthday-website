#!/usr/bin/env python
"""Look for an opacity gate on the hero content and any js-reveal dependency."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
css = open(os.path.join(HERE, "home", "styles.css"), encoding="utf-8").read()
html = open(os.path.join(HERE, "home", "index.html"), encoding="utf-8").read()

def block_at(idx):
    brace = css.find("{", idx)
    if brace == -1:
        return ""
    depth, i = 0, brace
    while i < len(css):
        if css[i] == "{":
            depth += 1
        elif css[i] == "}":
            depth -= 1
            if depth == 0:
                break
        i += 1
    return css[idx:i + 1].replace("\n", " ")

for needle in ["lv2-hero-content", "lv3-hero-content", "js-reveal"]:
    print("=== %s ===" % needle)
    n = 0
    for m in re.finditer(re.escape(needle), css):
        start = css.rfind("}", 0, m.start()) + 1
        text = block_at(start).strip()
        if text and ("opacity" in text or "visibility" in text or "transform" in text):
            print("  " + text[:400])
            n += 1
        if n >= 6:
            break
    print()

print("=== does the built html carry js-reveal? ===")
print("  'js-reveal' in html:", "js-reveal" in html)
print("  data-lv3-reveal count:", len(re.findall(r"data-lv3-reveal", html)))
m = re.search(r'<div class="lv3[^"]*"', html)
print("  root div:", m.group(0) if m else "-")
