from pathlib import Path
import re
import time

file_path = Path(__file__).parent / "input.txt"

def PartOne():
    start_time = time.perf_counter()
    with open(file_path, "r") as my_file:
        input = my_file.read().replace(r"\r|\ngm", "").split(",")
    split_input = [[int(n) for n in i.split("-")] for i in input]
    
    total = 0
    my_pattern = r"^(.+)\1$"

    for [i, j] in split_input:
        for k in range(i, j+1):
            i2 = str(k)
            if (len(i2) % 2 == 0 and re.match(my_pattern, i2)):
                total += k

    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds")
    print(f"Part One Solution: {total}")

def PartTwo():
    start_time = time.perf_counter()
    with open(file_path, "r") as my_file:
        input = my_file.read().replace(r"\r|\ngm", "").split(",")
    split_input = [[int(n) for n in i.split("-")] for i in input]
    
    total = 0
    my_pattern = r"^(.+)\1+$"

    for [i, j] in split_input:
        for k in range(i, j+1):
            i2 = str(k)
            if (re.match(my_pattern, i2)):
                total += k

    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds")
    print(f"Part Two Solution: {total}")

def main():
    PartOne()
    PartTwo()

if __name__ == "__main__":
    main()