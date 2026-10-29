#!/usr/bin/env python
"""Pull the real balloon srcset widths out of the captured page so the feature lab
does not rely on guessed values."""
import json
import os
import re

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "2luv_birthday.html")
html = open(SRC, encoding="utf-8").read()
start = html.find("balloonSources")
segment = html[start:start + 6000]

widths = {}
for digit in "0123456789":
    pattern = re.compile(
        r'"' + digit + r'":\{"avif":"([^"]+)"', re.S)
    m = pattern.search(segment)
    if not m:
        widths[digit] = None
        continue
    found = [int(w) for w in re.findall(r"(\d+)w", m.group(1))]
    widths[digit] = found

print(json.dumps(widths, indent=2))
missing = [d for d, w in widths.items() if not w]
print("\nmissing:", missing or "none")
