package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

type plotTracker struct {
	plot      string
	area      int
	perimeter int //12a
	sides     int //12b
}

var directions4 = [][]int{{-1, 0}, {0, 1}, {1, 0}, {0, -1}}

func main() {
	Solution()
}

func IsInBounds(row int, col int, plotGrid [][]string) bool {
	return row >= 0 &&
		row < len(plotGrid) &&
		col >= 0 &&
		col < len(plotGrid[row])
}

func Solution() {
	start := time.Now()

	content, err := os.ReadFile("12/input.txt")
	if err != nil {
		fmt.Printf("Failed to read file: %s\n", err)
		return
	}

	plotGrid := func() [][]string {
		input := strings.ReplaceAll(string(content), "\r", "")
		rows := strings.Split(input, "\n")
		var grid [][]string
		for _, row := range rows {
			grid = append(grid, strings.Split(row, ""))
		}
		return grid
	}()

	visited := make(map[string]bool)

	total := 0

	for r := 0; r < len(plotGrid); r++ {
		for c := 0; c < len(plotGrid[r]); c++ {
			key := strconv.Itoa(r) + "-" + strconv.Itoa(c)
			_, ok := visited[key]
			if ok {
				continue
			}

			plotTracker := plotTracker{plot: plotGrid[r][c], area: 0, perimeter: 0, sides: 0}

			queue := [][]int{{r, c}}

			for len(queue) > 0 {
				tempR, tempC := queue[0][0], queue[0][1]
				queue = queue[1:]

				key := strconv.Itoa(tempR) + "-" + strconv.Itoa(tempC)
				_, ok := visited[key]
				if ok {
					continue
				}
				for _, dir := range directions4 {
					newRow := tempR + dir[0]
					newCol := tempC + dir[1]

					if IsInBounds(newRow, newCol, plotGrid) {
						if plotGrid[newRow][newCol] == plotTracker.plot {
							queue = append(queue, []int{newRow, newCol})
						} else {
							plotTracker.perimeter++
						}
					} else {
						plotTracker.perimeter++
					}
				}
				plotTracker.area++
				visited[key] = true
			}

			total += plotTracker.perimeter * plotTracker.area
		}
	}

	fmt.Printf("12a solution: %d\n", total)

	elapsed := time.Since(start)
	fmt.Printf("Elapsed time for 12a: %s\n", elapsed)
}
