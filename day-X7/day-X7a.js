// day X7a
// start 0,0
// end row - 1, col -1
// 1. Parse input into the heatmap
// 2. Create an object to store visited city blocks (X, Y, direction of entry, totalheatloss)
// 3. Create algorithm to iterate through
//    - Input 1, 2, 3 steps forward

var fs = require("fs"); // imports fs
const { MinPriorityQueue } = require("@datastructures-js/priority-queue");

let heatMap;
let shortestPaths = [];
let nodesToVisit;

function DaySeventeen()
{
  // 1. Parse input
  heatMap = fs.readFileSync("day-X7/input-2023-17.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n").map(i => i.split("").map(value => parseInt(value, 10)));

  console.log(heatMap);

  // 2. Create data structure to store shortest path to every node
  for (let row = 0; row < heatMap.length; row++)
  {
    let newRow = [];
    for (let col = 0; col < heatMap[0].length; col++)
    {
      newRow.push([Infinity, Infinity]);
    }
    shortestPaths.push(newRow);
  }

  nodesToVisit = new MinPriorityQueue({ priority: (element) => element[3] });
  nodesToVisit.enqueue([0, 0, "vertical", 0]);
  nodesToVisit.enqueue([0, 0, "horizontal", 0]);

  while (!nodesToVisit.isEmpty())
  {
    if (nodesToVisit.length % 1000 === 0)
    {
      console.log(`> > There are ${nodesToVisit.length} Nodes to visit.`);
    }
    let nextNode = nodesToVisit.dequeue();
    
    ProcessNode(nextNode);

    if (shortestPaths[shortestPaths.length - 1][shortestPaths[0].length - 1][0] < Infinity || shortestPaths[shortestPaths.length - 1][shortestPaths[0].length - 1][1] < Infinity)
    {
      //break;
    }
  }

  let lowestHeat = Math.min(shortestPaths[shortestPaths.length - 1][shortestPaths[0].length - 1][0], shortestPaths[shortestPaths.length - 1][shortestPaths[0].length - 1][1]);
  console.log(`All nodes have been visited. The shortest path to the bottom-right is ${lowestHeat}`);
}

// Process a node by "visiting" it
// Arrive at a new node having already included the heat of that node.
function ProcessNode([col, row, entryDirection, arrivalHeat])
{
  // 1. Check if node already visited from direction
  //console.log(`Processing node row: ${row}, col: ${col}, direction: ${entryDirection}, arrival heat: ${arrivalHeat}.`);
  
  // 2. Queue up next nodes
  if (entryDirection === "vertical")
  {
    // < 1 >
    if (col > 0)
    {
      let departureHeat = arrivalHeat + heatMap[row][col - 1];
      if (departureHeat < shortestPaths[row][col - 1][1])
      {
        shortestPaths[row][col - 1][1] = departureHeat;
        nodesToVisit.enqueue([col - 1, row, "horizontal", departureHeat]);
      }
    }

    if (col < heatMap[0].length - 1)
    {
      let departureHeat = arrivalHeat + heatMap[row][col + 1];
      if (departureHeat < shortestPaths[row][col + 1][1])
      {
        shortestPaths[row][col + 1][1] = departureHeat;
        nodesToVisit.enqueue([col + 1, row, "horizontal", departureHeat]);
      }
    }

    // < 2 >
    if (col > 1)
    {
      let departureHeat = arrivalHeat + heatMap[row][col - 2] + heatMap[row][col - 1];
      if (departureHeat < shortestPaths[row][col - 2][1])
      {
        shortestPaths[row][col - 2][1] = departureHeat;
        nodesToVisit.enqueue([col - 2, row, "horizontal", departureHeat]);
      }
    }

    if (col < heatMap[0].length - 2)
    {
      let departureHeat = arrivalHeat + heatMap[row][col + 2] + heatMap[row][col + 1];
      if (departureHeat < shortestPaths[row][col + 2][1])
      {
        shortestPaths[row][col + 2][1] = departureHeat;
        nodesToVisit.enqueue([col + 2, row, "horizontal", departureHeat]);
      }
    }

    // < 3 >
    if (col > 2)
    {
      let departureHeat = arrivalHeat + heatMap[row][col - 3] + heatMap[row][col - 2] + heatMap[row][col - 1];
      if (departureHeat < shortestPaths[row][col - 3][1])
      {
        shortestPaths[row][col - 3][1] = departureHeat;
        nodesToVisit.enqueue([col - 3, row, "horizontal", departureHeat]);
      }
    }

    if (col < heatMap[0].length - 3)
    {
      let departureHeat = arrivalHeat + heatMap[row][col + 3] + heatMap[row][col + 2] + heatMap[row][col + 1];
      if (departureHeat < shortestPaths[row][col + 3][1])
      {
        shortestPaths[row][col + 3][1] = departureHeat;
        nodesToVisit.enqueue([col + 3, row, "horizontal", departureHeat]);
      }
    }
  }

  if (entryDirection === "horizontal")
  {
    // ^ 1 v
    if (row > 0)
    {
      let departureHeat = arrivalHeat + heatMap[row - 1][col];
      if (departureHeat < shortestPaths[row - 1][col][0])
      {
        shortestPaths[row - 1][col][0] = departureHeat;
        nodesToVisit.enqueue([col, row - 1, "vertical", departureHeat]);
      }
    }

    if (row < heatMap.length - 1)
    {
      let departureHeat = arrivalHeat + heatMap[row + 1][col];
      if (departureHeat < shortestPaths[row + 1][col][0])
      {
        shortestPaths[row + 1][col][0] = departureHeat;
        nodesToVisit.enqueue([col, row + 1, "vertical", departureHeat]);
      }
    }

    // ^ 2 v
    if (row > 1)
    {
      let departureHeat = arrivalHeat + heatMap[row - 2][col] + heatMap[row - 1][col];
      if (departureHeat < shortestPaths[row - 2][col][0])
      {
        shortestPaths[row - 2][col][0] = departureHeat;
        nodesToVisit.enqueue([col, row - 2, "vertical", departureHeat]);
      }
    }

    if (row < heatMap.length - 2)
    {
      let departureHeat = arrivalHeat + heatMap[row + 2][col] + heatMap[row + 1][col];
      if (departureHeat < shortestPaths[row + 2][col][0])
      {
        shortestPaths[row + 2][col][0] = departureHeat;
        nodesToVisit.enqueue([col, row + 2, "vertical", departureHeat]);
      }
    }

    // ^ 3 v
    if (row > 2)
    {
      let departureHeat = arrivalHeat + heatMap[row - 3][col] + heatMap[row - 2][col] + heatMap[row - 1][col];
      if (departureHeat < shortestPaths[row - 3][col][0])
      {
        shortestPaths[row - 3][col][0] = departureHeat;
        nodesToVisit.enqueue([col, row - 3, "vertical", departureHeat]);
      }
    }

    if (row < heatMap.length - 3)
    {
      let departureHeat = arrivalHeat + heatMap[row + 3][col] + heatMap[row + 2][col] + heatMap[row + 1][col];
      if (departureHeat < shortestPaths[row + 3][col][0])
      {
        shortestPaths[row + 3][col][0] = departureHeat;
        nodesToVisit.enqueue([col, row + 3, "vertical", departureHeat]);
      }
    }
  }

  return;
}

DaySeventeen();