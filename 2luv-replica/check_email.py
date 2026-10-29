#!/usr/bin/env python
"""Does the flow email the recipient, or does it only hand you a link/QR?"""
import glob
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))

# ---- 1. what the site's own FAQ says ------------------------------------
page = os.path.join(HERE, "index.html")
html = open(page, encoding="utf-8").read()
print("=== birthday FAQ (site's own words) ===")
for m in re.finditer(r"<details[^>]*>(.*?)</details>", html, re.S):
    block = m.group(1)
    q = re.search(r"<summary[^>]*>(.*?)</summary>", block, re.S)
    a = re.search(r"<p[^>]*>(.*?)</p>", block, re.S)
    if not q:
        continue
    qt = re.sub(r"<[^>]+>", "", q.group(1)).strip()
    at = re.sub(r"<[^>]+>", "", a.group(1)).strip() if a else ""
    if re.search(r"send|email|mail|app|deliver", qt, re.I):
        print("Q: " + re.sub(r"\s+", " ", qt))
        print("A: " + re.sub(r"\s+", " ", at)[:420])
        print()

# ---- 2. what the code actually calls ------------------------------------
TOKENS = ["sendEmail", "send-email", "email", "mailto", "resend", "sendgrid",
          "postmark", "mailgun", "/api/letter", "notify", "recipient"]

print("=== token hits in shipped JS / configs ===")
hits = {t: 0 for t in TOKENS}
examples = []
for path in glob.glob(os.path.join(HERE, "assets", "**", "*.js"), recursive=True) + \
            glob.glob(os.path.join(HERE, "_app", "**", "*.js"), recursive=True):
    text = open(path, encoding="utf-8", errors="replace").read()
    for t in TOKENS:
        n = text.count(t)
        if n:
            hits[t] += n
            if len(examples) < 18 and t in ("/api/letter", "sendEmail", "resend", "sendgrid"):
                i = text.find(t)
                examples.append((t, os.path.basename(path), text[max(0, i - 70):i + 90]))

for t, n in hits.items():
    print("  %-14s %d" % (t, n))

print("\n=== sample contexts ===")
for t, f, ctx in examples:
    print("  [%s] %s :: %s" % (t, f, re.sub(r"\s+", " ", ctx)[:150]))
