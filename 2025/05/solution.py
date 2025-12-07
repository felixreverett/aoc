from pathlib import Path
from operator import itemgetter
import time
from math import inf

file_path = Path(__file__).parent / "input.txt"

def Part_One():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        input = file_handle.read().replace(r"\rgm", "").split("\n\n")
    ranges = sorted([[int(val) for val in row.split("-")] for row in input[0].split("\n")], key=itemgetter(0, 1))
    ingredients = [int(val) for val in input[1].split("\n")]

    total = 0

    for i in range(len(ingredients)):
        for r in range(len(ranges)):
            #print(f"value: {ingredients[i]} | range: {ranges[r][0]} to {ranges[r][1]}")
            if ingredients[i] > ranges[r][0]:
                if ingredients[i] <= ranges[r][1]:
                    #print(f"value {ingredients[i]} is within range")
                    total+=1
                    break

    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds")    
    print(total)

def Part_Two():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        input = file_handle.read().replace(r"\rgm", "").split("\n\n")
    ranges = sorted([[int(val) for val in row.split("-")] for row in input[0].split("\n")], key=itemgetter(0, 1))

    total = 0

    prevUpper = 0
    for r in range(len(ranges)):
            newRangeFound = False
            newLower, newUpper = ranges[r]
            # if new lower bound overlaps with previous upper bound, raise lower bound
            if newLower <= prevUpper:
                newLower = prevUpper+1
                # if the upper bound is also <= prevUpper, we can skip
                if newUpper <= prevUpper:
                    continue
                else:
                    newRangeFound = True
            else:
                newRangeFound = True
            # update previous values for next cycle
            prevUpper = newUpper
            # otherwise
            if (newRangeFound):
                subtotal = newUpper+1-newLower
                total+=subtotal
            
    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 
    print(total)

def main():
    Part_One()
    Part_Two()

if __name__ == "__main__":
    main()