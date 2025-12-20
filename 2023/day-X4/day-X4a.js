// day X4a

var fs = require("fs"); // imports fs

function DayFourteen()
{
  // 1. Parse input into startReflectorDish
  let startReflectorDish = fs.readFileSync("day-X4/input-2023-14.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n");

  // 2. Make endReflectorDish & lowestRockRow
  let endReflectorDish = [];
  let lowestRockRow = [];
  for (let r = 0; r < startReflectorDish.length; r++)
  {
    lowestRockRow.push(0);
    let row = [];
    for (let c = 0; c < startReflectorDish[r].length; c++)
    {
      row.push(".");
    }

    endReflectorDish.push(row);
  }

  // 3. Fill in endReflectorDish
  for (let r = 0; r < startReflectorDish.length; r++)
  {
    for (let c = 0; c < startReflectorDish[r].length; c++)
    {
      if (startReflectorDish[r][c] === "O")
      {
        endReflectorDish[lowestRockRow[c]][c] = "O";
        lowestRockRow[c] += 1;
      }

      else if (startReflectorDish[r][c] === "#")
      {
        endReflectorDish[r][c] = "#";
        lowestRockRow[c] = r + 1;
      }
    }
  }

  // 4. Find solution
  let solution = 0;
  for (let r = 0; r < endReflectorDish.length; r++)
  {
    for (let c = 0; c < endReflectorDish[r].length; c++)
    {
      if (endReflectorDish[r][c] === "O")
      {
        solution += (endReflectorDish.length - r);
      }
    }
  }
  console.log(`Day 14a solution: ${solution}`);

}

DayFourteen();