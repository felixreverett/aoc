from pathlib import Path
import time
import helpers as h

file_path = Path(__file__).parent / "input.txt"

def Part_One():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        file = [line.strip() for line in file_handle.read().strip().split("\n")]

    machines = h.make_machines(file)
    
    total = 0
    for machine in machines:
        val = h.traverse_routes(machine)
        total += val

    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 
    print(total)

def Part_Two():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        file = [line.strip() for line in file_handle.read().strip().split("\n")]

    machines = h.make_joltage_machines(file)

    total = 0
    for i, machine in enumerate(machines):
        print(f"Processing machine {i+1} of {len(machines)}")
        val = h.traverse_joltage_route(machine)
        total += val

    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 
    print(total)

def main():
    Part_One()
    Part_Two()

if __name__ == "__main__":
    main()