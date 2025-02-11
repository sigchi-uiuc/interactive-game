with open("Test.txt", "a") as f:
    for i in range(8, 10000):
        f.write(f"Name {i}: \n")
        thing = i
    f.write(f"Name {i+1}: Shreyes Bharat\n")