#!/usr/bin/env python
"""Find the code that toggles has-recent-item on the home hero."""
import glob
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))

for path in sorted(glob.glob(os.path.join(HERE, "assets", "_astro", "*.js")) +
                   glob.glob(os.path.join(HERE, "assets", "_bundle", "*.js"))):
    text = open(path, encoding="utf-8").read()
    if "has-recent-item" not in text:
        continue
    print("=== %s" % os.path.basename(path))
    for m in re.finditer(r"has-recent-item", text):
        lo = max(0, m.start() - 600)
        print(text[lo:m.start() + 400].replace("\n", " "))
        print("---")
    print()
