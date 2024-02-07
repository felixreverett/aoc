// day X1a
// 1. Find where to warp space
// 2. Warp space (columns then rows)
// 3. Identify locations of every galaxy into a list of galaxy class

var fs = require("fs"); // imports fs
const Galaxy = require("./Galaxy.js");

function DayEleven()
{
  // 1. Parsing input
  let space = fs.readFileSync("day-X1/sample-input-2023-11.txt", "utf-8")
    .split("\n")
    .map(i => i.replace("\r", ""))
    .map(i => i.split(""));

  let expandedSpace = expandSpace(space);

  // debug to see if it worked
  for (let i = 0; i < expandedSpace.length; i++)
  {
    let row = "";
    for (let j = 0; j < expandedSpace[i].length; j++)
    {
      row += expandedSpace[i][j];
    }
    console.log(row);
  }
}

function expandSpace(space)
{
  // prepare columnTracker, get longest row length
  let columnTracker = [];
  for (let c = 0; c < Math.max(...(space.map(el => el.length))); c++)
  {
    columnTracker.push(0);
  }
  
  // mark all columns that have at least 1 galaxy
  for (let row = 0; row < space.length; row++)
  {
    for (let col = 0; col < space[row].length; col++)
    {
      if (space[row][col] === "#")
      {
        columnTracker[col] = 1;
      }
    }
  }

  // expand columns at appropriate indices
  for (let col = columnTracker.length - 1; col >= 0; col--)
  {
    if (columnTracker[col] === 0)
    {
      for (let row = 0; row < space.length; row++)
      {
        space[row].splice(col, 0, ".");
      }
    }
  }

  console.log(space); //debug

  // prepare rowTracker
  let rowTracker = [];
  for (let r = 0; r < space.length; r++)
  {
    rowTracker.push(0);
  }

  // mark all rows that have at least 1 galaxy
  for (let row = 0; row < space.length; row++)
  {
    for (let col = 0; col < space[row].length; col++)
    {
      if (space[row][col] === "#")
      {
        rowTracker[row] = 1;
      }
    }
  }

  // expand rows at appropriate indices
  for (let row = rowTracker.length - 1; row >= 0; row--)
  {
    if (rowTracker[row] === 0)
    {
      let newRow = space[row];
      space.splice(row, 0, newRow);
    }
  }

  console.log(space); //debug

  return space;
}

DayEleven();