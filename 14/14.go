package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"

	utils "github.com/felixreverett/adventofgo"
)

func SimulateSecond(CorR bool, robots [][]int, width, height int) [][]int {
	var modulo int
	var position int
	var velocity int

	if CorR {
		modulo = width
		position = 0
		velocity = 2
	} else {
		modulo = height
		position = 1
		velocity = 3
	}

	newRobots := func() [][]int {
		newArray := make([][]int, len(robots))
		for i, inner := range robots {
			newArray[i] = append([]int(nil), inner...)
		}
		return newArray
	}()

	for _, robot := range newRobots {
		newPosition := (robot[position] + robot[velocity]) % modulo
		if newPosition < 0 {
			robot[position] = newPosition + modulo
		} else {
			robot[position] = newPosition
		}
	}

	return newRobots
}

func FindVariance(CorR bool, robots [][]int, width int, height int) float64 {
	var multiplier int
	var scale int
	var offset int
	var sequence []int

	if CorR {
		multiplier = height
		scale = 0
		offset = 1
	} else {
		multiplier = width
		scale = 1
		offset = 0
	}

	for _, robot := range robots {
		sequence = append(sequence, robot[scale]*multiplier+robot[offset])
	}

	sort.Ints(sequence)

	n := len(sequence)

	sum := func() int {
		total := 0
		for _, val := range sequence {
			total += val
		}
		return total
	}()

	sumSquares := func() float64 {
		var total float64 = 0
		for _, val := range sequence {
			total += float64(val * val)
		}
		return total
	}()

	mean := float64(sum) / float64(n)
	variance := (sumSquares / float64(n)) - (mean * mean)

	return variance
}

func GetTimeOfLowestVariance(CorR bool, robots [][]int, width int, height int) int {
	newRobots := func() [][]int {
		newArray := make([][]int, len(robots))
		for i, inner := range robots {
			newArray[i] = append([]int(nil), inner...)
		}
		return newArray
	}()
	optimalTime := 0
	lowestVariance := FindVariance(CorR, newRobots, width, height)

	var timeThreshold int
	if CorR {
		timeThreshold = width
	} else {
		timeThreshold = height
	}

	for t := 1; t < timeThreshold; t++ {
		newRobots = SimulateSecond(CorR, newRobots, width, height)
		variance := FindVariance(CorR, newRobots, width, height)

		if variance < lowestVariance {
			lowestVariance = variance
			optimalTime = t
		}
	}
	return optimalTime
}

func GetMinimumTime(robots [][]int, width, height int) int {
	bestC := GetTimeOfLowestVariance(true, robots, width, height)
	bestR := GetTimeOfLowestVariance(false, robots, width, height)

	W := width
	H := height

	t := bestC
	for t%H != bestR%H {
		t += W
	}

	return t
}

func SolutionB() {
	start := time.Now()

	content, err := os.ReadFile("14/input.txt")
	if err != nil {
		fmt.Printf("Failed to read file: %s\n", err)
		return
	}

	robots := func() [][]int {
		input := strings.ReplaceAll(
			strings.ReplaceAll(
				strings.ReplaceAll(string(content), "\r", ""), "p=", ""), " v=", ",")
		splitInput := strings.Split(input, "\n")
		var robots [][]int
		for _, row := range splitInput {
			var robot []int
			parts := strings.Split(row, ",")
			for _, part := range parts {
				num, _ := strconv.Atoi(part)
				robot = append(robot, num)
			}
			robots = append(robots, robot)
		}
		return robots
	}()

	solution := GetMinimumTime(robots, 101, 103)

	elapsed := time.Since(start)
	fmt.Printf("Day 14b solution: %d\n", solution)
	fmt.Printf("Elapsed time for 14b: %s\n", elapsed)
}

// Solution A

func ProcessRobot(robot []int, width, height, seconds int) int {
	pCol := robot[0]
	pRow := robot[1]
	vCol := robot[2]
	vRow := robot[3]

	finalRow := (pRow + seconds*vRow) % height
	if finalRow < 0 {
		finalRow = finalRow + height
	}
	finalCol := (pCol + seconds*vCol) % width
	if finalCol < 0 {
		finalCol = finalCol + width
	}

	if finalRow == height/2 || finalCol == width/2 {
		return 4
	}

	if finalRow < height/2 {
		if finalCol < width/2 {
			return 0
		} else {
			return 1
		}
	} else {
		if finalCol < width/2 {
			return 3
		} else {
			return 2
		}
	}
}

func SolutionA() {
	start := time.Now()

	content, err := os.ReadFile("14/input.txt")
	if err != nil {
		fmt.Printf("Failed to read file: %s\n", err)
		return
	}

	robots := func() [][]int {
		splitInput := utils.AogString(content).
			ReplaceAll("\r", "").
			ReplaceAll("p=", "").
			ReplaceAll(" v=", ",").
			Split("\n").
			ToStringArray()

		var robots [][]int
		for _, row := range splitInput {
			var robot []int
			parts := strings.Split(row, ",")
			for _, part := range parts {
				num, _ := strconv.Atoi(part)
				robot = append(robot, num)
			}
			robots = append(robots, robot)
		}
		return robots
	}()

	quadrants := [5]int{0, 0, 0, 0, 0}

	for _, robot := range robots {
		quadrant := ProcessRobot(robot, 101, 103, 100)
		quadrants[quadrant]++
	}

	solution := quadrants[0] * quadrants[1] * quadrants[2] * quadrants[3]

	elapsed := time.Since(start)
	fmt.Printf("Day 14a solution: %d\n", solution)
	fmt.Printf("Elapsed time for 14a: %s\n", elapsed)
}

func main() {
	SolutionA()
	SolutionB()
}
