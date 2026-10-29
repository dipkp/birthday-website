#!/usr/bin/env python
"""Summarise the REA web-bundle analysis JSON."""
import json

d = json.load(open("rea-bundle.json", encoding="utf-8-sig"))
print("ok:", d.get("ok"))
res = d.get("result") or d.get("data") or {}
print("top keys:", list(d.keys()))
if res:
    print("result keys:", list(res.keys()))

def counts(o, path=""):
    if isinstance(o, dict):
        for k, v in o.items():
            yield from counts(v, path + "/" + k)
    elif isinstance(o, list):
        yield path, len(o)
        for i, v in enumerate(o[:1]):
            yield from counts(v, path + "[0]")

print("\n--- list sizes (>=3) ---")
for p, n in counts(d):
    if n >= 3:
        print(f"  {p} = {n}")

# dig for the analysis payload
for key in ["normalized_result", "analysis", "bundle", "evidence"]:
    if isinstance(d.get(key), dict):
        print(f"\n{key} keys:", list(d[key].keys()))

