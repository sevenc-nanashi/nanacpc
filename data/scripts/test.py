#!/usr/bin/env python3
import sys
import subprocess
import glob

source = sys.argv[1]
compile = subprocess.run(["compileg++", source])
if compile.returncode != 0:
    print("CE")
    sys.exit(1)

num_passed = 0
num_failed = 0
for test in glob.glob("test/*.in"):
    output = test[:-3] + "out"
    result = subprocess.run(
        ["runcpp"], input=open(test, "rb").read(), stdout=subprocess.PIPE
    )
    expected = open(output, "rb").read()
    if result.stdout == expected:
        print(f"{test}: AC")
        num_passed += 1
    else:
        print(f"{test}: WA")
        print("Expected:")
        print(expected.decode())
        print("Got:")
        print(result.stdout.decode())
        num_failed += 1

print(f"Passed: {num_passed}, Failed: {num_failed}")
if num_failed > 0:
    sys.exit(1)
