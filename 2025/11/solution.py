from pathlib import Path
import time

file_path = Path(__file__).parent / "input.txt"

def Part_One():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        devicesmaps = {
            parts[0]: [item.strip() for item in parts[1].split(" ")]
            for row in file_handle.read().strip().split("\n")
            for parts in [row.split(": ")]
        }

    memo = {"out": 1}

    total = traverse_route("you", devicesmaps["you"], memo, devicesmaps)

    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 
    print(total)

def traverse_route(key, values, memo, devicesmaps):
    if key == "out":
        return 1
    
    total = 0
    if key in memo:
        return memo[key]
    
    for v in values:
        if v not in memo:
            memo[v] = traverse_route(v, devicesmaps[v], memo, devicesmaps)
        total += memo[v]
    memo[key] = total
    return total

def Part_Two():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        devicesmaps = {
            parts[0]: [item.strip() for item in parts[1].split(" ")]
            for row in file_handle.read().strip().split("\n")
            for parts in [row.split(": ")]
        }
    
    memo = {}

    has_crossed_fft = False
    has_crossed_dac = False

    total = traverse_route_two("svr", memo, devicesmaps, has_crossed_fft, has_crossed_dac)

    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 
    print(total)
            
def traverse_route_two(key, memo, devicesmaps, has_crossed_fft, has_crossed_dac):
    
    if key == "fft":
        has_crossed_fft = True
    elif key == "dac":
        has_crossed_dac = True
    
    if key == "out":
        return 1 if has_crossed_fft and has_crossed_dac else 0
    
    state = (key, has_crossed_fft, has_crossed_dac)
    if state in memo:
        return memo[state]

    total = 0
    vals = devicesmaps.get(key, [])

    for v in vals:
        total += traverse_route_two(v, memo, devicesmaps, has_crossed_fft, has_crossed_dac)

    memo[state] = total

    return total

def main():
    Part_One()
    Part_Two()

if __name__ == "__main__":
    main()