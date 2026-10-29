#!/usr/bin/env python
"""Locate the module that owns the pricing state machine."""
import glob
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
PATS = ["option-price", "price-wrap", "price-retry", "price-state", "pricing/landing",
        "aria-busy", "formatted"]

for path in sorted(glob.glob(os.path.join(HERE, "assets", "_astro", "*.js")) +
                   glob.glob(os.path.join(HERE, "assets", "_lazy", "*.js"))):
    text = open(path, encoding="utf-8").read()
    hits = [p for p in PATS if p in text]
    if hits:
        print("%-55s %s" % (os.path.basename(path), hits))
