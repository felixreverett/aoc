# Advent Of Code 2025
This year we only have 12 days of challenges. That means a little more time to touch grass this Christmas. :)

Days 1-7 were pretty straightforward for me, with 8 requiring me to learn about Union Joins, and 9ii and 10ii becoming significantly more challenging.

Of these, my [favourite individual solution](https://github.com/felixreverett/aoc/tree/main/2025/10) is for day 10i. I overengineered a solution to encode both the target state and buttons into single ints whose binary representation would denote their "on-off" states. I could then simply XOR values for the most efficient computation possible, short of using actual bytes. Day 10ii went and spoiled the fun.

Another favourite is [my solution to day 7](https://github.com/felixreverett/aoc/blob/main/2025/07/solution.py), where I was able to employ the dynamic programming I learnt in previous years without any external help. Computation for day 7i and 7ii is particularly fast.

### Commit messages
- 🧩 Solution
- ⚙️ Progress towards a solution
- 🧹 Code cleanup
- 📖 Other (e.g. documentation)

## Stats

### Time durations (includes file handling)

| Day | JavaScript  | Python    | Go    |
| --- | ---------:  | --------: | ----: |
| 01a | 3.3 ms      |           |
| 01b | 2.8 ms      |           |
| 02a | 175.0 ms    | 780.0 ms  |
| 02b | 220.0 ms    | 1,044.1 ms|
| 03a | 2.9 ms      |           |
| 03b | 3.1 ms      |           |
| 04a | 4.5ms       |           |
| 04b | 27.0ms      |           |
| 05a |             | 8.3ms     | 0.8ms
| 05b |             | 0.7ms     | 0.0ms*
| 06a |             | 0.9ms     |
| 06b |             | 15.9ms    |
| 07a |             | 0.2ms     |
| 07b |             | 3.2ms     |
| 08a |             | 297.3ms   |
| 08b |             | 298.3ms   |
| 09a |             | 20.6ms    |
| 09b |             | ...       |
| 10a |             | 10.2ms    |
| 10b |
| 11a |             | 26.4ms    |
| 11b |
| 12a |
| 12b |
| Tot | 438.6ms     | 2,478.7ms | 0.8ms |
| Avg | 54.8ms      | 206.6ms   | 0.4ms |
| Min | 2.8ms       | 0.2ms     | 0.0ms |         
| Max | 220ms       | 1,044.1ms | 0.8ms |

*Yes, this genuinely took trivial time.

### Programming Concepts and Perceived Difficulty

| Day | Programming Concepts                    | Algorithmic Complexity
| --- | --------------------------              | ---
| 01  | Modulo/Basic Arithmetic 🤪              | ...
| 02  | Regular Expressions 😋                  | ...
| 03  | Array Processing 🙂‍↕️                     | ...
| 04  | Array Processing 🙂‍↔️                     | O(n^2)
| 05  | Interval Merging 😸, Binary Search 😯   | O(n*m), O(n log m)
| 06  | Array Transpositions 🤔                 | ...
| 07  | Memoization 😎                          | ...
| 08  | Union Joins 🤨                          | ...
| 09  | ... 😥                                  | ...
| 10  | Bitwise Arithmetic 🤪, Linear Programming 💀 | ...
| 11  | Memoization/Recursion 😎
| 12  |