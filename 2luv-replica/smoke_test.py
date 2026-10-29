#!/usr/bin/env python
"""End-to-end smoke test: serve the replica and confirm real HTTP responses.

Checks that the server returns 200 for every page and for a sample of assets,
and that the balloon digit artwork - the feature that depends on paths built at
runtime - is actually fetchable.
"""
import http.server
import os
import random
import re
import socketserver
import threading
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
PORT = 8891


class Quiet(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=HERE, **kw)

    def log_message(self, *a):
        pass


def serve():
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), Quiet)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def get(path):
    try:
        with urllib.request.urlopen("http://127.0.0.1:%d%s" % (PORT, path), timeout=15) as r:
            return r.status, r.read()
    except urllib.error.HTTPError as e:
        return e.code, b""
    except Exception as e:
        return None, str(e).encode()


httpd = serve()
problems = []

PAGES = ["/", "/index.html", "/home/", "/pricing/", "/create/", "/blog/", "/contact/",
         "/about/", "/features/"]

print("=== pages ===")
for p in PAGES:
    code, body = get(p)
    ok = code == 200 and len(body) > 2000
    print("  %-22s %s  %d bytes" % (p, code, len(body)))
    if not ok:
        problems.append("page %s -> %s (%d bytes)" % (p, code, len(body)))

# ---- every asset referenced by the birthday page, over real HTTP -----------
print("\n=== assets referenced by the birthday page ===")
html = open(os.path.join(HERE, "index.html"), encoding="utf-8").read()
refs = set()
for m in re.finditer(r'(?:src|href|poster)="(assets/[^"]+)"', html):
    refs.add(m.group(1))
for m in re.finditer(r'srcset="([^"]+)"', html):
    for part in m.group(1).split(","):
        part = part.strip().split(" ")[0]
        if part.startswith("assets/"):
            refs.add(part)
for m in re.finditer(r'"(assets/[A-Za-z0-9._/\-]+\.(?:avif|webp|png|jpe?g|svg|mp4|webm))"', html):
    refs.add(m.group(1))

bad = 0
for ref in sorted(refs):
    code, body = get("/" + ref)
    if code != 200 or len(body) == 0:
        problems.append("asset %s -> %s" % (ref, code))
        bad += 1
print("  %d assets requested, %d failed" % (len(refs), bad))

# ---- the runtime-assembled balloon artwork --------------------------------
print("\n=== runtime-assembled balloon artwork ===")
balloon_ok = 0
for digit in range(10):
    for path in ["/assets/images/landing/v3/party/balloons/digit-%d-lg.webp" % digit,
                 "/assets/images/landing/v3/responsive/party/balloons/digit-%d-lg-192.avif" % digit]:
        code, body = get(path)
        if code == 200 and len(body) > 500:
            balloon_ok += 1
        else:
            problems.append("balloon %s -> %s" % (path, code))
print("  20 requested, %d served" % balloon_ok)

# ---- JS modules -----------------------------------------------------------
print("\n=== js modules over http ===")
js = []
for root, _d, files in os.walk(os.path.join(HERE, "assets")):
    for name in files:
        if name.endswith(".js"):
            js.append(os.path.relpath(os.path.join(root, name), HERE).replace(os.sep, "/"))
js_bad = 0
for m in js:
    code, body = get("/" + m)
    if code != 200 or len(body) == 0:
        problems.append("js %s -> %s" % (m, code))
        js_bad += 1
print("  %d modules requested, %d failed" % (len(js), js_bad))

# ---- css ------------------------------------------------------------------
print("\n=== stylesheets ===")
for p in ["/styles.css", "/home/styles.css", "/pricing/styles.css", "/create/styles.css",
          "/blog/styles.css", "/contact/styles.css", "/about/styles.css"]:
    code, body = get(p)
    print("  %-24s %s  %d bytes" % (p, code, len(body)))
    if code != 200:
        problems.append("css %s -> %s" % (p, code))

httpd.shutdown()

print()
if problems:
    print("FAILED (%d):" % len(problems))
    for p in problems[:25]:
        print("  " + p)
    raise SystemExit(1)
print("OK - served cleanly over HTTP")
