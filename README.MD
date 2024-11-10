# Objectives of Advent of Code 2023:
- I've opted to use the Advent Of Code 2023 as a starting point for learning my third programming language JavaScript.

## Check out these days:
- Day 9a/b:
  - I abstracted my solution into a separate class which calculates its own next value in the sequence. For part b I simply reversed the array to find the "previous" value.
- Day X0a/b:
  - While I found the solution quite quickly, I went back and reworked my less-than-ideal code to a solution I'm ultimately happy with. This intensive debugging was very satisfying.
  - Day X0b was more challenging than expected, but I figured out a "loop switch" solution, which I also visually log to console for an aesthetically-pleasing illustration of the code.
- Day 17a (26ms):
  - My first implementation of a shortest-path algorithm.
  - It works by queueing up the "arrivals" to nodes rather than visiting unvisited nodes (as in Dijkstra's). I do not explicitly mark nodes as visited, and I can visit them again.
  - When I switched to a priority queue from a regular queue, the time cost dropped from ~30 mins to ~26ms.

## Some practices I've learnt:
- **destructuring assignment** (day 18a) > concise assignment of multiple variables
- **flood fills** (day 18a)
- **hashes** (day 20a)
- **let, var, const** (day 19b) > Found practical application of let vs var being scope.
- **maps** (day 7)
- **memoization** (day 14b, day 20a)
- **stacks** (day 18a)
- **Shoelace formula (Gauss' Area Formula)** (day 18b)
- **shortest path** (day 17)

