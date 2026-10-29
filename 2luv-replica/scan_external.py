#!/usr/bin/env python
"""List every external host the replica still reaches out to."""
import glob
import os
import re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
SKIP = {"_htmlcache"}

HOST = re.compile(r"https?://([a-z0-9.\-]+\.[a-z]{2,})", re.I)
LOCAL_HOSTS = {"localhost", "127.0.0.1"}

files = []
for pat in ("**/*.html", "**/*.css", "**/*.js", "**/*.json"):
    files += glob.glob(os.path.join(HERE, pat), recursive=True)

hits = Counter()
examples = {}
scanned = 0
for f in files:
    rel = os.path.relpath(f, HERE).replace(os.sep, "/")
    if rel.split("/")[0] in SKIP:
        continue
    try:
        text = open(f, encoding="utf-8", errors="replace").read()
    except Exception:
        continue
    scanned += 1
    for m in HOST.finditer(text):
        host = m.group(1).lower()
        if host in LOCAL_HOSTS or host.endswith(".invalid"):
            continue
        hits[host] += 1
        if host not in examples:
            examples[host] = (rel, text[max(0, m.start() - 50):m.start() + 70].replace("\n", " "))

print("files scanned:", scanned)
print("\nexternal hosts referenced:")
for host, n in hits.most_common():
    print("  %-34s %5d   e.g. %s" % (host, n, examples[host][0]))

# also catch protocol-relative and bare-host forms the regex above misses
print("\nprotocol-relative //host refs:", len(re.findall(r'"//([a-z0-9.\-]+\.[a-z]{2,})/', 
      "".join(open(f, encoding="utf-8", errors="replace").read()
              for f in files[:400] if os.path.relpath(f, HERE).split(os.sep)[0] not in SKIP))))
