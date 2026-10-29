#!/usr/bin/env python
"""Fetch every missing audio asset referenced by the site."""
import json
import os
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ORIGIN = "https://www.2-luv.com"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

missing = json.load(open(os.path.join(HERE, "audio-missing.json"), encoding="utf-8"))
print("to fetch:", len(missing))

pulled, failed, total = 0, [], 0
for p in missing:
    dest = os.path.join(HERE, p.lstrip("/").replace("/", os.sep))
    if os.path.isfile(dest):
        continue
    req = urllib.request.Request(ORIGIN + p, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
    except Exception as exc:
        failed.append("%s (%s)" % (p, str(exc)[:50]))
        continue
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "wb") as fh:
        fh.write(data)
    pulled += 1
    total += len(data)
    print("   + %-58s %6.1f KB" % (p.split("/audio/")[-1], len(data) / 1024))

print("\npulled %d   failed %d   %.1f MB" % (pulled, len(failed), total / 1048576))
for f in failed:
    print("   ! " + f)
