from cryptography.fernet import Fernet
import sys
import json

key = (sys.argv[1]).encode()

if key == b"tM6caMoe7fGqdZejfdLjHSyFmgCCb71sQ2XT1yV3n30=":
    print("KEY IS CORRECT")

f = Fernet(key) 

shared_memory = {}
with open("shared_memory.json", "r") as outfile: 
    shared_memory = json.load(outfile)

for item in shared_memory:
    shared_memory[item] = f.decrypt(shared_memory[item].encode()).decode("utf-8", "strict")

with open("shared_memory.json", "w") as outfile2: 
    outfile2.write(json.dumps(shared_memory))
