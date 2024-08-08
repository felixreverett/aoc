/* day XX1a
Plan:
  use a for loop 64 times and basically "flip" bits
  Flip all "O" to "." but also flip all adjacent cells of what was "O" to "O"
    Make sure logically it's not possible for a cell to become inaccessible and accessible on the same turn (it might be)
    I should be able to "step" my solution to avoid this issue, though, by removing previous "O"'s first.
*/

var fs = require("fs"); // imports fs

function DayTwentyOne()
{
  // 1. Parse input
  let parsedInput = fs.readFileSync("day-XX1/sample-input-2023-21.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n")
  .map(i => i.split(" -> "));

  
}

DayTwentyOne();