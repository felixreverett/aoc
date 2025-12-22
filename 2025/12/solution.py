from pathlib import Path
import time

file_path = Path(__file__).parent / "input.txt"

class Present():
    def __init__(self, presentdata):
        self.id, self.area, self.shape = self.process_present_data(presentdata)

    def process_present_data(self, presentdata):
        id = int(presentdata[0].replace(":", ""))
        shape = presentdata[1:]

        area = 0
        for row in shape:
            for c in row:
                if c == "#":
                    area+=1
        return id, area, shape

class Tree():
    def __init__(self, treedata):
        self.w, self.h, self.area, self.spaces, self.number_of_presents, self.presents = self.process_tree_data(treedata)

    def process_tree_data(self, treedata):
        sizedata, presentdata = treedata.split(": ")
        w, h = [int(unit) for unit in sizedata.split("x")]
        presents = [int(p) for p in presentdata.split(" ")]
        number_of_presents = sum(presents)
        spaces = (w // 3) * (h // 3)
        return w, h, w*h, spaces, number_of_presents, presents

def Part_One():
    with open(file_path, "r") as file_handle:
        input = [parts.split("\n") for parts in file_handle.read().split("\n\n")]
        presents = [Present(presentdata) for presentdata in input[:-1]]
        trees = [Tree(treedata) for treedata in input[-1]]

    total = 0
    for tree in trees:
        if tree.number_of_presents <= tree.spaces:
            total+=1

    return total

if __name__ == "__main__":
    start_time = time.perf_counter()
    total = Part_One()
    print(f"Finished Part 1 in {time.perf_counter() - start_time:.4f} seconds") 
    print(total)