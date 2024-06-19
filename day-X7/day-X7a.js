// day X7a
// start 0,0
// end row - 1, col -1
// 

var fs = require("fs"); // imports fs

function DaySeventeen()
{
  // 1. Parse input
  let heatMap = fs.readFileSync("day-X7/sample-input-2023-17.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n").map(i => i.split(""));

  console.log(heatMap);

  // Starting at 0,0 create node with values row, col, entryDirection, 
}

DaySeventeen();