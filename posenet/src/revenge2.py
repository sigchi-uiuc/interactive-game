with open("Test.txt", "a") as f:
    for i in range(8, 10000):
        f.write(f"Name {i}: cnee\n")
        thing = i
    f.write(f"Name {i+1}: Chris Nee\n")