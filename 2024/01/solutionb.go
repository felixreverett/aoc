package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"
)

func main() {
	start := time.Now()
	// 1. Get input into two separate arrays
	content, err := os.ReadFile("01/input.txt")
	if err != nil {
		fmt.Printf("Failed to read file: %s\n", err)
		return
	}

	input := string(content)
	input = strings.ReplaceAll(input, "\r", "")
	lines := strings.Split(input, "\n")
	spacedRegex := regexp.MustCompile(`\s+`)
	for i, line := range lines {
		lines[i] = spacedRegex.ReplaceAllString(line, ",")
	}
	var result [][]string
	for _, line := range lines {
		result = append(result, strings.Split(line, ","))
	}
	var leftArray []int
	var rightArray []int

	for _, subArray := range result {
		leftValue, _ := strconv.Atoi(subArray[0])
		rightValue, _ := strconv.Atoi(subArray[1])

		leftArray = append(leftArray, leftValue)
		rightArray = append(rightArray, rightValue)
	}

	rightArrayMap := make(map[int]int)

	for _, v := range rightArray {
		_, found := rightArrayMap[v]
		if found {
			rightArrayMap[v]++
		} else {
			rightArrayMap[v] = 1
		}
	}

	var similarityScore int

	for _, val := range leftArray {
		frequency, found := rightArrayMap[val]
		if found {
			similarityScore += val * frequency
		}
	}

	fmt.Println(similarityScore)
	elapsed := time.Since(start)
	fmt.Printf("Elapsed time: %s\n", elapsed)
}

// execute with "go run 01/solutionb.go"
