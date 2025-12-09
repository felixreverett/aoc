from pathlib import Path
import time

file_path = Path(__file__).parent / "input.txt"

def isInBounds(r, c, maxR, maxC):
    return r >= 0 and c >= 0 and r < maxR and c < maxC

def Part_One():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        input = file_handle.read().replace(r"\rgm", "").split("\n")
    split_input = [list(row) for row in input]
    start_point = [0, split_input[0].index("S")]

    visited_splitters = []
    current_routes = []
    current_routes.append(start_point)

    while (current_routes):
        [r, c] = current_routes.pop()
        routeOngoing = True
        
        while routeOngoing:
            split_input[r][c] = "|"
            if isInBounds(r+1, c, len(split_input), len(split_input[0])):
                match split_input[r+1][c]:
                    case "^":
                        if (r+1)*len(split_input)+c not in visited_splitters:
                            visited_splitters.append((r+1)*len(split_input)+c)
                        continue_left = False
                        if isInBounds(r+1, c+1, len(split_input), len(split_input[0])) and split_input[r+1][c+1] == ".":
                            current_routes.append([r+1, c+1])
                        if isInBounds(r+1, c-1, len(split_input), len(split_input[0])) and split_input[r+1][c-1] == ".":
                            r, c = r+1, c-1
                            continue_left = True
                        if not continue_left:
                            routeOngoing = False
                    case ".":
                        r, c = r+1, c
                    case "|":
                        routeOngoing = False
            else:
                routeOngoing = False
            
    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 
    print(len(visited_splitters))

def Part_Two():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        input = file_handle.read().replace(r"\rgm", "").split("\n")
    global split_input # I hate that I'm using global here but f it, Python has no pointers
    split_input = [list(row) for row in input]
    start_point = [0, split_input[0].index("S")]

    global visited_splitters
    visited_splitters = {}
    total = traverse(start_point[0], start_point[1])
    
    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 
    print(total)

def traverse(r, c):
    routeOngoing = True
    while routeOngoing:
        match split_input[r][c]:
            case "^":
                key = r*len(split_input)+c
                if key in visited_splitters:
                    return visited_splitters[key]
                else:
                    left, right = 0, 0
                    if isInBounds(r, c-1, len(split_input), len(split_input[0])):
                        left = traverse(r, c-1)
                    if isInBounds(r, c+1, len(split_input), len(split_input[0])):
                        right = traverse(r, c+1)
                    visited_splitters[key] = left + right
                    return left + right
            case "." | "S":
                if isInBounds(r+1, c, len(split_input), len(split_input[0])):
                    r+=1
                else:
                    return 1

def main():
    Part_One()
    Part_Two()

if __name__ == "__main__":
    main()