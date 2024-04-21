// day X7a

var fs = require("fs"); // imports fs

function DaySeventeen()
{
  // 1. Parse input
  let input = fs.readFileSync("day-X7/sample-input-2023-17.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n");
}

DaySeventeen();