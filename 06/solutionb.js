var fs = require("fs"); // imports fs

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

function FindVisitedArea(mappedArea)
{
  let visitedArea = mappedArea.map(row => row.slice());

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

function DetectLoop(array, guardPosition)
{
  let guardInArray = true; let initialCheck = true;
  console.log(guardPosition);

  while (guardInArray)
  {
    // 1. check if current position would be out of bounds (can't be a loop, so return false)
    if ( guardPosition[0] < 0
      || guardPosition[0] > array.length - 1
      || guardPosition[1] < 0
      || guardPosition[1] > array[guardPosition[0]].length - 1)
    {
      console.log(`> No loops were found as the guard exited the bounds.`); //debug
      return false; // no loop found
    }

    // 2. check if current position has already been visited
    if (!initialCheck)
    {
      if (array[guardPosition[0]][guardPosition[1]].includes(guardPosition[2]))
      {
        console.log(`> True that ${array[guardPosition[0]][guardPosition[1]]} includes ${guardPosition[2]}, which has already been visited`);
        console.log(`> This happened at ${guardPosition[0]}, ${guardPosition[1]}`);
        return true; // loop found
      }
    
      // if not, then update array to "visit" it
      else
      {
        array[guardPosition[0]][guardPosition[1]].push(guardPosition[2]);
      }
    }

    initialCheck = false;

    // 3. check is current position is an obstacle
    if (array[guardPosition[0]][guardPosition[1]][0] === "#")
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
      continue;
    }

    // 4. update guard position if current position is not an obstacle
    switch (guardPosition[2])
    {
      case "^":
        guardPosition[0]--;
        break;
      case ">":
        guardPosition[1]++;
        break;
      case "v":
        guardPosition[0]++;
        break;
      case "<":
        guardPosition[1]--;
        break;
    }
  }
}

function Solution()
{
  mappedArea = fs.readFileSync("06/sample-input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(line => line.split(""));

  let guardStartPosition = FindGuard(mappedArea).slice();
  console.log(guardStartPosition);

  let visitedArea = FindVisitedArea(mappedArea);

  let totalValidLoops = 0;

  //let newArray = mappedArea.map(row => row.slice()).map(row => row.map(cell => [cell]));
  //newArray[3][4] = ["#"];
  //console.log(`Calculating valid loop with obstacle at ${3}, ${4}.`);
  
  for (let row = 0; row < visitedArea.length; row++)
  {
    for (let col = 0; col < visitedArea[row].length; col++)
    {
      if (visitedArea[row][col] === "X")
      {
        let newArray = mappedArea.map(r => r.slice()).map(r => r.map(cell => [cell]));
        newArray[row][col] = ["#"];
        console.log(`Calculating valid loop with obstacle at ${row}, ${col}.`);

        totalValidLoops += DetectLoop(newArray, guardStartPosition.slice()) ? 1 : 0;
      }
    }
  }
  console.log(`${totalValidLoops} valid loops were found.`);
}

Solution();