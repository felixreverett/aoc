package main

import (
	"2024-16/priorityQueue"
	"container/heap"
	"fmt"
	"math"
	"os"
	"strings"
	"time"
)

type node struct {
	Row       int
	Col       int
	Direction int
}

type nodeData struct {
	Distance      int
	AdjacentNodes map[node]int
	Visited       bool
}

func main() {

	bytes, err := os.ReadFile("input.txt")

	if err != nil {
		fmt.Printf("Failed to read file: %s\n", err)
		return
	}

	lines := strings.Split(strings.TrimSpace(string(bytes)), "\n")

	grid := make([][]rune, len(lines))

	for i, line := range lines {
		grid[i] = []rune(strings.TrimSpace(line))
	}

	start := time.Now()
	part1 := SolutionA(grid)
	elapsed := time.Since(start)
	fmt.Printf("Part 1 Result: %d\nTotal time elapsed: %s\n", part1, elapsed)
}

func SolutionA(grid [][]rune) int {

	nodeMap := make(map[node]nodeData)

	var startNode node
	var endCoord [2]int

	for r := 0; r < len(grid); r++ {
		for c := 0; c < len(grid[r]); c++ {
			gridVal := grid[r][c]

			if gridVal == '#' {
				continue
			}
			addNodes(r, c, nodeMap, grid)

			if gridVal == 'S' {
				startNode = node{Row: r, Col: c, Direction: 1}

				if data, ok := nodeMap[startNode]; ok {
					data.Distance = 0
					nodeMap[startNode] = data
				}
			}

			if gridVal == 'E' {
				endCoord = [2]int{r, c}
			}

		}
	}

	doDijkstras(startNode, nodeMap)

	minEndDistance := math.MaxInt
	for d := 0; d < 4; d++ {
		endNode := node{Row: endCoord[0], Col: endCoord[1], Direction: d}
		if data, ok := nodeMap[endNode]; ok {
			if data.Distance < minEndDistance {
				minEndDistance = data.Distance
			}
		}
	}

	return minEndDistance
}

func doDijkstras(startNode node, nodeMap map[node]nodeData) {

	// Making the priority queue
	pq := &priorityQueue.PriorityQueue{}
	heap.Init(pq)

	/// Add initial node
	heap.Push(pq, &priorityQueue.Item{
		KeyType:        startNode,
		PriorityWeight: 0})

	for pq.Len() > 0 {

		pqItem := heap.Pop(pq).(*priorityQueue.Item)

		currNode := pqItem.KeyType.(node)

		currData, exists := nodeMap[currNode]
		if !exists || currData.Visited {
			continue
		}

		for neighbourNode, edgeWeight := range currData.AdjacentNodes {
			neighbourData, exists := nodeMap[neighbourNode]
			if !exists || neighbourData.Visited {
				continue
			}

			newDistance := currData.Distance + edgeWeight
			oldDistance := neighbourData.Distance

			if newDistance < oldDistance {
				neighbourData.Distance = newDistance
				nodeMap[neighbourNode] = neighbourData

				heap.Push(pq, &priorityQueue.Item{
					KeyType:        neighbourNode,
					PriorityWeight: newDistance,
				})
			}
		}
	}
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

		targetRow := r + cardinals[d][0]
		targetCol := c + cardinals[d][1]

		if targetRow >= 0 && targetRow < len(grid) && targetCol >= 0 && targetCol < len(grid[targetRow]) && grid[targetRow][targetCol] != '#' {
			newAdjacentNodes[node{Row: targetRow, Col: targetCol, Direction: d}] = 1
		}

		newNodeData := nodeData{Distance: math.MaxInt, AdjacentNodes: newAdjacentNodes}
		dict[newNode] = newNodeData
	}
}
