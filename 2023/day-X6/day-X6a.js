// day X6a
// 

var fs = require("fs"); // imports fs

function DaySixteen()
{
  // 1. Parse input
  let caveMap = fs.readFileSync("day-X6/input-2023-16.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n");

  for (let row = 0; row < caveMap.length; row++)
  {
    console.log(caveMap[row]);
  }

  // 2. Create identically-sized lightMap
  // each index of the caveMap will have a corresponding array in the lightMap, which can have any combo of the 4 symbols
  // ^ v < >
  let lightMap = [];
  for (let row = 0; row < caveMap.length; row++)
  {
    let currentRow = [];
    for (let col = 0; col < caveMap[row].length; col++)
    {
      currentRow.push([]);
    }
    lightMap.push(currentRow);
  }
  
  // 3. Fill in lightmap
  lightMap = GuideLight(0, 0, ">", caveMap, lightMap);

  // 4. See output
  let energisedAmount = 0;

  for (let row = 0; row < lightMap.length; row++)
  {
    let currentRow = "";
    for (let col = 0; col < lightMap[row].length; col++)
    {
      if (lightMap[row][col].length > 0)
      {
        currentRow += "#";
        energisedAmount++;
      }
      else
      {
        currentRow += ".";
      }
    }
    console.log(currentRow);
  }

  console.log(`Day 16a solution: ${energisedAmount}`);

}

function GuideLight(x, y, direction, caveMap, lightMap)
{
  if (x < 0 || y < 0 || x >= caveMap.length || y >= caveMap[0].length)
  {
    console.log(`Out of bounds found in direction ${direction} Ending this path`);
    return lightMap;
  }
  else if (lightMap[y][x].includes(direction))
  {
    console.log(`This direction (${direction}) has already been investigated. Ending this path`);
    return lightMap;
  }
  else
  {
    lightMap[y][x].push(direction);
    console.log(`Adding ${direction} at ${x}, ${y}`);
  }

  let obstacle = caveMap[y][x];

  switch (direction)
  {
    case "^":
      if (obstacle === "." || obstacle === "|")
      {
        return GuideLight(x, y - 1, "^", caveMap, lightMap);
      }
      else if (obstacle === "-")
      {
        lightMap = GuideLight(x - 1, y, "<", caveMap, lightMap);
        return GuideLight(x + 1, y, ">", caveMap, lightMap);
      }
      else if (obstacle === "/")
      {
        return GuideLight(x + 1, y, ">", caveMap, lightMap);
      }
      else if (obstacle === "\\")
      {
        return GuideLight(x - 1, y, "<", caveMap, lightMap);
      }
      break;

    case ">":
      if (obstacle === "." || obstacle === "-")
      {
        return GuideLight(x + 1, y, ">", caveMap, lightMap);
      }
      else if (obstacle === "|")
      {
        lightMap = GuideLight(x, y - 1, "^", caveMap, lightMap);
        return GuideLight(x, y + 1, "v", caveMap, lightMap);
      }
      else if (obstacle === "/")
      {
        return GuideLight(x, y - 1, "^", caveMap, lightMap);
      }
      else if (obstacle === "\\")
      {
        return GuideLight(x, y + 1, "v", caveMap, lightMap);
      }
      break;

    case "v":
      if (obstacle === "." || obstacle === "|")
      {
        return GuideLight(x, y + 1, "v", caveMap, lightMap);
      }
      else if (obstacle === "-")
      {
        lightMap = GuideLight(x - 1, y, "<", caveMap, lightMap);
        return GuideLight(x + 1, y, ">", caveMap, lightMap);
      }
      else if (obstacle === "/")
      {
        return GuideLight(x - 1, y, "<", caveMap, lightMap);
      }
      else if (obstacle === "\\")
      {
        return GuideLight(x + 1, y, ">", caveMap, lightMap);
      }
      break;
                
    case "<":
      if (obstacle === "." || obstacle === "-")
      {
        return GuideLight(x - 1, y, "<", caveMap, lightMap);
      }
      else if (obstacle === "|")
      {
        lightMap = GuideLight(x, y - 1, "^", caveMap, lightMap);
        return GuideLight(x, y + 1, "v", caveMap, lightMap);
      }
      else if (obstacle === "/")
      {
        return GuideLight(x, y + 1, "v", caveMap, lightMap);
      }
      else if (obstacle === "\\")
      {
        return GuideLight(x, y - 1, "^", caveMap, lightMap);
      }
      break;
  }

  console.log("Found an endpoint (out of bounds)");
  return lightMap;

}

DaySixteen();