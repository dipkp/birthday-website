#!/usr/bin/env python
"""Print the actual .lv3-season-arrow rule bodies, with brace matching."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
css = open(os.path.join(HERE, "home", "styles.css"), encoding="utf-8").read()


def block_from(idx):
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
    return css[idx:i + 1]


for m in re.finditer(r"lv3-season-arrow", css):
    start = css.rfind("}", 0, m.start()) + 1
    text = block_from(start)
    if text:
        print(text.replace("\n", " ")[:260])
        print("---")

print("\n=== rules that set svg width to 100% or auto ===")
for m in re.finditer(r"[^{}]{0,120}\{[^}]*\}", css):
    t = m.group(0)
    if "svg" in t and re.search(r"width\s*:\s*(100%|auto)", t):
        print("  " + t.replace("\n", " ")[:200])
