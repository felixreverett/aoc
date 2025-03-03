package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

func main() {
	solution()
	//solutionb()
}

func solution() {
	start := time.Now()

	content, err := os.ReadFile("11/sample-input.txt")
	if err != nil {
		fmt.Printf("Failed to read file: %s\n", err)
		return
	}

	// 1. parse input
	stones := func() []int {
		input := strings.ReplaceAll(string(content), "\r", "")
		inputArray := strings.Split(input, " ")
		var stones []int
		for _, li := range inputArray {
			stone, _ := strconv.Atoi(li)
			stones = append(stones, stone)
		}
		return stones
	}()

	// 2. process input
	for i := 0; i < 25; i++ {

		var nextArray []int

		for _, stone := range stones {

			stringified := strconv.Itoa(stone)

			if stone == 0 {
				nextArray = append(nextArray, 1)
			} else if len(stringified)%2 == 0 {
				mid := len(stringified) / 2
				// 🌟happily🌟 discarding possible conv errors
				firstNum, _ := strconv.Atoi(stringified[:mid])
				secondNum, _ := strconv.Atoi(stringified[mid:])
				nextArray = append(nextArray, firstNum)
				nextArray = append(nextArray, secondNum)
			} else {
				nextArray = append(nextArray, stone*2024)
			}
		}

		stones = nextArray
	}

	// print solution
	fmt.Printf("Day 11a solution: %d\n", len(stones))
	// runtime
	elapsed := time.Since(start)
	fmt.Printf("Elapsed time for 11a: %s\n", elapsed)
}

func solutionb() {
	fmt.Println("Nothing here")
}
