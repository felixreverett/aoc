from pathlib import Path
import time

file_path = Path(__file__).parent / "input.txt"

def Part_One():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        input = file_handle.read().replace(r"\rgm", "").split("\n")
    split_input = [[int(val) if i < len(input)-1 else val for val in row.split()] for i, row in enumerate(input)]

    total = 0

    for col in range(len(split_input[0])):
        match split_input[len(split_input)-1][col]:
            case "*":
                subtotal = 1
                for row in range(len(split_input)-1):
                    subtotal *= int(split_input[row][col])
            case "+":
                subtotal = 0
                for row in range(len(split_input)-1):
                    subtotal += int(split_input[row][col])
            case _:
                subtotal = 0
        
        total += subtotal

    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds")    
    print(total)

def Part_Two():
    start_time = time.perf_counter()
    with open(file_path, "r") as file_handle:
        input = file_handle.read().replace(r"\rgm", "").split("\n")
    operands = list(reversed(list(zip(*input[0:len(input)-1])))) #use zip to "rotate" the array
    operators = list(reversed(input[-1].split()))
    
    total = 0
    subtotal = 0

    for _, op in enumerate(operators):
        breakFound = False
        subtotal = 1 if op == "*" else 0

        while (not breakFound):
            if (len(operands) == 0):
                breakFound = True
                break
            val = "".join(operands.pop(0))
            if (val.strip() == ""):
                total += subtotal
                breakFound = True
            else:
                match op:
                    case "*":
                        subtotal *= int(val)
                    case "+":
                        subtotal += int(val)
    total+=subtotal
            
    print(f"Finished in {time.perf_counter() - start_time:.4f} seconds")    
    print(total)

def main():
    Part_One()
    Part_Two()

if __name__ == "__main__":
    main()