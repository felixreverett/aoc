from pathlib import Path
import math
import time

file_path = Path(__file__).parent / "input.txt"
number_of_connections = 1000
number_of_circuits = 3

def Part_One():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        file = file_handle.read().replace(r"\rgm", "").split("\n")
    box_positions = [[int(val) for val in row.split(",")] for row in file]

    distances_map = []
    trees = []

    for i in range(0, len(box_positions)):
        for j in range(i+1, len(box_positions)):
            distance = math.dist(box_positions[i], box_positions[j])
            distances_map.append([distance, [i, j]])

    distances_map = sorted(distances_map)

    for c in range(number_of_connections):
        box_a, box_b = distances_map[c][1]
        tree_with_a = -1
        tree_with_b = -1

        for t in range(len(trees)):
            if box_a in trees[t]:
                tree_with_a = t
            if box_b in trees[t]:
                tree_with_b = t

        if (tree_with_a != -1 and tree_with_a == tree_with_b):
            continue
        elif (tree_with_a != -1 and tree_with_b != -1):
            low_idx = min(tree_with_a, tree_with_b)
            high_idx = max(tree_with_a, tree_with_b)
            merged_array = trees[low_idx] + trees[high_idx]
            del trees[high_idx]
            trees[low_idx] = merged_array
        elif (tree_with_a != -1):
            trees[tree_with_a].append(box_b)
        elif (tree_with_b != -1):
            trees[tree_with_b].append(box_a)
        else:
            trees.append([box_a, box_b])

    trees = sorted(trees, key=len, reverse=True)
    total = 1
    for t in range(0, number_of_circuits):
        total*=len(trees[t])
    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 
    print(total)

def Part_Two():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        file = file_handle.read().replace(r"\rgm", "").split("\n")
    box_positions = [[int(val) for val in row.split(",")] for row in file]

    distances_map = []
    trees = []

    for i in range(0, len(box_positions)):
        for j in range(i+1, len(box_positions)):
            distance = math.dist(box_positions[i], box_positions[j])
            distances_map.append([distance, [i, j]])

    distances_map = sorted(distances_map)
    trees.append(distances_map[0][1])
    c = 1

    while True:
        box_a, box_b = distances_map[c][1]
        tree_with_a = -1
        tree_with_b = -1

        for t in range(len(trees)):
            if box_a in trees[t]:
                tree_with_a = t
            if box_b in trees[t]:
                tree_with_b = t

        if (tree_with_a != -1 and tree_with_a == tree_with_b):
            continue
        elif (tree_with_a != -1 and tree_with_b != -1):
            low_idx = min(tree_with_a, tree_with_b)
            high_idx = max(tree_with_a, tree_with_b)
            merged_array = trees[low_idx] + trees[high_idx]
            del trees[high_idx]
            trees[low_idx] = merged_array
        elif (tree_with_a != -1):
            trees[tree_with_a].append(box_b)
        elif (tree_with_b != -1):
            trees[tree_with_b].append(box_a)
        else:
            trees.append([box_a, box_b])

        trees = sorted(trees, key=len, reverse=True)
        if len(trees[0]) > len(box_positions):
            break
        c+=1
        print(trees)
        print(c)
    
    total = 1
    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 
    print(total)

def main():
    Part_One()
    Part_Two()

if __name__ == "__main__":
    main()