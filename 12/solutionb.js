var fs = require("fs"); // imports fs
const PlotTracker = require("./PlotTrackerB.js");
console.time('a');
const cardinals = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const cornerCardinals = [
  [-1, -1], [-1, 0], [-1, 1],
  [ 0, -1],          [ 0, 1],
  [ 1, -1], [ 1, 0], [ 1, 1]];

function Solution()
{
  let plotGrid = fs.readFileSync("12/sample-input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(row => row.split(""));

  let visited = new Set();
  let total = 0;
    
  for (let r = 0; r < plotGrid.length; r++)
  {
    for (let c = 0; c < plotGrid[r].length; c++)
    {
      // Check if node visited
      if (visited.has(`${r}-${c}`))
      {
        continue;
      }

      // Start new plot
      let plotTracker = new PlotTracker();
      plotTracker.type = plotGrid[r][c];

      TraversePlot(r, c, plotTracker, plotGrid, visited);
      console.log(`Calculated new plot of type ${plotTracker.type}, sides ${plotTracker.sides}, and area ${plotTracker.area}`)

      total += plotTracker.sides * plotTracker.area;
    }
  }
  
  console.timeEnd('a');
  console.log(`Day 12a solution: ${total}`);
}

function TraversePlot(row, col, plotTracker, plotGrid, visited)
{
  let queue = [[row, col]];

  while (queue.length > 0)
  {
    let [r, c] = queue.shift();

    if (visited.has(`${r}-${c}`))
    {
      continue;
    }

    // 1. Find adjacent cells
    for (const [dr, dc] of cardinals)
    {
      const newRow = r + dr;
      const newCol = c + dc;

      if (IsInBounds(newRow, newCol, plotGrid) && plotGrid[newRow][newCol] === plotTracker.type)
      {
        queue.push([newRow, newCol]);
      }
    }

    // 2. Calculate number of edges (sides) at that cell
    let adjacents = [
      [false,false,false],
      [false,false,false],
      [false,false,false]];

    for (const [dr, dc] of cornerCardinals)
    {
      const newRow = r + dr;
      const newCol = c + dc;

      adjacents[1 + dr][1 + dc] = IsInBounds(newRow, newCol, plotGrid) && plotGrid[newRow][newCol] === plotTracker.type;
      //console.log("Calculating adjacents");
    }
    console.log(adjacents);
    // ^<
    console.log(`> Checking ^<`);
    if (!adjacents[1][0] && !adjacents[0][1])
    {
      console.log("> > Found 1 side");
      plotTracker.sides++;
    }
    else if (!adjacents[0][0] && adjacents[1][0] && adjacents[0][1])
    {
      console.log("> > Found 1 side");
      plotTracker.sides++;
    }

    // ^>
    console.log(`> Checking ^>`);
    if (!adjacents[0][1] && !adjacents[1][2])
    {
      console.log("> > Found 1 side");
      plotTracker.sides++;
    }
    else if (!adjacents[0][2] && adjacents[0][1] && adjacents[1][2])
    {
      console.log("> > Found 1 side");
      plotTracker.sides++;
    }

    // v>
    console.log(`> Checking v>`);
    if (!adjacents[2][1] && !adjacents[1][2])
    {
      console.log("> > Found 1 side");
      plotTracker.sides++;
    }
    else if (!adjacents[2][2] && adjacents[2][1] && adjacents[1][2])
    {
      console.log("> > Found 1 side");
      plotTracker.sides++;
    }

    // v<
    console.log(`> Checking v<`);
    if (!adjacents[2][1] && !adjacents[1][0])
    {
      console.log("> > Found 1 side");
      plotTracker.sides++;
    }
    else if (!adjacents[2][0] && adjacents[2][1] && adjacents[1][0])
    {
      console.log("> > Found 1 side");
      plotTracker.sides++;
    }

    // 3. No matter the results, increment area and mark as visited
    plotTracker.area++;
    visited.add(`${r}-${c}`);
  }
}

function IsInBounds(row, col, plotGrid)
{
  return row >= 0 &&
    row < plotGrid.length &&
    col >= 0 &&
    col < plotGrid[row].length;
}

Solution();