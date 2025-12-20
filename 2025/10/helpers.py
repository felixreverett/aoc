# ========================================================================================================================
# Helper functions for day 10 of AOC
#
# For this day I want to see if I can use bitmasks to 'encode' the target state.
# It might not be computationally more efficient, but it seems like an interesting approach.
#
# Edit: Part 2 out here ruining the fun >:)
# ========================================================================================================================

from dataclasses import dataclass
from collections import deque
from array import array
import re
import pulp

@dataclass
class Machine:
    target_state: int
    buttons: array[int]
    joltages: array[int]

def make_machines(file: list[str]) -> list[Machine]:
    return [
        Machine(
            target_state=encode_ILD(parts[0].replace("[", "").replace("]", "")),
            buttons=array('i', [
                encode_buttons([int(n) for n in group.split(",")])
                for group in re.findall(r"\(([^)]+)\)", parts[1])
            ]),
            joltages=array('i', [
                int(n) for n in parts[2].replace("{", "").replace("}", "").split(",")
            ])
        ) 
        for row in file
        for parts in [re.split(r"\]\s|\s\{", row)]
    ]

# encode 'indicator light diagram' into 1's and 0's
def encode_ILD(ild: str) -> int:
    encoded_value = 0
    for i, val in enumerate(ild):
        encoded_value += (2 ** i) if val == "#" else 0
    return encoded_value

def encode_buttons(buttons: list[int]) -> int:
    encoded_value = 0
    for i in buttons:
        encoded_value ^= 2**i
    return encoded_value

# go through every route and return the shortest route or -1
def traverse_routes(machine: Machine) -> int:
    traversed_routes = {0}
    queue = deque([(0, 0)])

    while queue:
        current_state, steps = queue.popleft()
        if current_state == machine.target_state:
            return steps
        for button in machine.buttons:
            next_state = current_state ^ button
            
            if next_state not in traversed_routes:
                traversed_routes.add(next_state)
                queue.append((next_state, steps + 1))
    
    return -1

# ========================================================================================================================
# Part 2
# ========================================================================================================================

@dataclass
class JoltageMachine:
    target_state: array[int]
    buttons: list[array[int]]

def make_joltage_machines(file: list[str]) -> list[JoltageMachine]:
    return [
        JoltageMachine(
            target_state=array('i', [
                int(n) for n in parts[2].replace("{", "").replace("}", "").split(",")
            ]),
            buttons=[
                array('i', [int(n) for n in group.split(",")])
                for group in re.findall(r"\(([^)]+)\)", parts[1])
            ]
        )
        for row in file
        for parts in [re.split(r"\]\s|\s\{", row)]
    ]

def traverse_joltage_route(jm: JoltageMachine) -> int:
    prob = pulp.LpProblem("Minimize_Presses", pulp.LpMinimize)

    button_vars = [
        pulp.LpVariable(f"btn_{i}", lowBound=0, cat=pulp.LpInteger) 
        for i in range(len(jm.buttons))
    ]

    prob += pulp.lpSum(button_vars)

    for counter_idx, target in enumerate(jm.target_state):
        buttons_affecting_this = [
            button_vars[btn_idx] 
            for btn_idx, btn_indices in enumerate(jm.buttons) 
            if counter_idx in btn_indices
        ]
        prob += pulp.lpSum(buttons_affecting_this) == target

    prob.solve(pulp.PULP_CBC_CMD(msg=0))

    if pulp.LpStatus[prob.status] == 'Optimal':
        return int(pulp.value(prob.objective))
    
    return -1

def traverse_joltage_route_old(jm: JoltageMachine) -> int:
    
    start_state = tuple([0] * len(jm.target_state))
    target_tuple = tuple(jm.target_state)
    visited = {start_state}
    queue = deque([(start_state, 0)])

    while queue:
        current_state, steps = queue.popleft()

        if current_state == target_tuple:
            return steps
        
        for button in jm.buttons:
            next_state_list = list(current_state)
            is_valid = True
            for b in button:
                next_state_list[b] += 1
                if next_state_list[b] > jm.target_state[b]:
                    is_valid = False
                    break
            if is_valid:
                next_state_tuple = tuple(next_state_list)
                if next_state_tuple not in visited:
                    visited.add(next_state_tuple)
                    queue.append((next_state_tuple, steps + 1))

    return -1

def traverse_joltage_route_old2(jm: JoltageMachine) -> int:
    start_state = array('i', [0]) * len(jm.target_state)
    visited = {tuple(start_state)}
    queue = deque([(start_state, 0)])

    while queue:
        current_state, steps = queue.popleft()
        if current_state == jm.target_state:
            return steps
        
        for button in jm.buttons:
            next_state = array('i', current_state)

            for b in button:
                next_state[b] += 1

            state_key = tuple(next_state)

            if all(next_state[i] <= jm.target_state[i] for i in range(len(next_state))):
                if state_key not in visited:
                    visited.add(state_key)
                    queue.append((next_state, steps + 1))

    return -1


        