#!/usr/bin/env python
"""Print the hero rules that decide visibility of the copy and the shade."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
css = open(os.path.join(HERE, "home", "styles.css"), encoding="utf-8").read()

def show(pattern, limit=8, label=""):
    print("=== %s ===" % label)
    seen = 0
    for m in re.finditer(pattern, css):
        start = m.start()
        brace = css.find("{", start)
        if brace == -1:
            continue
        # find matching closing brace
        depth = 0
        i = brace
        while i < len(css):
            if css[i] == "{":
                depth += 1
            elif css[i] == "}":
                depth -= 1
                if depth == 0:
                    break
            i += 1
        print("  " + css[start:min(i + 1, start + 460)].replace("\n", " "))
        seen += 1
        if seen >= limit:
            break
    print()

show(r"\.lv3-hero-shade", label="hero shade")
show(r"\.lv3-hero-copy", label="hero copy")
show(r"\.lv3-hero-title", label="hero title")
show(r"\.lv3-hero\b", label="hero root")
show(r"data-table=day", label="day table overrides")
show(r"data-table=love", label="love table overrides")
