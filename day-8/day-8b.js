//day 8b

var fs = require("fs"); // imports fs
const Map = require("./Map.js");

function DayEight()
{
  // 1. Parsing input
  let lines = fs.readFileSync("day-8/sample-input-2023-8b.txt", "utf-8")
    .split("\n")
    .map(i => i.replace("\r", ""));

  let instructions = lines[0];
  let mapsList = [];

  // 2. Lazily hard-code the line from which I start parsing maps
  for (let line = 2; line < lines.length; line++)
  {
    let sourceAndDestination = lines[line].split(" = ");
    let source = sourceAndDestination[0];
    let destination = sourceAndDestination[1].split(", ").map(i => i.replace("(", "")).map(i => i.replace(")", ""));
    mapsList.push(new Map(source, destination));
  }

  console.log(mapsList);

  // 3. Find all locations starting with "A"
  let locationsList = [];
  for (let l = 0; l < mapsList.length; l++)
  {
    if (mapsList[l].source.endsWith("A"))
    {
      locationsList.push(mapsList[l].source);
    }
  }

  console.log(locationsList); // test

  // 4. for each location, find the next node, then test all to see if they end with Z. Repeat until this is true (add condition to while loop)
  
  let steps = 0;
  let allLocationsFound = false;
  let breakCase = false;
  while (!allLocationsFound && !breakCase)
  {
    for (let i = 0; i < instructions.length; i++)
    {
      steps++;
      let endsWithZCounter = 0;
      console.log(locationsList);
      for (let l = 0; l < locationsList.length; l++)
      {
        let index = mapsList.findIndex(i => i.source === locationsList[l]);
        if (index !== -1)
        {
          if (instructions[i] === "L")
          {
            locationsList[l] = mapsList[index].destination[0];
          }
          else
          {
            locationsList[l] = mapsList[index].destination[1];
          }
        }
        else
        {
          console.log(`You shouldn't be here! ${locationsList[l]} not found in the data!`);
          breakCase = true;
          break;
        }
        if (locationsList[l].endsWith("Z"))
        {
          endsWithZCounter++;
        }
      }

      if (endsWithZCounter === locationsList.length)
      {
        allLocationsFound = true;
      }
    }
  }
  console.log(steps);
}

DayEight();