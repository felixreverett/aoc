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
	SolutionB()
}

func ProcessClawMachine(clawMachineString []string, partB bool) int {
	stringButtonA, stringButtonB, stringPrize := clawMachineString[0], clawMachineString[1], clawMachineString[2]
	Ax, Ay := func() (int, int) {
		parsed := strings.Split(strings.ReplaceAll(stringButtonA, "Button A: X+", ""), ", Y+")
		var integised []int
		for _, i := range parsed {
			num, _ := strconv.Atoi(i)
			integised = append(integised, num)
		}
		return integised[0], integised[1]
	}()
	Bx, By := func() (int, int) {
		parsed := strings.Split(strings.ReplaceAll(stringButtonB, "Button B: X+", ""), ", Y+")
		var integised []int
		for _, i := range parsed {
			num, _ := strconv.Atoi(i)
			integised = append(integised, num)
		}
		return integised[0], integised[1]
	}()
	Px, Py := func() (int, int) {
		parsed := strings.Split(strings.ReplaceAll(stringPrize, "Prize: X=", ""), ", Y=")
		var integised []int
		for _, i := range parsed {
			num, _ := strconv.Atoi(i)
			integised = append(integised, num)
		}
		return integised[0], integised[1]
	}()

	if partB {
		Px += 10000000000000
		Py += 10000000000000
	}

	det := Ax*By - Bx*Ay

	if det == 0 {
		return 0
	}

	A_times_det := By*Px - Bx*Py
	B_times_det := -Ay*Px + Ax*Py

	if A_times_det%det != 0 || B_times_det%det != 0 {
		return 0
	}
	A := A_times_det / det
	B := B_times_det / det

	return 3*A + B
}

func Solution() {
	start := time.Now()

	content, err := os.ReadFile("13/input.txt")
	if err != nil {
		fmt.Printf("Failed to read file: %s\n", err)
		return
	}

	clawMachines := func() [][]string {
		input := strings.ReplaceAll(string(content), "\r", "")
		splitInput := strings.Split(input, "\n\n")
		var clawMachines [][]string
		for _, row := range splitInput {
			clawMachines = append(clawMachines, strings.Split(row, "\n"))
		}
		return clawMachines
	}()

	total := 0

	for _, machine := range clawMachines {
		total += ProcessClawMachine(machine, false)
	}

	fmt.Printf("13a solution: %d\n", total)

	elapsed := time.Since(start)
	fmt.Printf("Elapsed time for 13a: %s\n", elapsed)
}

func SolutionB() {
	start := time.Now()

	content, err := os.ReadFile("13/input.txt")
	if err != nil {
		fmt.Printf("Failed to read file: %s\n", err)
		return
	}

	clawMachines := func() [][]string {
		input := strings.ReplaceAll(string(content), "\r", "")
		splitInput := strings.Split(input, "\n\n")
		var clawMachines [][]string
		for _, row := range splitInput {
			clawMachines = append(clawMachines, strings.Split(row, "\n"))
		}
		return clawMachines
	}()

	total := 0

	for _, machine := range clawMachines {
		total += ProcessClawMachine(machine, true)
	}

	fmt.Printf("13b solution: %d\n", total)

	elapsed := time.Since(start)
	fmt.Printf("Elapsed time for 13b: %s\n", elapsed)
}
