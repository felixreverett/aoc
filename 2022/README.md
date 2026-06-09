# Advent Of Code 2022
*Readme last updated June 2026*

## 1 Overview
My solutions to the 2022 Advent of Code. This is the first time I'll be backdating to previous years after first starting Advent of Code from 2023.

### 1.1 Objectives
My primary objective for **aoc22** is to use the puzzles to familiarise myself with the syntax of Scala. More broadly, I want to deepen my understanding of functional programming style and etiquette, particularly the avoidance of mutable states, and the use of the functional toolkit at my disposal.

A secondary objective is to design solutions **exclusively using [method chaining](https://felixreverett.com/blog/method-chaining)** where possible. This can be further extended by writing custom type methods using Scala's `extension` syntax.

### 1.2 Benchmarking
I will also be making a concerted effort to optimise my solutions. The file `2022.scala` contains a script that executes all solutions for performance benchmarking. This is configured to allow the Virtual Machine to optimise the code before creating any measurements. As an aside, it is written entirely without mutable state.

### 1.3 Commit messages
As always, my commit messages follow this approximate convention:
- 🧩 Solution
- ⚙️ Progress towards a solution
- 🧹 Code cleanup
- 📖 Other (e.g. documentation)

## 2 Build instructions
You will need to obtain your own `input.txt` from the Advent Of Code website.

To execute all files:
    - Set your current working directory to `<aoc>/2022`, where `<aoc>` represents the repository root;
    - Enter `scala-cli . --main-class aoc2022.run` (you will need Scala installed).
    - Optionally export results with `scala-cli . --main-class aoc2022.run -- -export`

To execute an individual day:
    - Set your current working directory to `<aoc>/2022`;
    - Enter `scala <day>/day<day>.scala`.

## 3 Stats
The following section covers statistics from Advent of Code 2022. Unless specified, time durations will generally exclude the loading of files from storage, although given my usage of data pipelining this is not always easy to measure separately.

On occasion, I may produce a solution in another language, usually to allow myself to conceptualise a solution before finding its equivalent in Scala, but sometimes just because I want to.

### 3.1 Time durations (Scala, 10 tests)

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
| 09b | 13.02 ms| 4.87 ms | 30.33 ms |
| 10a | 0.16 ms | 0.11 ms | 0.29 ms  |
| 10b | 0.65 ms | 0.22 ms | 2.27 ms  |
| 11a | 1.40 ms | 0.87 ms | 3.56 ms  |
| 11b | 17.3 ms | 11.58 ms| 24.10 ms |
| 12a | 9.54 ms | 6.67 ms | 12.73 ms |
| 12b | 6.44 ms | 4.61 ms | 8.14 ms  |

### 3.2 Time durations (TypeScript, 1 tests)

| Day | AVG     |
| --- | ------: |
| 09a | 10.4 ms |

## 4 Notable Programming Concepts

| Day   | Programming Concepts                      | Functional Concepts
| ----- | ----------------------------------------- | ---
| 01    | Basic Input Marshalling                   |
| 04    | Range Intersections                       |
| 05    | ...                                       | foldLeft (instead of a for loop)
| 06    |                                           | .sliding(n) : a function for iterating through an Interable with a slice of size n. Pair with .find() to extract some kind of match.
| 07    | File system traversal                     | pattern matching with match case
| 08    |                                           | nested foldLeft
| 09    |                                           | nested foldLeft -> improved familiarity with recursively passing state
| 10    | |
| 11    |                                           | nested foldLeft
| 12    | Dijkstra's