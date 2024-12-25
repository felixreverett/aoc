var fs = require("fs"); // imports fs
console.time('a');

function FindGuard(array)
{
  for (let row = 0; row < array.length; row++)
  {
    for (let col = 0; col < array[row].length; col++)
    {
      if (array[row][col].match(/\^|>|v|</))
      {
        return [row, col, array[row][col]];
      }
    }
  }
  throw "Error: no guard found in array";
}

function FindVisitedArea(array)
{
  let mappedArea = array.map(row => row.slice());
  let visitedArea = array.map(row => row.slice());

  let guardPosition = FindGuard(mappedArea); // [row, col, direction]

  let guardInArray = true;

  while (guardInArray)
  {
    let nextPos = [];
    switch (guardPosition[2])
    {
      case "^":
        nextPos = [-1, 0];
        break;
      case ">":
        nextPos = [0, 1];
        break;
      case "v":
        nextPos = [1, 0];
        break;
      case "<":
        nextPos = [0, -1];
        break;
    }
    
    visitedArea[guardPosition[0]][guardPosition[1]] = "X";
    
    // check out of bounds
    if ( guardPosition[0] + nextPos[0] < 0
      || guardPosition[0] + nextPos[0] > visitedArea.length - 1
      || guardPosition[1] + nextPos[1] < 0
      || guardPosition[1] + nextPos[1] > visitedArea[guardPosition[0]].length - 1)
    {
      guardInArray = false;
    }

    // calculate next position with a turn
    else if (mappedArea[guardPosition[0] + nextPos[0]][guardPosition[1] + nextPos[1]] === "#")
    {
      switch (guardPosition[2])
      {
        case "^":
        guardPosition[2] = ">";
        break;
      case ">":
        guardPosition[2] = "v";
        break;
      case "v":
        guardPosition[2] = "<";
        break;
      case "<":
        guardPosition[2] = "^";
        break;
      }
    }

    // calculate next position without a turn
    else
    {
      mappedArea[guardPosition[0]][guardPosition[1]] = ".";
      guardPosition[0] += nextPos[0];
      guardPosition[1] += nextPos[1];
      mappedArea[guardPosition[0]][guardPosition[1]] = guardPosition[2];
    }
  }

  return visitedArea;
}

function DetectLoopNew(mappedArea, guardPosition)
{
  //let guardPosition = FindGuard(mappedArea); // this might not work if I reconfigured the structure of mappedArea
  let guardInArray = true;
  let nextPosition = [];

  while (guardInArray)
  {
    // 1. check if cell already visited from same direction
    if (mappedArea[guardPosition[0]][guardPosition[1]].includes(guardPosition[2]))
    {
      return true; // loop found
    }
    
    // 2. "visit" that cell
    else
    {
      mappedArea[guardPosition[0]][guardPosition[1]].push(guardPosition[2]);
    }

    // 3. prepare next cell to visit
    switch (guardPosition[2])
    {
      case "^":
        nextPosition = [-1, 0];
        break;
      case ">":
        nextPosition = [0,  1];
        break;
      case "v":
        nextPosition = [1,  0];
        break;
      case "<":
        nextPosition = [0, -1];
        break;
    }

    // 4. check if next cell would be in area bounds
    if ( guardPosition[0] + nextPosition[0] < 0
      || guardPosition[0] + nextPosition[0] > mappedArea.length - 1
      || guardPosition[1] + nextPosition[1] < 0
      || guardPosition[1] + nextPosition[1] > mappedArea[guardPosition[0]].length - 1)
    {
      return false; // no loop found
    }

    // 5. Check if next cell would be an obstacle
    if (mappedArea[guardPosition[0] + nextPosition[0]][guardPosition[1] + nextPosition[1]][0] === "#")
    {
      // 5a. If an obstacle, update guardPosition[2]
      switch (guardPosition[2])
      {
        case "^":
        guardPosition[2] = ">";
        break;
      case ">":
        guardPosition[2] = "v";
        break;
      case "v":
        guardPosition[2] = "<";
        break;
      case "<":
        guardPosition[2] = "^";
        break;
      }
    }

    // 6. If not an obstacle, update guardPosition[0] and guardPosition[1]
    else
    {
      guardPosition[0] += nextPosition[0];
      guardPosition[1] += nextPosition[1];
    }
  }
}

function Solution()
{
  mappedArea = fs.readFileSync("06/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(line => line.split(""));

  let guardStartPosition = FindGuard(mappedArea).slice();

  let visitedArea = FindVisitedArea(mappedArea);

  let totalValidLoops = 0;
  
  for (let row = 0; row < visitedArea.length; row++)
  {
    for (let col = 0; col < visitedArea[row].length; col++)
    {
      if (visitedArea[row][col] === "X")
      {
        let newArray = mappedArea.map(r => r.slice()).map(r => r.map(cell => [cell]));
        newArray[row][col] = ["#"];
        newArray[guardStartPosition[0]][guardStartPosition[1]] = ["."];
        //console.log(`Calculating valid loop with obstacle at ${row}, ${col}.`);

        totalValidLoops += DetectLoopNew(newArray, guardStartPosition.slice()) ? 1 : 0;
      }
    }
  }
  console.log(`${totalValidLoops} valid loops were found.`);
  console.timeEnd('a');
}

Solution();