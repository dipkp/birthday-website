#!/usr/bin/env python
"""Check true residual external refs."""
import glob
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
PAT = {
    "http_media": re.compile(r"https?://media\.2-luv\.com"),
    "http_api": re.compile(r"https?://api\.2-luv\.com"),
    "http_www": re.compile(r"https?://www\.2-luv\.com"),
    "google_fonts": re.compile(r"fonts\.googleapis\.com"),
}
azure_files = []
azure_ctx = None

for path in glob.glob(os.path.join(HERE, "**", "*"), recursive=True):
    if not os.path.isfile(path):
        continue
    rel = os.path.relpath(path, HERE).replace(os.sep, "/")
    if rel.split("/")[0] == "_htmlcache":
        continue
    if os.path.splitext(path)[1].lower() not in (".html", ".js", ".css", ".json"):
        continue
    t = open(path, encoding="utf-8", errors="replace").read()
    if "applicationinsights" in t or "livediagnostics" in t:
        azure_files.append(rel)
        if azure_ctx is None:
            i = t.find("applicationinsights")
            if i < 0:
                i = t.find("livediagnostics")
            azure_ctx = (rel, re.sub(r"\s+", " ", t[max(0, i - 260):i + 200]))

totals = {k: 0 for k in PAT}
for path in glob.glob(os.path.join(HERE, "**", "*"), recursive=True):
    if not os.path.isfile(path):
        continue
    rel = os.path.relpath(path, HERE).replace(os.sep, "/")
    if rel.split("/")[0] == "_htmlcache":
        continue
    if os.path.splitext(path)[1].lower() not in (".html", ".js", ".css", ".json"):
        continue
    t = open(path, encoding="utf-8", errors="replace").read()
    for k, rx in PAT.items():
        totals[k] += len(rx.findall(t))

print("true external URL counts:", totals)
print("azure files:", len(azure_files), azure_files[:3])
if azure_ctx:
    print("\ncontext:\n ", azure_ctx[0], "::", azure_ctx[1][:420])
