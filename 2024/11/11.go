package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

func main() {
	Solution()
	Solutionb()
}

func Solution() {
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

func Solutionb() {
	start := time.Now()

	content, err := os.ReadFile("11/input.txt")
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
	blinks := 75
	count := 0
	memoMap := make(map[string]int)

	for _, stone := range stones {
		count += ComputeBlink(stone, blinks, memoMap)
	}

	// print solution
	fmt.Printf("Day 11b solution: %d\n", count)
	// runtime
	elapsed := time.Since(start)
	fmt.Printf("Elapsed time for 11b: %s\n", elapsed)
}

func ComputeBlink(stone int, blinks int, memoMap map[string]int) int {

	if blinks == 0 {
		return 1
	}

	key := strconv.Itoa(stone) + "b" + strconv.Itoa(blinks)

	value, exists := memoMap[key]

	if exists {
		return value
	}

	count := 0
	stringified := strconv.Itoa(stone)

	if stone == 0 {
		count = ComputeBlink(1, blinks-1, memoMap)
	} else if len(stringified)%2 == 0 {
		mid := len(stringified) / 2
		firstNum, _ := strconv.Atoi(stringified[:mid])
		secondNum, _ := strconv.Atoi(stringified[mid:])
		count = ComputeBlink(firstNum, blinks-1, memoMap) + ComputeBlink(secondNum, blinks-1, memoMap)
	} else {
		count = ComputeBlink(stone*2024, blinks-1, memoMap)
	}

	memoMap[key] = count

	return count
}
