/* day XX1b
Plan:
  Store an int for the number of steps that could land at any space
  iterating through the single array, add that value to adjacent tiles for each step
  for edge-of-grid cases, go to the opposite side of the array
*/

var fs = require("fs"); // imports fs

function DayTwentyOneB()
{
  // 1. Parse input
  let currentStepArray = fs.readFileSync("day-XX1/sample-input-2023-21.txt", "utf-8")
  .replace(/\r/gm, "")
  .replace("S", 1)
  .replace(/\./gm, 0)
  .split("\n")
  .map(i => i.split(""));

  currentStepArray = Intify(currentStepArray);

  let templateStepArray = GenerateTemplateStepArray(currentStepArray);

  let numberOfSteps = 6;

  for (let s = 0; s < numberOfSteps; s++)
  {
    currentStepArray = TakeAStepB(currentStepArray, templateStepArray);
    console.log(`${s + 1} Steps Taken:`);
    console.log(`Can reach exactly: ${CountO(currentStepArray)} steps`)
    PrintStepArray(currentStepArray);
  }

  console.log(`After ${numberOfSteps} steps, the Elf can reach any of ${CountO(currentStepArray)} garden plots.`);

}

// Takes a step wrapping around edges and summing the total steps in each cell.
function TakeAStepB(currentStepArray, templateStepArray)
{
  let nextStepArray = templateStepArray.map(row => [...row]);

  for (let r = 0; r < currentStepArray.length; r++)
  {
    for (let c = 0; c < currentStepArray[r].length; c++)
    {
      let currentCellValue = currentStepArray[r][c];

      // 1. if cell value is not a rock and is > 0
      if (currentCellValue !== "#" && currentCellValue > 0)
      {
        // 2. Add that cell value to all adjacent cells, accounting for rocks and warping space-time for edges

        // 2a. North
        if (r > 0)
        {
          if (nextStepArray[r - 1][c] !== "#")
          {
            nextStepArray[r - 1][c] += currentCellValue;
          }
        }
        else if (nextStepArray[currentStepArray.length - 1][c] !== "#")
        {
          nextStepArray[currentStepArray.length - 1][c] += currentCellValue;
        }

        // 2b. East
        if (c < currentStepArray[r].length - 1)
        {
          if (nextStepArray[r][c + 1] !== "#")
          {
            nextStepArray[r][c + 1] += currentCellValue;
          }
        }
        else if (nextStepArray[r][0] !== "#")
        {
          nextStepArray[r][0] += currentCellValue;
        }

        // 2c. South
        if (r < currentStepArray.length - 1)
        {
          if (nextStepArray[r + 1][c] !== "#")
          {
            nextStepArray[r + 1][c] += currentCellValue;
          }
        }
        else if (nextStepArray[0][c] !== "#")
        {
          nextStepArray[0][c] += currentCellValue;
        }

        // 2d. West
        if (c > 0)
        {
          if (nextStepArray[r][c - 1] !== "#")
          {
            nextStepArray[r][c - 1] += currentCellValue;
          }
        }
        else if (nextStepArray[r][currentStepArray[r].length - 1] !== "#")
        {
          nextStepArray[r][currentStepArray[r].length - 1] += currentCellValue;
        }
      }
    }
  }

  return nextStepArray;
}

function GenerateTemplateStepArray(inputStepArray)
{
  let currentStepArray = inputStepArray.map(row => [...row]);

  for (let r = 0; r < currentStepArray.length; r++)
  {
    for (let c = 0; c < currentStepArray[r].length; c++)
    {
      if (currentStepArray[r][c] === 1)
      {
        currentStepArray[r][c] = 0;
        return currentStepArray;
      }
    }
  }
}

function PrintStepArray(stepArray)
{
  for (let r = 0; r < stepArray.length; r++)
  {
    let column = "";
    for (let c = 0; c < stepArray[r].length; c++)
    {
      if (stepArray[r][c] === "#")
      {
        column += stepArray[r][c];
      }
      else
      {
        if (stepArray[r][c] < 1)
        {
          column += ".";
        }
        else if (stepArray[r][c] < 10)
        {
          column += "░";
        }
        else if (stepArray[r][c] < 100)
        {
          column += "▒";
        }
        else if (stepArray[r][c] < 1000)
        {
          column += "▓";
        }
        else
        {
          column += "█";
        }
      }
      
    }
    console.log(column);
  }
}

function CountO(stepArray)
{
  let count = 0;
  for (let r = 0; r < stepArray.length; r++)
  {
    for (let c = 0; c < stepArray[r].length; c++)
    {
      if (stepArray[r][c] !== "#")
      {
        count += stepArray[r][c];
      }
    }
  }
  return count;
}

function Intify(stepArray)
{
  let regex = /\d/;

  let nextStepArray = stepArray.map(row => [...row]);

  for (let r = 0; r < stepArray.length; r++)
  {
    for (let c = 0; c < stepArray[r].length; c++)
    {
      if (regex.test(stepArray[r][c]))
      {
        nextStepArray[r][c] = parseInt(stepArray[r][c]);
      }
    }
  }

  return nextStepArray;
}

DayTwentyOneB();