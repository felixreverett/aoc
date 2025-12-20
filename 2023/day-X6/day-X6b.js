// day X6b
// 

var fs = require("fs"); // imports fs

function DaySixteen()
{
  // 1. Parse input
  let caveMap = fs.readFileSync("day-X6/input-2023-16.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n");
  
  // 2. Fill in lightmap for every orientation
  let largestEnergisedAmount = 0;

  for (let c = 0; c < caveMap.length; c++)
  {
    let lightMap = CreateEmptyLightMap(caveMap);
    lightMap = GuideLight(c, 0, "v", caveMap, lightMap);
    let energisedAmount = CalculateEnergisedAmount(lightMap);
    if (energisedAmount > largestEnergisedAmount)
    {
      largestEnergisedAmount = energisedAmount;
    }

    lightMap = CreateEmptyLightMap(caveMap);
    lightMap = GuideLight(c, caveMap.length - 1, "^", caveMap, lightMap);
    energisedAmount = CalculateEnergisedAmount(lightMap);
    if (energisedAmount > largestEnergisedAmount)
    {
      largestEnergisedAmount = energisedAmount;
    }
  }

  for (let r = 0; r < caveMap[0].length; r++)
  {
    let lightMap = CreateEmptyLightMap(caveMap);
    lightMap = GuideLight(0, r, ">", caveMap, lightMap);
    let energisedAmount = CalculateEnergisedAmount(lightMap);
    if (energisedAmount > largestEnergisedAmount)
    {
      largestEnergisedAmount = energisedAmount;
    }

    lightMap = CreateEmptyLightMap(caveMap);
    lightMap = GuideLight(caveMap[0].length - 1, r, "<", caveMap, lightMap);
    energisedAmount = CalculateEnergisedAmount(lightMap);
    if (energisedAmount > largestEnergisedAmount)
    {
      largestEnergisedAmount = energisedAmount;
    }
  }

  // 4. See output
  console.log(`The most energised tiles is: ${largestEnergisedAmount}`);
}

function CreateEmptyLightMap(caveMap)
{
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
  return lightMap;
}

function CalculateEnergisedAmount(lightMap)
{
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
    //console.log(currentRow);
  }

  console.log(`lightMap size: ${energisedAmount}`);
  return energisedAmount;
}

function GuideLight(x, y, direction, caveMap, lightMap)
{
  if (x < 0 || y < 0 || x >= caveMap.length || y >= caveMap[0].length)
  {
    //console.log(`Out of bounds found in direction ${direction} Ending this path`);
    return lightMap;
  }
  else if (lightMap[y][x].includes(direction))
  {
    //console.log(`This direction (${direction}) has already been investigated. Ending this path`);
    return lightMap;
  }
  else
  {
    lightMap[y][x].push(direction);
    //console.log(`Adding ${direction} at ${x}, ${y}`);
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

  //console.log("Found an endpoint (out of bounds)");
  return lightMap;

}

DaySixteen();