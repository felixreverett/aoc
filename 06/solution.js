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

function CalculateVisitedMapPositions(array)
{
  let visitedMapPositions = 0;
  for (let row = 0; row < array.length; row++)
  {
    for (let col = 0; col < array[row].length; col++)
    {
      if (array[row][col] === "X")
      {
        visitedMapPositions++;
      }
    }
  }
  return visitedMapPositions;
}

function Solution()
{
  mappedArea = fs.readFileSync("06/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(line => line.split(""));

  let visitedArea = mappedArea.map(row => row.slice());

  let guardPosition = FindGuard(mappedArea); // [row, col, direction]
  console.log(guardPosition); //debug

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
      console.log(`Guard moved out of bounds because position was ${guardPosition}`); //debug
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
      console.log("Moved with no obstacle"); //debug
      mappedArea[guardPosition[0]][guardPosition[1]] = ".";
      guardPosition[0] += nextPos[0];
      guardPosition[1] += nextPos[1];
      mappedArea[guardPosition[0]][guardPosition[1]] = guardPosition[2];
    }
  }

  let visitedMapPositions = CalculateVisitedMapPositions(visitedArea);
  console.log(visitedArea); //debug
  console.log(`${visitedMapPositions} map positions were visited.`);
}

Solution();