#!/usr/bin/env python
"""Search the home stylesheet for data-table rules and any headless copy styling."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
css = open(os.path.join(HERE, "home", "styles.css"), encoding="utf-8").read()

print("data-table occurrences:", css.count("data-table"))
for m in re.finditer(r"data-table", css):
    start = css.rfind("}", 0, m.start()) + 1
    brace = css.find("{", m.start())
    if brace == -1:
        continue
    depth, i = 0, brace
    while i < len(css):
        if css[i] == "{":
            depth += 1
        elif css[i] == "}":
            depth -= 1
            if depth == 0:
                break
        i += 1
    print("  " + css[start:i + 1].replace("\n", " ")[:300])

print("\n--- hero-inner ---")
for m in re.finditer(r"\.lv3-hero-inner", css):
    start = css.rfind("}", 0, m.start()) + 1
    brace = css.find("{", m.start())
    if brace == -1:
        continue
    depth, i = 0, brace
    while i < len(css):
        if css[i] == "{":
            depth += 1
        elif css[i] == "}":
            depth -= 1
            if depth == 0:
                break
        i += 1
    print("  " + css[start:i + 1].replace("\n", " ")[:300])

print("\n--- .lv3.is-home tokens (light) ---")
m = re.search(r"\.lv3\.is-home\{[^}]*\}", css)
print("  " + (m.group(0)[:400] if m else "-"))
