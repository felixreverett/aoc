/* day XX2a
Plan:
  
*/

var fs = require("fs"); // imports fs
const Brick = require("./Brick.js"); // imports Brick

function DayTwentyTwo()
{
  // 1. Parse input
  let input = fs.readFileSync("day-XX2/sample-input-2023-22.txt", "utf-8")
  .replace(/\r/gm, "")
  .replace(/~/gm, ",")
  .split("\n")
  .map(i => i.split(","));

  let bricksList = [];

  for (let b = 0; b < input.length; b++)
  {
    bricksList.push(new Brick(b, input[b]));
  }

  console.log(bricksList[0].X1);
}

DayTwentyTwo();