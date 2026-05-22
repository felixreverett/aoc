package main

import "math"

// Theory:
// Create 4 nodes for every valid node on the grid.
// Nodes are described as (row, col, direction, distance),
// where row and col are 0-indexed, and the directions are NESW
//
// Next, create a matrix to store the distances
// Populate this matrix at the same time

func main() {

}

type node struct {
	Row       int
	Col       int
	Direction int
}

type nodeData struct {
	Distance      int
	AdjacentNodes map[node]int
}

func SolutionA(grid [][]rune) {

	// Make a nodemap of all nodes and their
	// Adjacent nodes and weights
	// We assume all grids will be bounded by #,
	// so we avoid out of bounds checks.

	nodeMap := make(map[node]nodeData)

	targetIndex := [2]int{0, 0}

	// Iterate through all cells in the grid and
	// create the matrix of weights. All vertices
	// will have at least two edges (left turn +
	// right turn), and a possible third edge (forward)
	// if the forward space is not a wall.

	for r := 0; r < len(grid); r++ {
		for c := 0; c < len(grid[r]); c++ {
			gridVal := grid[r][c]

			if gridVal == '#' {
				continue
			}

			addNodes(r, c, nodeMap, grid)

			if gridVal == 'S' {
				startNode := node{Row: r, Col: c, Direction: 1}

				if data, ok := nodeMap[startNode]; ok {
					data.Distance = 0
					nodeMap[startNode] = data
				}
			}

			if gridVal == 'E' {
				targetIndex = [2]int{r, c}
			}
		}
	}

	// Now do dijkstra's algorithm

}

// Add nodes of each direction to the nodemap
func addNodes(r int, c int, dict map[node]nodeData, grid [][]rune) {

	// define our list of cardinals
	cardinals := [4][2]int{
		0: {-1, 0}, // N
		1: {0, 1},  // E
		2: {1, 0},  // S
		3: {0, -1}, // W
	}

	for d := 0; d < 4; d++ {

		// Create the new node
		newNode := node{Row: r, Col: c, Direction: d}

		// Create the new node's map of adjacent nodes
		newAdjacentNodes := make(map[node]int)

		newAdjacentNodes[node{Row: r, Col: c, Direction: (d + 3) % 4}] = 1000
		newAdjacentNodes[node{Row: r, Col: c, Direction: (d + 1) % 4}] = 1000

		if grid[r+cardinals[d][0]][c+cardinals[d][1]] != '#' {
			newAdjacentNodes[node{Row: r, Col: c, Direction: d}] = 1
		}

		newNodeData := nodeData{Distance: math.MaxInt, AdjacentNodes: newAdjacentNodes}
		dict[newNode] = newNodeData
	}
}
