//day 8a

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

  console.log(mapsList);

  let steps = 0;
  let location = "AAA";
  let breakCase = false;
  while (location !== "ZZZ" && !breakCase)
  {
    for (let i = 0; i < instructions.length; i++)
    {
      steps++;

      let index = mapsList.findIndex(i => i.source === location);
      if (index !== -1)
      {
        if (instructions[i] === "L")
        {
          location = mapsList[index].destination[0];
        }
        else
        {
          location = mapsList[index].destination[1];
        }
        
      }
      else
      {
        console.log(`You shouldn't be here! ${location} not found in the data!`);
        breakCase = true;
        break;
      }
    }
  }
  console.log(steps);
}

DayEight();