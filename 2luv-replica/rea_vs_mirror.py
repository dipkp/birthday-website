#!/usr/bin/env python
"""Cross-check REA's captured script graph against the mirror on disk."""
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
d = json.load(open(os.path.join(HERE, "..", "rea-bundle.json"), encoding="utf-8-sig"))
nr = d["data"]["normalized_result"]

nodes = nr["observations"]["chunks"]["nodes"]
edges = nr["observations"]["chunks"]["edges"]
print("REA captured chunks: %d   import edges: %d" % (len(nodes), len(edges)))

missing, present = [], 0
for n in nodes:
    u = n.get("url") or ""
    p = re.sub(r"^https?://[^/]+", "", u).split("?")[0]
    if not p:
        continue
    if p.startswith("/_astro") or p.startswith("/_lazy"):
        cand = os.path.join(HERE, "assets", p.lstrip("/").replace("/", os.sep))
    elif p.startswith("/_app"):
        cand = os.path.join(HERE, p.lstrip("/").replace("/", os.sep))
    else:
        cand = os.path.join(HERE, "assets", p.lstrip("/").replace("/", os.sep))
    if os.path.isfile(cand):
        present += 1
    else:
        missing.append(p)

print("present on disk: %d" % present)
print("missing: %d" % len(missing))
for m in missing[:20]:
    print("   " + m)

json.dump(missing, open(os.path.join(HERE, "rea-missing.json"), "w", encoding="utf-8"), indent=2)

print("\n--- captured scripts (first 12) ---")
for n in nodes[:12]:
    print("   %6d B  %s" % (n.get("bytes", 0), (n.get("url") or "")[:96]))
