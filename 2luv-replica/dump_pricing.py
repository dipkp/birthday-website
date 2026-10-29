#!/usr/bin/env python
"""Dump the pricing state machine out of reveal.D3SOoAzP.js."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(HERE, "assets", "_astro", "reveal.D3SOoAzP.js")
text = open(path, encoding="utf-8").read()

for needle in ["price-wrap", "pricing/landing", "price-retry"]:
    i = text.find(needle)
    print("=" * 70)
    print("around %r (index %d)" % (needle, i))
    print("=" * 70)
    print(text[max(0, i - 1400):i + 1400])
    print()

# every quoted token that looks like a state name
print("=" * 70)
print("candidate state literals:", sorted(set(re.findall(r'"[a-z]{3,10}"', text)))[:40])
