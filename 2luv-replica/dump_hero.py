#!/usr/bin/env python
"""Dump the home page hero markup to see how the day/night image and copy are chosen."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
html = open(os.path.join(HERE, "home", "index.html"), encoding="utf-8").read()

i = html.find("The digital love letter")
start = max(0, i - 5000)
section = html[start:i + 1200]

# trim noise: collapse the long class lists a little
print(section)
