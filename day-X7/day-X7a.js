// day X7a
// start 0,0
// end row - 1, col -1
// 1. Parse input into the heatmap
// 2. Create an object to store visited city blocks (X, Y, direction of entry, totalheatloss)
// 3. Create algorithm to iterate through
//    - Input 1, 2, 3 steps forward

var fs = require("fs"); // imports fs
let heatMap;
let visitedNodes = [];

function DaySeventeen()
{
  // 1. Parse input
  heatMap = fs.readFileSync("day-X7/sample-input-2023-17.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n").map(i => i.split(""));

  console.log(heatMap);

  // Starting at 0,0 create node with values row, col, entryDirection, 
  let shortestPathFound = false;

  explorePath

  while (!shortestPathFound)
  {

  }
}

function ExplorePath(x, y, direction, totalHeatLoss)
{

}

DaySeventeen();