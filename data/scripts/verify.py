#!/usr/bin/env python3
import sys
import hashlib
import re

with open(sys.argv[1], 'r') as f:
    for line in f:
        line = line.rstrip('\n')
        line_hash = hashlib.sha256(re.sub(r"[ \t]", "", line).encode()).hexdigest()
        print(f"{line_hash[:4]} | {line}")
