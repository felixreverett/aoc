var fs = require("fs"); // imports fs
const PlotTracker = require("./PlotTracker.js");
console.time('a');
const cardinals = [[-1, 0], [0, 1], [1, 0], [0, -1]];

function Solution()
{
  let plotGrid = fs.readFileSync("12/input.txt", "utf-8")
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
      //console.log(`Adding a region of ${plotTracker.type} with price ${plotTracker.area} * ${plotTracker.perimeter} = ${plotTracker.perimeter * plotTracker.area} to total.`);

      total += plotTracker.perimeter * plotTracker.area;
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

    // check all adjacent cells
    for (const [dr, dc] of cardinals)
    {
      const newRow = r + dr;
      const newCol = c + dc;

      // if the adjacent cell is in bounds
      if (IsInBounds(newRow, newCol, plotGrid))
      {
        // if the adjacent cell is of the same type, add to queue
        if (plotGrid[newRow][newCol] === plotTracker.type)
        {
          queue.push([newRow, newCol]);
        }
        else
        {
          plotTracker.perimeter++;
        }
      }
      else
      {
        plotTracker.perimeter++;
      }
    }

    // No matter the results, increment area and mark as visited
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