from cryptography.fernet import Fernet
import sys
import json

key = sys.argv[1]

f = Fernet(key) 

shared_memory = {}
with open("shared_memory.json", "r") as outfile: 
    shared_memory = json.load(outfile)

for item in shared_memory:
    shared_memory[key] = f.encrypt(shared_memory[key].encode()).decode("utf-8", "strict")

shared_memory = {}
with open("shared_memory.json", "w") as outfile: 
    outfile.write(json.dumps(shared_memory))