package main

import (
	"fmt"
	"os"
	"regexp"
	"sort"
	"strconv"
	"strings"
)

func AbsInteger(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

func main() {

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

	sort.Ints(leftArray)
	sort.Ints(rightArray)

	var solution int

	for i, _ := range leftArray {
		solution += AbsInteger(leftArray[i] - rightArray[i])
	}

	fmt.Println(solution)

}

// execute with "go run 01/solution.go"
