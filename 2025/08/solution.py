from pathlib import Path
import math
import time

file_path = Path(__file__).parent / "input.txt"
number_of_connections = 1000
number_of_circuits = 3

class UnionFind:
    def __init__(self, n):
        self.n = n
        self.parent = list(range(n))
        self.size = [1] * n
        self.num_groups = n

    def find(self, i):
        if self.parent[i] != i:
            self.parent[i] = self.find(self.parent[i])
        return self.parent[i]
    
    def union(self, i, j):
        root_i = self.find(i)
        root_j = self.find(j)

        if root_i == root_j:
            return False
        
        if self.size[root_i] < self.size[root_j]:
            self.parent[root_i] = root_j
            self.size[root_j] += self.size[root_i]
        else:
            self.parent[root_j] = root_i
            self.size[root_i] += self.size[root_j]

        self.num_groups -= 1
        return True
    
    def get_unique_roots(self):
        unique_roots = set()
        for i in range(self.n):
            root = self.find(i)
            unique_roots.add(root)
        group_sizes = []
        for root in unique_roots:
            group_sizes.append(self.size[root])
        group_sizes.sort(reverse=True)
        return group_sizes

def Part_One():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        file = file_handle.read().replace(r"\rgm", "").split("\n")
    box_positions = [[int(val) for val in row.split(",")] for row in file]

    distances_map = []

    for i in range(0, len(box_positions)):
        for j in range(i+1, len(box_positions)):
            distance = math.dist(box_positions[i], box_positions[j])
            distances_map.append((distance, i, j))

    distances_map = sorted(distances_map)
    number_of_nodes = len(box_positions)

    uf = UnionFind(number_of_nodes)

    for c in range(number_of_connections):
        _, node_i, node_j = distances_map[c]
        uf.union(node_i, node_j)

    total = math.prod(uf.get_unique_roots()[:3])

    print(total)
    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 

def Part_Two():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        file = file_handle.read().replace(r"\rgm", "").split("\n")
    box_positions = [[int(val) for val in row.split(",")] for row in file]

    distances_map = []

    for i in range(0, len(box_positions)):
        for j in range(i+1, len(box_positions)):
            distance = math.dist(box_positions[i], box_positions[j])
            distances_map.append((distance, i, j))

    distances_map.sort()
    number_of_nodes = len(box_positions)

    uf = UnionFind(number_of_nodes)
    
    total = 0

    for edge in distances_map:
        _, node_i, node_j = edge
        if uf.union(node_i, node_j):
            if uf.num_groups == 1:
                total = box_positions[node_i][0] * box_positions[node_j][0]
                break

    print(total)
    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds") 

# ====================
# Initial version
# ====================

def Part_One_Old():
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

def Part_Two_Old():
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


        
