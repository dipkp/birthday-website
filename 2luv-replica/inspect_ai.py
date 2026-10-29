#!/usr/bin/env python
"""Understand the site's AI call: request body, response shape, and the secure() envelope."""
import glob
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
FILES = glob.glob(os.path.join(HERE, "_app", "**", "*.js"), recursive=True) + \
        glob.glob(os.path.join(HERE, "assets", "**", "*.js"), recursive=True)

def ctx(token, before=400, after=900, limit=2):
    print("\n=== %s ===" % token)
    shown = 0
    for f in FILES:
        t = open(f, encoding="utf-8", errors="replace").read()
        for m in re.finditer(re.escape(token), t):
            print("[%s]" % os.path.basename(f))
            print(re.sub(r"\s+", " ", t[max(0, m.start() - before):m.start() + after]))
            shown += 1
            if shown >= limit:
                return
    if not shown:
        print("(none)")

ctx('"/api/ai/gift-suggestions"')
ctx("secure(t,e)", 200, 700)
ctx(".secure(", 200, 600, 3)
ctx("ai_gift_suggestions", 300, 700, 2)
