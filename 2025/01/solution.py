from pathlib import Path
import time

file_path = Path(__file__).parent / "input.txt"

def Part_One():
    with open(file_path, "r") as file_handle:
        data = [
            [(-1 if line[0] == "L" else 1), int(line[1:])]
            for line in file_handle.read().splitlines()
        ]
    dial_location = 50
    times_at_zero = 0

    for i in range(len(data)):
        dial_location = (((dial_location+data[i][0]*data[i][1]) % 100) + 100) % 100
        times_at_zero += 1 if dial_location == 0 else 0

    return times_at_zero

def Part_Two():
    with open(file_path, "r") as file_handle:
        data = [
            [(-1 if line[0] == "L" else 1), int(line[1:])]
            for line in file_handle.read().splitlines()
        ]
    dial_location = 50
    total_times_passed_zero = 0

    for direction, magnitude in data:
        old_loc = dial_location
        dial_location += direction * magnitude
        if dial_location == 0:
            total_times_passed_zero += 1
        total_times_passed_zero += (abs(dial_location)//100) + (dial_location < 0 and old_loc != 0)
        dial_location = (((dial_location) % 100) + 100) % 100

    return total_times_passed_zero

if __name__ == "__main__":
    start_time = time.perf_counter()
    solution = Part_One()
    print(f"Finished Part 1 in {time.perf_counter() - start_time:.4f} seconds") 
    print(solution)

    start_time = time.perf_counter()
    solution = Part_Two()
    print(f"Finished Part 2 in {time.perf_counter() - start_time:.4f} seconds") 
    print(solution)