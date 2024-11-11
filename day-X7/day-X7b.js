// day X7b

var fs = require("fs"); // imports fs
const { PriorityQueue } = require("@datastructures-js/priority-queue");

let heatMap;
let shortestPaths = [];

let nodesToVisit = new PriorityQueue((a, b) => {
  if (a[3] > b[3])
  {
    return 1;
  }
  else
  {
    return -1;
  }
})

function DaySeventeenB()
{
  heatMap = fs.readFileSync("day-X7/input-2023-17.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n")
  .map(i => i.split("").map(value => parseInt(value, 10)));

  for (let row = 0; row < heatMap.length; row++)
  {
    let newRow = [];
    for (let col = 0; col < heatMap[0].length; col++)
    {
      newRow.push([Infinity, Infinity]);
    }
    shortestPaths.push(newRow);
  }
  
  nodesToVisit.enqueue([0, 0, "vertical", 0]);
  nodesToVisit.enqueue([0, 0, "horizontal", 0]);

  const startTime = Date.now();

  while (!nodesToVisit.isEmpty())
  {
    if (nodesToVisit.length % 1000 === 0)
    {
      console.log(`> > There are ${nodesToVisit.length} Nodes to visit.`);
    }
    let nextNode = nodesToVisit.dequeue();
    
    ProcessNode(nextNode);
  }

  const endTime = Date.now();
  console.log(`Algorithm complete in ${endTime - startTime} ms.`);

  let lowestHeat = Math.min(shortestPaths[shortestPaths.length - 1][shortestPaths[0].length - 1][0], shortestPaths[shortestPaths.length - 1][shortestPaths[0].length - 1][1]);
  console.log(`All nodes have been visited. The shortest path to the bottom-right is ${lowestHeat}`);
}

function ProcessNode([col, row, entryDirection, arrivalHeat])
{
  // I'll use a ternary operator to more compactly enqueue "arrivals".
  let directions = entryDirection === "vertical" ? [[-1, 0, "horizontal"], [1, 0, "horizontal"]] : [[0, -1, "vertical"], [0, 1, "vertical"]];

  // Iterate through all possible steps forward for part B
  for (let steps = 4; steps <= 10; steps++)
  {
    for (let [dc, dr, departureDirection] of directions)
    {
      let departureCol = col + dc * steps;
      let departureRow = row + dr * steps;

      // Check bounds
      if ( departureCol >= 0 && departureCol < heatMap[0].length && departureRow >= 0 && departureRow < heatMap.length)
      {
        let stepHeat = 0;
        for (let i = 0; i < steps; i++)
        {
          // Get total heat from all cells crossed
          stepHeat += heatMap[row + dr * (i + 1)][col + dc * (i + 1)];
        }
        let departureHeat = arrivalHeat + stepHeat;

        let targetIndex = departureDirection === "horizontal" ? 1 : 0;

        if (departureHeat < shortestPaths[departureRow][departureCol][targetIndex])
        {
          shortestPaths[departureRow][departureCol][targetIndex] = departureHeat;
          nodesToVisit.enqueue([departureCol, departureRow, departureDirection, departureHeat]);
        }
      }
    }
  }
  return;
}

DaySeventeenB();