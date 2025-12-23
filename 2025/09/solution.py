from pathlib import Path
import time
from collections import deque

file_path = Path(__file__).parent / "input.txt"

def Part_One():
    with open(file_path, "r") as file_handle:
        file = file_handle.read().replace(r"\rgm", "").split("\n")
    tiles = [[int(val) for val in row.split(",")] for row in file]

    largest_area = 0

    for a in range(len(tiles)-1):
        for b in range(a+1, len(tiles)):
            new_area = (abs(tiles[b][0]-tiles[a][0]) + 1) * (abs(tiles[b][1] - tiles[a][1]) + 1)
            if new_area > largest_area:
                largest_area = new_area

    return largest_area

def Part_Two():
    with open(file_path, "r") as file_handle:
        file = file_handle.read().replace(r"\rgm", "").split("\n")
    tiles = [[int(val) for val in row.split(",")] for row in file]
    num_tiles = len(tiles)

    # Coordinate compression with padding for later flood fill :)
    unique_xs = set(t[0] for t in tiles)
    unique_ys = set(t[1] for t in tiles)

    unique_xs.add(min(unique_xs) - 1)
    unique_xs.add(max(unique_xs) + 1)
    unique_ys.add(min(unique_ys) - 1)
    unique_ys.add(max(unique_ys) + 1)

    sorted_xs = sorted(list(unique_xs))
    sorted_ys = sorted(list(unique_ys))

    x_map = {val: i * 2 for i, val in enumerate(sorted_xs)}
    y_map = {val: i * 2 for i, val in enumerate(sorted_ys)}

    width = len(sorted_xs) * 2
    height = len(sorted_ys) * 2

    compressed_grid = [[0 for _ in range(width)] for _ in range(height)]

    compressed_tiles = [(x_map[t[0]], y_map[t[1]]) for t in tiles]

    for i in range(num_tiles):
        p1 = compressed_tiles[i]
        p2 = compressed_tiles[(i + 1) % num_tiles]

        c1, r1 = p1
        c2, r2 = p2

        if c1 == c2: # vertical line
            for row in range(min(r1, r2), max(r1, r2) + 1):
                compressed_grid[row][c1] = 1 # wall
        else:
            for col in range(min(c1, c2), max(c1, c2) + 1):
                compressed_grid[r1][col] = 1 # wall

    # Flood filling the outside
    queue = deque([(0, 0)])

    if compressed_grid[0][0] == 0:
        compressed_grid[0][0] = -1

    while queue:
        cx, cy = queue.popleft()
        
        for dx, dy in [(1,0), (-1,0), (0,1), (0,-1)]:
            nx, ny = cx + dx, cy + dy
            
            if 0 <= nx < width and 0 <= ny < height:
                if compressed_grid[ny][nx] == 0:
                    compressed_grid[ny][nx] = -1
                    queue.append((nx, ny))

    # Summed area table
    sums = [[0 for _ in range(width + 1)] for _ in range(height + 1)]

    for y in range(1, height + 1):
        for x in range(1, width + 1):
            is_invalid = 1 if compressed_grid[y-1][x-1] == -1 else 0
            sums[y][x] = is_invalid + sums[y-1][x] + sums[y][x-1] - sums[y-1][x-1]
        
    def get_invalid_count(x1, y1, x2, y2):
        x_min, x_max = min(x1, x2), max(x1, x2)
        y_min, y_max = min(y1, y2), max(y1, y2)
        
        return (sums[y_max + 1][x_max + 1] 
              - sums[y_min][x_max + 1] 
              - sums[y_max + 1][x_min] 
              + sums[y_min][x_min])
        
    largest_area = 0

    # Iterate through all pairs of tiles
    for i in range(num_tiles):
        for j in range(i + 1, num_tiles):
            cx1, cy1 = compressed_tiles[i]
            cx2, cy2 = compressed_tiles[j]
            if get_invalid_count(cx1, cy1, cx2, cy2) == 0:
                
                orig_x1, orig_y1 = sorted_xs[cx1 // 2], sorted_ys[cy1 // 2]
                orig_x2, orig_y2 = sorted_xs[cx2 // 2], sorted_ys[cy2 // 2]
                
                area = (abs(orig_x2 - orig_x1) + 1) * (abs(orig_y2 - orig_y1) + 1)
                
                if area > largest_area:
                    largest_area = area
    
    return largest_area

if __name__ == "__main__":
    start_time = time.perf_counter()
    solution = Part_One()
    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 
    print(f"Part 1 Solution: {solution}")

    start_time = time.perf_counter()
    solution = Part_Two()
    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 
    print(f"Part 2 Solution: {solution}")