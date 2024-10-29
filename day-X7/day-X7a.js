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
let nodesToVisit = [];

function DaySeventeen()
{
  // 1. Parse input
  heatMap = fs.readFileSync("day-X7/sample-input-2023-17.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n").map(i => i.split(""));

  console.log(heatMap);

  // Starting at 0,0 create node with values row, col, entryDirection, 
  let shortestPathFound = false;

  // right
  nodesToVisit.push([0, 0, "vertical", 0]);
  nodesToVisit.push([0, 0, "horizontal", 0]);

  while (nodesToVisit.length > 0)
  {
    let nextNode = nodesToVisit.shift();
    ProcessNode(nextNode);
  }
  console.log("All nodes have been visited. The shortest path is ...");
}

// Process a node by "visiting" it
function ProcessNode([x, y, entryDirection, totalHeat])
{
  // 1. Check if node already visited from direction
  let nodeID = `x${x}y${y}d${entryDirection}`;
  let index = visitedNodes.findIndex(a => a[0] === nodeID)
  if (index !== -1)
  {
    if (totalHeat >= visitedNodes[index][1])
    {
      return;
    }
  }
  // 2. Queue up next nodes depending on whether

  if (entryDirection === "vertical")
  {
    let leftHeat = totalHeat;
    let rightHeat = totalHeat;

    // < 1 >
    if (x > 0)
    {
      leftHeat = totalHeat + heatMap[y][x - 1];
      nodesToVisit.push([x - 1, y, "horizontal", leftHeat]);
    }

    if (x < heatMap.length - 1)
    {
      rightHeat = totalHeat + heatMap[y][x + 1];
      nodesToVisit.push([x + 1, y, "horizontal", rightHeat]);
    }

    // < 2 >
    if (x > 1)
    {
      leftHeat = totalHeat + heatMap[y][x - 2];
      nodesToVisit.push([x - 2, y, "horizontal", leftHeat]);
    }

    if (x < heatMap.length - 2)
    {
      rightHeat = totalHeat + heatMap[y][x + 2];
      nodesToVisit.push([x + 2, y, "horizontal", rightHeat]);
    }

    // < 3 >
    if (x > 2)
    {
      leftHeat = totalHeat + heatMap[y][x - 3];
      nodesToVisit.push([x - 3, y, "horizontal", leftHeat]);
    }

    if (x < heatMap.length - 3)
    {
      rightHeat = totalHeat + heatMap[y][x + 3];
      nodesToVisit.push([x + 3, y, "horizontal", rightHeat]);
    }
  }

  if (entryDirection === "horizontal")
  {
    let upHeat = totalHeat;
    let downHeat = totalHeat;

    // < 1 >
    if (x > 0)
    {
      leftHeat = totalHeat + heatMap[y][x - 1];
      nodesToVisit.push([x - 1, y, "horizontal", upHeat]);
    }

    if (x < heatMap.length - 1)
    {
      rightHeat = totalHeat + heatMap[y][x + 1];
      nodesToVisit.push([x + 1, y, "horizontal", downHeat]);
    }

    // < 2 >
    if (x > 1)
    {
      leftHeat = totalHeat + heatMap[y][x - 2];
      nodesToVisit.push([x - 2, y, "horizontal", upHeat]);
    }

    if (x < heatMap.length - 2)
    {
      rightHeat = totalHeat + heatMap[y][x + 2];
      nodesToVisit.push([x + 2, y, "horizontal", downHeat]);
    }

    // < 3 >
    if (x > 2)
    {
      leftHeat = totalHeat + heatMap[y][x - 3];
      nodesToVisit.push([x - 3, y, "horizontal", upHeat]);
    }

    if (x < heatMap.length - 3)
    {
      rightHeat = totalHeat + heatMap[y][x + 3];
      nodesToVisit.push([x + 3, y, "horizontal", downHeat]);
    }
  }
}

AddNode()
{

}

DaySeventeen();