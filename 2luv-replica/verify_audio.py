#!/usr/bin/env python
"""Verify the fetched audio against the site's own manifest (bytes + sha256)."""
import glob
import hashlib
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
PAT = re.compile(
    r'"src":"(/themes/[^"]+\.(?:mp3|m4a))","bytes":(\d+),"durationMs":\d+,"sha256":"([0-9a-f]{16,64})"')

entries = {}
for f in glob.glob(os.path.join(HERE, "_app", "**", "*.js"), recursive=True) + \
         glob.glob(os.path.join(HERE, "assets", "**", "*.js"), recursive=True):
    text = open(f, encoding="utf-8", errors="replace").read()
    for m in PAT.finditer(text):
        entries[m.group(1)] = (int(m.group(2)), m.group(3))

print("manifest entries found: %d" % len(entries))

ok, size_bad, sha_bad, absent = 0, [], [], []
for src, (nbytes, sha) in sorted(entries.items()):
    p = os.path.join(HERE, src.lstrip("/").replace("/", os.sep))
    if not os.path.isfile(p):
        absent.append(src)
        continue
    if os.path.getsize(p) != nbytes:
        size_bad.append((src, nbytes, os.path.getsize(p)))
        continue
    h = hashlib.sha256(open(p, "rb").read()).hexdigest()
    if not h.startswith(sha):
        sha_bad.append(src)
        continue
    ok += 1

print("byte + sha256 exact : %d" % ok)
print("size mismatch       : %d %s" % (len(size_bad), size_bad[:3]))
print("sha mismatch        : %d %s" % (len(sha_bad), sha_bad[:3]))
print("not on disk         : %d %s" % (len(absent), absent[:3]))
