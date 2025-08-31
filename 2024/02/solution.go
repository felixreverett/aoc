package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

func AbsInteger(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

func ValidateReport(report []int) bool {
	上下 := "unknown"
	for j := 0; j < len(report)-1; j++ {
		if report[j] == report[j+1] || AbsInteger(report[j]-report[j+1]) > 3 {
			return false
		}
		if report[j] < report[j+1] {
			if 上下 == "下" {
				return false
			}
			上下 = "上"
		} else {
			if 上下 == "上" {
				return false
			}
			上下 = "下"
		}
	}
	return true
}

func main() {

	start := time.Now()

	content, err := os.ReadFile("02/input.txt")
	if err != nil {
		fmt.Printf("Failed to read file: %s\n", err)
		return
	}

	// using an "immediately invoked function"
	reportsList := func() [][]int {
		line := strings.ReplaceAll(string(content), "\r", "")
		lines := strings.Split(line, "\n")
		var reports [][]int
		for _, li := range lines {
			strs := strings.Split(li, " ")
			var report []int
			for _, s := range strs {
				num, _ := strconv.Atoi(s)
				report = append(report, num)
			}
			reports = append(reports, report)
		}
		return reports
	}()

	// solving in a loop
	totalSafeReports := 0
	for _, report := range reportsList {
		if ValidateReport(report) {
			totalSafeReports++
		}
	}

	fmt.Printf("Day 2a solution: %d safe reports\n", totalSafeReports)
	elapsed := time.Since(start)
	fmt.Printf("Elapsed time: %s\n", elapsed)
}

// execute with "go run 02/solution.go"
