#!/usr/bin/env python
"""Print the origin event page's script tags verbatim, to fix the extraction regex."""
import re
import urllib.request

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
req = urllib.request.Request("https://www.2-luv.com/en/event/anniversary-gift",
                            headers={"User-Agent": UA})
html = urllib.request.urlopen(req, timeout=40).read().decode("utf-8", "replace")
print("bytes:", len(html))

for m in re.finditer(r"<script\b[^>]*>", html):
    tag = m.group(0)
    if "src=" in tag or "type=" in tag:
        print("  " + tag[:160])

print("\nany _astro js refs:")
for ref in sorted(set(re.findall(r"/_astro/[A-Za-z0-9._\-]+\.js", html))):
    print("  " + ref)
