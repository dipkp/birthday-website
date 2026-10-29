#!/usr/bin/env python
"""Fetch exactly the paths the browser reported as 404, from the recheck output."""
import json
import os
import re
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ORIGIN = "https://www.2-luv.com"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
RECHECK = os.path.join(HERE, "..", "audit-tools", "recheck.json")

data = json.load(open(RECHECK, encoding="utf-8"))
paths = set()
for entry in data:
    for item in entry.get("bad", []):
        m = re.match(r"^\d{3}\s+(/\S+)$", item)
        if m:
            paths.add(m.group(1))

print("404 paths to fetch: %d" % len(paths))
pulled, failed = 0, []
for path in sorted(paths):
    dest = os.path.join(HERE, path.lstrip("/").replace("/", os.sep))
    if os.path.isfile(dest):
        continue
    req = urllib.request.Request(ORIGIN + path, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=40) as resp:
            body = resp.read()
    except Exception:
        failed.append(path)
        continue
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "wb") as fh:
        fh.write(body)
    pulled += 1
    print("   + " + path)

print("\npulled %d   failed %d" % (pulled, len(failed)))
for f in failed:
    print("   ! " + f)
