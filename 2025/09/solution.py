from pathlib import Path
import time
import math
from collections import defaultdict

file_path = Path(__file__).parent / "sample-input.txt"

def Part_One():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        file = file_handle.read().replace(r"\rgm", "").split("\n")
    tiles = [[int(val) for val in row.split(",")] for row in file]

    largest_area = 0

    for a in range(len(tiles)-1):
        for b in range(a+1, len(tiles)):
            new_area = (abs(tiles[b][0]-tiles[a][0]) + 1) * (abs(tiles[b][1] - tiles[a][1]) + 1)
            if new_area > largest_area:
                largest_area = new_area

    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 
    print(largest_area)

def Part_Two_v2():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        file = file_handle.read().replace(r"\rgm", "").split("\n")
    tiles = [[int(val) for val in row.split(",")] for row in file]

    outline_pixels = set()

    for i in range(len(tiles)):
        p1 = tiles[i]
        
        

def Part_Two():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        file = file_handle.read().replace(r"\rgm", "").split("\n")
    tiles = [[int(val) for val in row.split(",")] for row in file]

    row_map = defaultdict(list)

    edges = []
    num_nodes = len(tiles)
    for i in range(num_nodes):
        for j in range(i + 1, num_nodes):
            dist = math.dist(tiles[i], tiles[j])
            edges.append((dist, tiles[i], tiles[j]))

    edges.sort(key=lambda x: x[0])

    limit = len(tiles) * 2
    active_edges = edges[:limit]

    for _, p1, p2 in active_edges:
        x1, y1 = p1
        x2, y2 = p2
        dx = abs(x2 - x1)
        dy = abs(y2 - y1)
        steps = math.gcd(dx, dy)

        step_x = (x2 - x1) // steps
        step_y = (y2 - y1) // steps

        for i in range(steps + 1):
            curr_x = x1 + (i * step_x)
            curr_y = y1 + (i * step_y)

            if y1 == y2:
                row_map[y1].append([min(x1, x2), max(x1, x2)])
                break

            row_map[curr_y].append([curr_x, curr_x])

    for y in row_map:
        intervals = sorted(row_map[y])
        merged = []
        if intervals:
            curr_start, curr_end = intervals[0]
            for next_start, next_end in intervals[1:]:
                if next_start <= curr_end + 1:
                    curr_end = max(curr_end, next_end)
                else:
                    merged.append((curr_start, curr_end))
                    curr_start, curr_end = next_start, next_end
            merged.append((curr_start, curr_end))
        row_map[y] = merged

    # section 2
    candidates = []
    for a in range(len(tiles)-1):
        for b in range(a+1, len(tiles)):
            p1 = tiles[a]
            p2 = tiles[b]
            w = abs(p2[0] - p1[0]) + 1
            h = abs(p2[1] - p1[1]) + 1
            candidates.append((w * h, p1, p2))
    candidates.sort(key=lambda x: x[0], reverse=True)

    largest_valid_area = 0

    for area, p1, p2 in candidates:
        min_x, max_x = sorted((p1[1], p2[0]))
        min_y, max_y = sorted((p1[1], p2[1]))
        is_valid = True

        # row scan
        for y in range(min_y, max_y + 1):
            if y not in row_map:
                is_valid = False
                break

            # checking if [min_x, max_x] fits inside any merged intervals
            row_covered = False
            for interval in row_map[y]:
                i_start, i_end = interval
                if i_start <= min_x and i_end >= max_x:
                    row_covered = True
                    break
            
            if not row_covered:
                is_valid = False
                break

        if is_valid:
            largest_valid_area = area
            break
    
    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 
    print(f"Largest Valid Area: {largest_valid_area}")

    """
    areas = []

    for a in range(len(tiles)-1):
        for b in range(a+1, len(tiles)):
            p1 = tiles[a]
            p2 = tiles[b]
            width = abs(p2[0] - p1[0]) + 1
            height = abs(p2[1] - p1[1]) + 1
            area = width * height

            if area > total_tile_count:
                continue

            areas.append((area, p1, p2))

    areas.sort(reverse=True)

    # 
    largest_valid_area = 0

    for area, p1, p2 in areas:
        min_x, max_x = sorted((p1[0], p2[0]))
        min_y, max_y = sorted((p1[1], p2[1]))

        is_valid = True

        for y in range(min_y, max_y + 1):
            for x in range(min_x, max_x + 1):
                if (x, y) not in tile_set:
                    is_valid = False
                    break
            if not is_valid:
                break
        
        if is_valid:
            largest_valid_area = area
            break"""


def main():
    Part_One()
    Part_Two()

if __name__ == "__main__":
    main()