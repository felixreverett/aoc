// day X7a
// start 0,0
// end row - 1, col -1
// 1. Parse input into the heatmap
// 2. Create an object to store visited city blocks (X, Y, direction of entry, totalheatloss)
// 3. Create algorithm to iterate through
//    - Input 1, 2, 3 steps forward

var fs = require("fs"); // imports fs
let heatMap;
let visitedNodes = new Map(); // todo: deprecate
let shortestPaths = [];
let nodesToVisit = [];

function DaySeventeen()
{
  // 1. Parse input
  heatMap = fs.readFileSync("day-X7/input-2023-17.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n").map(i => i.split("").map(value => parseInt(value, 10)));

  console.log(heatMap);

  // 2. [NEW] Create data structure to store shortest path to every node
  for (let row = 0; row < heatMap.length; row++)
  {
    let newRow = [];
    for (let col = 0; col < heatMap[0].length; col++)
    {
      //vertical and horizontal
      newRow.push([Infinity, Infinity]);
    }
    shortestPaths.push(newRow);
  }

  console.log(shortestPaths[12][1][1]);

  nodesToVisit.push([0, 0, "vertical", 0]);
  nodesToVisit.push([0, 0, "horizontal", 0]);

  while (nodesToVisit.length > 0)
  {
    console.log(`> > There are ${nodesToVisit.length} Nodes to visit.`);
    let nextNode = nodesToVisit.shift();
    ProcessNode(nextNode);

    /*
    if (visitedNodes.has(`x${heatMap[0].length - 1}y${heatMap.length - 1}dvertical`) || visitedNodes.has(`x${heatMap[0].length - 1}y${heatMap.length - 1}dhorizontal`))
    {
      console.log("Reached the destination with minimal heat.");
      break;
    }
    */
  }

  let lowestHeat = Math.min(shortestPaths[shortestPaths.length - 1][shortestPaths[0].length - 1][0], shortestPaths[shortestPaths.length - 1][shortestPaths[0].length - 1][1]);
  console.log(`All nodes have been visited. The shortest path to the bottom-right is ${lowestHeat}`);
}

// Process a node by "visiting" it
// Arrive at a new node having already included the heat of that node.
function ProcessNode([col, row, entryDirection, arrivalHeat])
{
  // 1. Check if node already visited from direction
  console.log(`Processing node row: ${row}, col: ${col}, direction: ${entryDirection}, arrival heat: ${arrivalHeat}.`);

  if (entryDirection === "vertical")
  {
    if (arrivalHeat >= shortestPaths[row][col][0])
    {
      console.log("Lower router already found to destination");
      return;
    }
    else
    {
      shortestPaths[row][col][0] = arrivalHeat;
    }
  }
  else if (entryDirection === "horizontal")
  {
    if (arrivalHeat >= shortestPaths[row][col][1])
    {
      console.log("Lower router already found to destination");
      return;
    }
    else
    {
      shortestPaths[row][col][1] = arrivalHeat;
    }
  }
  else
  {
    throw Error("ERROR: entry direction is neither horizontal nor vertical.");
  }
  

  //visitedNodes.set(nodeID, arrivalHeat);

  // 2. Queue up next nodes depending on entry direction

  if (entryDirection === "vertical")
  {
    // < 1 >
    if (col > 0)
    {
      let departureHeat = arrivalHeat + heatMap[row][col - 1];
      nodesToVisit.push([col - 1, row, "horizontal", departureHeat]);
    }

    if (col < heatMap[0].length - 1)
    {
      let departureHeat = arrivalHeat + heatMap[row][col + 1];
      nodesToVisit.push([col + 1, row, "horizontal", departureHeat]);
    }

    // < 2 >
    if (col > 1)
    {
      let departureHeat = arrivalHeat + heatMap[row][col - 2] + heatMap[row][col - 1];
      nodesToVisit.push([col - 2, row, "horizontal", departureHeat]);
    }

    if (col < heatMap[0].length - 2)
    {
      let departureHeat = arrivalHeat + heatMap[row][col + 2] + heatMap[row][col + 1];
      nodesToVisit.push([col + 2, row, "horizontal", departureHeat]);
    }

    // < 3 >
    if (col > 2)
    {
      let departureHeat = arrivalHeat + heatMap[row][col - 3] + heatMap[row][col - 2] + heatMap[row][col - 1];
      nodesToVisit.push([col - 3, row, "horizontal", departureHeat]);
    }

    if (col < heatMap[0].length - 3)
    {
      let departureHeat = arrivalHeat + heatMap[row][col + 3] + heatMap[row][col + 2] + heatMap[row][col + 1];
      nodesToVisit.push([col + 3, row, "horizontal", departureHeat]);
    }
  }

  if (entryDirection === "horizontal")
  {
    // ^ 1 v
    if (row > 0)
    {
      let departureHeat = arrivalHeat + heatMap[row - 1][col];
      nodesToVisit.push([col, row - 1, "vertical", departureHeat]);
    }

    if (row < heatMap.length - 1)
    {
      let departureHeat = arrivalHeat + heatMap[row + 1][col];
      nodesToVisit.push([col, row + 1, "vertical", departureHeat]);
    }

    // ^ 2 v
    if (row > 1)
    {
      let departureHeat = arrivalHeat + heatMap[row - 2][col] + heatMap[row - 1][col];
      nodesToVisit.push([col, row - 2, "vertical", departureHeat]);
    }

    if (row < heatMap.length - 2)
    {
      let departureHeat = arrivalHeat + heatMap[row + 2][col] + heatMap[row + 1][col];
      nodesToVisit.push([col, row + 2, "vertical", departureHeat]);
    }

    // ^ 3 v
    if (row > 2)
    {
      let departureHeat = arrivalHeat + heatMap[row - 3][col] + heatMap[row - 2][col] + heatMap[row - 1][col];
      nodesToVisit.push([col, row - 3, "vertical", departureHeat]);
    }

    if (row < heatMap.length - 3)
    {
      let departureHeat = arrivalHeat + heatMap[row + 3][col] + heatMap[row + 2][col] + heatMap[row + 1][col];
      nodesToVisit.push([col, row + 3, "vertical", departureHeat]);
    }
  }

  return;
}

DaySeventeen();