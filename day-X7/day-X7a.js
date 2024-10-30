// day X7a
// start 0,0
// end row - 1, col -1
// 1. Parse input into the heatmap
// 2. Create an object to store visited city blocks (X, Y, direction of entry, totalheatloss)
// 3. Create algorithm to iterate through
//    - Input 1, 2, 3 steps forward

var fs = require("fs"); // imports fs
let heatMap;
let visitedNodes = new Map();
let nodesToVisit = [];

function DaySeventeen()
{
  // 1. Parse input
  heatMap = fs.readFileSync("day-X7/sample-input-2023-17.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n").map(i => i.split(""));

  console.log(heatMap);

  nodesToVisit.push([0, 0, "vertical", 0]);
  nodesToVisit.push([0, 0, "horizontal", 0]);

  while (nodesToVisit.length > 0)
  {
    console.log(`> > There are ${nodesToVisit.length} Nodes to visit.`);
    let nextNode = nodesToVisit.shift();
    ProcessNode(nextNode);

    if (visitedNodes.has(`x${heatMap[0].length - 1}y${heatMap.length - 1}dVertical`) || visitedNodes.has(`x${heatMap[0].length - 1}y${heatMap.length - 1}dHorizontal`))
    {
      console.log("Reached the destination with minimal heat.");
      break;
    }
  }

  console.log("All nodes have been visited. The shortest path is ...");
}

// Process a node by "visiting" it
function ProcessNode([x, y, entryDirection, totalHeat])
{
  // 1. Check if node already visited from direction
  let nodeID = `x${x}y${y}d${entryDirection}`;

  console.log(`Processing node ${nodeID}`);

  // Check if already visited with a lower or equal totalHeat
  if (visitedNodes.has(nodeID) && visitedNodes.get(nodeID) <= totalHeat)
  {
    console.log("> Node already visited with a lower heat.");
    return;
  }

  visitedNodes.set(nodeID, totalHeat);

  // 2. Queue up next nodes depending on whether

  if (entryDirection === "vertical")
  {
    let leftHeat, rightHeat;

    // < 1 >
    if (x > 0)
    {
      leftHeat = totalHeat + heatMap[y][x - 1];
      nodesToVisit.push([x - 1, y, "horizontal", leftHeat]);
    }

    if (x < heatMap[0].length - 1)
    {
      rightHeat = totalHeat + heatMap[y][x + 1];
      nodesToVisit.push([x + 1, y, "horizontal", rightHeat]);
    }

    // < 2 >
    if (x > 1)
    {
      leftHeat = totalHeat + heatMap[y][x - 2] + heatMap[y][x - 1];
      nodesToVisit.push([x - 2, y, "horizontal", leftHeat]);
    }

    if (x < heatMap[0].length - 2)
    {
      rightHeat = totalHeat + heatMap[y][x + 2] + heatMap[y][x + 1];
      nodesToVisit.push([x + 2, y, "horizontal", rightHeat]);
    }

    // < 3 >
    if (x > 2)
    {
      leftHeat = totalHeat + heatMap[y][x - 3] + heatMap[y][x - 2] + heatMap[y][x - 1];
      nodesToVisit.push([x - 3, y, "horizontal", leftHeat]);
    }

    if (x < heatMap[0].length - 3)
    {
      rightHeat = totalHeat + heatMap[y][x + 3] + heatMap[y][x + 2] + heatMap[y][x + 1];
      nodesToVisit.push([x + 3, y, "horizontal", rightHeat]);
    }
  }

  if (entryDirection === "horizontal")
  {
    let upHeat, downHeat;

    // ^ 1 v
    if (y > 0)
    {
      upHeat = totalHeat + heatMap[y - 1][x];
      nodesToVisit.push([x, y - 1, "vertical", upHeat]);
    }

    if (y < heatMap.length - 1)
    {
      downHeat = totalHeat + heatMap[y + 1][x];
      nodesToVisit.push([x, y + 1, "vertical", downHeat]);
    }

    // ^ 2 v
    if (y > 1)
    {
      upHeat = totalHeat + heatMap[y - 2][x] + heatMap[y - 1][x];
      nodesToVisit.push([x, y - 2, "vertical", upHeat]);
    }

    if (y < heatMap.length - 2)
    {
      downHeat = totalHeat + heatMap[y + 2][x] + heatMap[y + 1][x];
      nodesToVisit.push([x, y + 2, "vertical", downHeat]);
    }

    // ^ 3 v
    if (y > 2)
    {
      upHeat = totalHeat + heatMap[y - 3][x] + heatMap[y - 2][x] + heatMap[y - 1][x];
      nodesToVisit.push([x, y - 3, "vertical", upHeat]);
    }

    if (y < heatMap.length - 3)
    {
      downHeat = totalHeat + heatMap[y + 3][x] + heatMap[y + 2][x] + heatMap[y + 1][x];
      nodesToVisit.push([x, y + 3, "vertical", downHeat]);
    }
  }

  return;
}

DaySeventeen();