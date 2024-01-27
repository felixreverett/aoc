//day 8b

var fs = require("fs"); // imports fs
const Map = require("./Map.js");

function DayEight()
{
  // 1. Parsing input
  let lines = fs.readFileSync("day-8/input-2023-8.txt", "utf-8")
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

  // 3. Find all locations starting with "A"
  let locationsList = [];
  let locationsCycleLengths = [];

  for (let l = 0; l < mapsList.length; l++)
  {
    if (mapsList[l].source.endsWith("A"))
    {
      locationsList.push(mapsList[l].source);
      locationsCycleLengths.push(0);
    }
  }

  // 4. For every item in the locationsList, find the cycle length. Find the LCM between all values to get the solution.
  
  for (let l = 0; l < locationsList.length; l++)
  {
    let steps = 0;
    let cycleFound = false;
    let breakCase = false;

    while (!cycleFound && !breakCase)
    {
      for (let i = 0; i < instructions.length; i++)
      {
        steps++;
        
        let index = mapsList.findIndex(i => i.source === locationsList[l]);
        
        if (index !== -1)
        {
          //console.log("A new map selected"); //debug
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
          console.log(`You shouldn't be here! ${locationsList[l]} not found in the data!`); //debug
          breakCase = true;
          break;
        }

        if (locationsList[l].endsWith("Z"))
        {
          locationsCycleLengths[l] = steps;
          cycleFound = true;
          break;
        }
      }
    }
  }
  
  console.log(`The solution is the LCM of ${locationsCycleLengths}`);
}

DayEight();