# Advent of Code 2024 Readme

### 皆さん、こんにちは
Please enjoy my solutions to the 2024 Advent of Code, as I continue to increase my experience as a developer!

### Summary of puzzles
1. Simple array processing, maps (Go)
2. Validating ascending and descending sequences
3. Regex
4. Validating patterns in 2D arrays
5. Validating array sequences & defining sequence order
6. Finding looping cycles in a 2d array
7. Using recursion to find all valid combinations of numbers.
    a. Using BigInt (js)
8. Populating 2D arrays
9. Disk defragmentation
10. Traversing a grid with a queue
11. Memoisation and recursion
12. Queues and Sets (for O(1) lookup)
13. Solving linear equations through matrices
14. 
    a. Simple use of modulos
    b. Chinese Remainder Theorem

### Commit messages
- 🧩 Solution
- ⚙️ Progress towards a solution
- 🧹 Code cleanup
- 📖 Other (e.g. documentation)

### Time durations

| Day | JavaScript  | Go        | Day | JavaScript | Go         |
| --- | ---------:  | --------: | --- | ---------: | ---------: |
| 01a | 6ms         | 0.8ms     | 11a | 21.3ms     | 3.5ms      |
| 01b | 10.4ms      | 2.7ms     | 11b | 57.0ms     | 26.5ms     |
| 02a | 4.2ms       | 1.5ms     | 12a | 13.7ms     | 9.3ms      |
| 02b | 4.9ms       | 1.7ms     | 12b | 25.2ms     | 8.5ms      |
| 03a | 3.2ms       |           | 13a | 1.3ms      | 0.5ms      |
| 03b | 3.1ms       |           | 13b | 1.3ms      | 0.5ms      |
| 04a | 4.8ms       |           | 14a | 0.8ms      | 0.5ms      |
| 04b | 4.1ms       |           | 14b | 14.5ms     | 6.5ms      |
| 05a | 20.0ms      |           |
| 05b | 6.9ms       |           |
| 06a | 5.7ms       |           |
| 06b | 3,500ms     |           |
| 07a | 25ms        |           |
| 07b | 2,600ms     |           |
| 08a | 3.5ms       |           |
| 08b | 1.7ms       |           |
| 09a | 7.3ms       |           |
| 09b | 315ms       |           |
| 10a | 6.8ms       |           |
| 10b | 3.0ms       |           |

### What have I learnt about JavaScript
- Using forEach (e.g. `Array.forEach(i => { /*code*/ })`) for efficiently iterating through arrays (see day 8, 10)

### What have I learnt about Go
- Go has no ternary operators 😬
- Immediately Invoked Function Expressions (IIFE) are a way to cleanly process an input through multiple functions without nesting functions (verbose) or method chaining (not supported in Go).
- Variadic functions
 - functions which can have a varying number of arguments of the same type. Example: append([]type(nil, array...)
 - Declared by adding ellipsis before a function parameter in its signature: func Foo(param ...type)
 - Receiver functions: approximation of class methods accessible through dot notation

### What have I learnt about DSA?
- Linear Equations
- Chinese Remainder Theorem
- Memoisation