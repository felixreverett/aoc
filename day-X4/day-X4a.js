// day X4a

var fs = require("fs"); // imports fs

function DayFourteen()
{
  // 1. Parse input into startReflectorDish
  let startReflectorDish = fs.readFileSync("day-X4/sample-input-2023-14.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n");

  console.log(startReflectorDish);

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

  console.log(endReflectorDish);
  console.log(lowestRockRow);

  // 3. Fill in endReflectorDish

  for (let r = 0; r < startReflectorDish.length; r++)
  {
    console.log(`Row ${r}`);
    for (let c = 0; c < startReflectorDish[r].length; c++)
    {
      if (startReflectorDish[r][c] === "O")
      {
        console.log(`This value should be an O: ${startReflectorDish[r][c]}`);
        console.log(`Current column: ${c}, lowestRockRow[${c}]: ${lowestRockRow[c]}`);
        console.log(lowestRockRow);
        console.log(endReflectorDish[lowestRockRow[c]][c]);
        endReflectorDish[lowestRockRow[c]][c] = "O";
        console.log(endReflectorDish[lowestRockRow[c]][c]);
        lowestRockRow[c] += 1;
      }

      else if (startReflectorDish[r][c] === "#")
      {
        console.log(`This value should be #: ${startReflectorDish[r][c]}`);

        endReflectorDish[r][c] = "#";
        lowestRockRow[c] = r + 1;
      }
    }
  }

  console.log(endReflectorDish);

  for (let r = 0; r < endReflectorDish.length; r++)
  {
    let row = "";
    for (let c = 0; c < endReflectorDish[r].length; c++)
    {
      row += endReflectorDish[r][c];
    }
    console.log(row);
  }

}

DayFourteen();