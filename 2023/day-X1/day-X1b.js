// day X1a
// 1. Find where to warp space
// 2. Warp space (columns then rows)
// 3. Identify locations of every galaxy into a list of galaxy class

var fs = require("fs"); // imports fs
const Galaxy = require("./Galaxy.js");

function DayEleven()
{
  // 1. Parsing input
  let space = fs.readFileSync("day-X1/input-2023-11.txt", "utf-8")
    .split("\n")
    .map(i => i.replace("\r", ""))
    .map(i => i.split(""));

  let expandedSpace = expandSpace(space);

  //debug
  for (let r = 0; r < expandedSpace.length; r++)
  {
    let currentRow = "";
    for (let c = 0; c < expandedSpace[r].length; c++)
    {
      currentRow += expandedSpace[r][c];
    }
    console.log(currentRow);
  }

  let galaxyList = getGalaxyList(expandedSpace);
  
  let galaxyDistances = getGalaxyDistances(galaxyList, expandedSpace);

  let totalGalaxyDistance = galaxyDistances.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  console.log(`The total sum of galaxy distances is: ${totalGalaxyDistance}`);
  
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

  // replace galaxy-less columns at appropriate indices with M
  for (let col = columnTracker.length - 1; col >= 0; col--)
  {
    if (columnTracker[col] === 0)
    {
      for (let row = 0; row < space.length; row++)
      {
        space[row][col] = "M";
      }
    }
  }

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
      for (let col = 0; col < space[row].length; col++)
      {
        space[row][col] = "M";
      }
    }
  }

  return space;
}

function getGalaxyList(space)
{
  let galaxyIndex = 0; let galaxyList = [];
  for (let row = 0; row < space.length; row++)
  {
    for (let col = 0; col < space[row].length; col++)
    {
      if (space[row][col] === "#")
      {
        galaxyIndex++;
        galaxyList.push(new Galaxy(galaxyIndex, row, col));
      }
    }
  }

  return galaxyList;
}

function getGalaxyDistances(galaxyList, expandedSpace)
{
  let galaxyDistances = [];
  let pointer = 1; // prevent counting galaxy-to-galaxy distance twice

  for (let galaxyA = 0; galaxyA < galaxyList.length; galaxyA++)
  {
    for (let galaxyB = pointer; galaxyB < galaxyList.length; galaxyB++)
    {
      let currentGalaxyDistance = 0;

      // find lower of two rows
      let startRow; let endRow;
      if (galaxyList[galaxyA].row <= galaxyList[galaxyB].row)
      {
        startRow = galaxyList[galaxyA].row;
        endRow = galaxyList[galaxyB].row;
      }
      else
      {
        startRow = galaxyList[galaxyB].row;
        endRow = galaxyList[galaxyA].row;
      }

      // find lower of two cols
      let startCol; let endCol;
      if (galaxyList[galaxyA].col <= galaxyList[galaxyB].col)
      {
        startCol = galaxyList[galaxyA].col;
        endCol = galaxyList[galaxyB].col;
      }
      else
      {
        startCol = galaxyList[galaxyB].col;
        endCol = galaxyList[galaxyA].col;
      }

      // calculate distances
      for (let r = startRow; r < endRow; r++)
      {
        if (expandedSpace[r][startCol] === "M")
        {
          currentGalaxyDistance += 1000000;
        }
        else
        {
          currentGalaxyDistance++;
        }
      }

      for (let c = startCol; c < endCol; c++)
      {
        if (expandedSpace[endRow][c] === "M")
        {
          currentGalaxyDistance += 1000000;
        }
        else
        {
          currentGalaxyDistance++;
        }
      }

      galaxyDistances.push(currentGalaxyDistance);
    }
    pointer++;
  }

  return galaxyDistances;
}

DayEleven();