# Advent Of Code 2022
*Readme last updated Januaey 2026*

## 1. Overview
Behond my solutions to the 2022 Advent of Code. This is the first time I'll be "backdating" to previous years after starting Advent of Code initially from 2023.

### Objectives
My primary objective is to use AOC to familiarise myself with the syntax of Scala. More broadly, I want to deepen my understanding of functional programming style and etiquette, particularly the avoidance of mutable states, and the use of the functional toolkit made available to me.

A secondary objective is to design solutions **exclusively using [method chaining](https://felixreverett.com/blog/method-chaining)** where possible.

### Benchmarking
I will also be making a concerted effort to optimise my solutions. See the file `2022.scala` for a script to execute all solutions for performance benchmarking. This is configured to allow the Virtual Machine to optimise the code before creating any measurements. As an aside, it is written entirely without mutable state.

### Commit messages
As always, my commit messages follow this approximate convention:
- 🧩 Solution
- ⚙️ Progress towards a solution
- 🧹 Code cleanup
- 📖 Other (e.g. documentation)

## 2. Stats
The following section covers statistics from Advent of Code 2022. Unless specified, time durations will generally exclude the loading of files from non-volatile memory, although sometimes this is not easy to measure separately.

On occasion, I may produce a solution in another language, usually to allow myself to conceptualise a solution before finding its equivalent in Scala, but sometimes just because I want to.

### Time durations (Scala, 10 tests)

| Day | AVG     | Min     | Max      |
| --- | ------: | ------: | -------: |
| 01a | 1.53 ms | 0.79 ms | 3.51 ms  |
| 01b | 1.96 ms | 1.10 ms | 5.02 ms  |
| 02a | 0.36 ms | 0.24 ms | 0.63 ms  |
| 02b | 0.37 ms | 0.28 ms | 0.65 ms  |
| 03a | 2.20 ms | 1.25 ms | 3.37 ms  |
| 03b | 1.19 ms | 0.60 ms | 2.86 ms  |
| 04a | 5.06 ms | 4.17 ms | 5.87 ms  |
| 04b | 2.56 ms | 2.32 ms | 2.99 ms  |
| 05a | 3.42 ms | 2.52 ms | 5.00 ms  |
| 05b | 3.22 ms | 2.57 ms | 3.84 ms  |
| 06a | 1.01 ms | 0.93 ms | 1.12 ms  |
| 06b | 8.80 ms | 6.46 ms | 10.81 ms |
| 07a | 3.43 ms | 2.87 ms | 3.79 ms  |
| 07b | 3.79 ms | 3.11 ms | 4.60 ms  |
| 08a | 5.00 ms | 4.24 ms | 7.29 ms  |
| 08b | 6.15 ms | 4.26 ms | 10.80 ms |
| 09a | 7.57 ms | 6.22 ms | 9.45 ms  |

### Time durations (TypeScript, 1 tests)

| Day | AVG     |
| --- | ------: |
| 09a | 10.4 ms |

## Notable Programming Concepts

| Day | Programming Concepts                    | Functional Concepts
| --- | --------------------------              | ---
| 01  | Basic Input Marshalling                 |
| 04  | Range Intersections                     |
| 05  | ...                                     | foldLeft (instead of a for loop)
| 06  |                                         | .sliding(n) : a function for iterating through an Interable with a slice of size n. Pair with .find() to extract some kind of match.
| 07  | File system traversal                   | pattern matching with match case
| 08  |                                         | nested foldLeft
| 09  |                                         | nested foldLeft -> improved familiarity with recursively passing state
