package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"
)

// golang, you break my heart for not having .map()
func Map[T any, U any](input []T, f func(T) U) []U {
	result := make([]U, len(input))
	for i, v := range input {
		result[i] = f(v)
	}
	return result
}

func mergeRanges(ranges [][]int) [][]int {
	if len(ranges) == 0 {
		return ranges
	}

	merged := [][]int{}
	current := ranges[0]

	for i := 1; i < len(ranges); i++ {
		next := ranges[i]

		if next[0] <= current[1] {
			if next[1] > current[1] {
				current[1] = next[1]
			}
		} else {
			merged = append(merged, current)
			current = next
		}
	}

	merged = append(merged, current)
	return merged
}

// Going to try and implement a binary search
func binarySearch(ranges [][]int, target int) int {
	lowerBound := 0
	upperBound := len(ranges) - 1
	result := -1

	for lowerBound <= upperBound {
		mid := lowerBound + (upperBound-lowerBound)/2

		if ranges[mid][0] <= target {
			result = mid
			lowerBound = mid + 1
		} else {
			upperBound = mid - 1
		}
	}
	return result
}

func partOne() {
	start := time.Now()
	input, err := os.ReadFile("2025/05/input.txt")
	if err != nil {
		fmt.Printf("Failed to read file: %s\n", err)
		return
	}

	// All this just to parse the input ._.
	subsets := strings.Split(strings.ReplaceAll(string(input), "\r", ""), "\n\n")

	ingredients := Map(strings.Split(subsets[1], "\n"), func(s string) int {
		val, _ := strconv.Atoi(s)
		return val
	})

	ranges := Map(strings.Split(strings.TrimSpace(subsets[0]), "\n"), func(line string) []int {
		return Map(strings.Split(line, "-"), func(s string) int { v, _ := strconv.Atoi(s); return v })
	})

	sort.Slice(ranges, func(i, j int) bool {
		if ranges[i][0] == ranges[j][0] {
			return ranges[i][1] < ranges[j][1]
		}
		return ranges[i][0] < ranges[j][0]
	})

	ranges = mergeRanges(ranges)
	// </parse input>

	total := 0
	for _, ingredient := range ingredients {
		index := binarySearch(ranges, ingredient)
		if index != -1 {
			if ingredient <= ranges[index][1] {
				total++
			}
		}
	}

	elapsed := time.Since(start)
	fmt.Printf("Finished in %s\n", elapsed)
	fmt.Printf("Result: %d\n", total)
}

func partTwo() {
	start := time.Now()
	input, err := os.ReadFile("2025/05/input.txt")
	if err != nil {
		fmt.Printf("Failed to read file: %s\n", err)
		return
	}

	subsets := strings.Split(strings.ReplaceAll(string(input), "\r", ""), "\n\n")

	ranges := Map(strings.Split(strings.TrimSpace(subsets[0]), "\n"), func(line string) []int {
		return Map(strings.Split(line, "-"), func(s string) int { v, _ := strconv.Atoi(s); return v })
	})

	sort.Slice(ranges, func(i, j int) bool {
		if ranges[i][0] == ranges[j][0] {
			return ranges[i][1] < ranges[j][1]
		}
		return ranges[i][0] < ranges[j][0]
	})

	ranges = mergeRanges(ranges)

	total := 0
	for _, r := range ranges {
		total += r[1] - r[0] + 1
	}

	elapsed := time.Since(start)
	ms := float64(elapsed.Nanoseconds() / 1e6)
	fmt.Printf("Finished in %.7fms\n", ms)
	fmt.Printf("Result: %d\n", total)
}

func main() {
	partOne()
	partTwo()
}
