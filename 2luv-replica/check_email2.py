#!/usr/bin/env python
"""Confirm: is there any code path that emails the gift to the recipient?"""
import glob
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
FILES = glob.glob(os.path.join(HERE, "assets", "**", "*.js"), recursive=True) + \
        glob.glob(os.path.join(HERE, "_app", "**", "*.js"), recursive=True)

print("scanned js files:", len(FILES))

def show(token, limit=4, width=130):
    print(f"\n=== {token} ===")
    seen = 0
    for f in FILES:
        t = open(f, encoding="utf-8", errors="replace").read()
        for m in re.finditer(re.escape(token), t):
            ctx = re.sub(r"\s+", " ", t[max(0, m.start() - 80):m.start() + width])
            print(f"  [{os.path.basename(f)}] {ctx}")
            seen += 1
            if seen >= limit:
                return
    if not seen:
        print("  (none)")

for tok in ["postmark", "mailto:", "recipientEmail", "guestEmail", "toEmail",
            "invite", "shareViaEmail", "sendToRecipient"]:
    show(tok)

# any endpoint that looks like it delivers/sends?
print("\n=== endpoints containing send/mail/deliver/invite ===")
eps = set()
for f in FILES:
    t = open(f, encoding="utf-8", errors="replace").read()
    for m in re.finditer(r'["\'`](/api/[a-z0-9\-/{}$.:]+)["\'`]', t):
        eps.add(m.group(1))
for e in sorted(eps):
    print("  " + e)
