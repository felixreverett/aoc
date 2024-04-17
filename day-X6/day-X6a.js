// day X6a
// 

var fs = require("fs"); // imports fs

function DaySixteen()
{
  // 1. Parse input
  let caveMap = fs.readFileSync("day-X6/sample-input-2023-16.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n");

  // 2. Create identically-sized lightMap
  // each index of the caveMap will have a corresponding array in the lightMap, which can have any combo of the 4 symbols
  // ^ v < >

  let lightMap = GuideLight(0, 0, "Right", caveMap, lightMap);

}

function GuideLight(x, y, direction, caveMap, lightMap)
{
  switch (direction)
  {
    case "Up":
      break;
    case "Right":
      if (x >= caveMap[y].length)
      {
        return lightMap;
      }
      break;
    case "Down": 
      break;
    case "Left":
      break;
  }

}

DaySixteen();