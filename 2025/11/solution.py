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
            
def main():
    Part_One()

if __name__ == "__main__":
    main()