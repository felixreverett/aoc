//day X0a

var fs = require("fs"); // imports fs
const Coord = require("../day-X0/Coord.js");

function DayTen()
{
  // 1. Parsing input
  let lines = fs.readFileSync("day-X0/sample-input-2023-10.txt", "utf-8")
    .split("\n")
    .map(i => i.replace("\r", ""))
    .map(i => i.replace(" ", ""))
    .map(i => i.split(""));

  // 2. Map to an array of distances from S
  let distanceArray = [];
  for (let i = 0; i < lines.length; i++)
  {
    let subArray = [];
    for (let j = 0; j < lines[i].length; j++)
    {
      subArray.push("_");
    }
    distanceArray.push(subArray);
  }

  console.log(distanceArray); //debug
  console.log(lines); //debug

  // 3. Find S
  let sCoord = findS(lines);
  console.log(sCoord); //debug

  // 4. Find startpoints
  let startPoints = getStartPoints(sCoord, lines);
  console.log(startPoints); //debug

  // 5. Iterate through lines from each startpoint, reading values to find next pipe and writing distances to distanceArray
  let endFound = false;
  let distanceFromStart = 0;
  while (!endFound)
  {
    distanceFromStart++;
    endFound = true;
    // find the two directions to travel
    // iterate through, one at a time
    for (let sp = 0; sp < startPoints.length; sp++)
    {
      let val = lines[startPoints[sp].row][startPoints[sp].col];
      switch(val)
      {
        // F-7
        // |.|
        // L-J
        case "-":
        {

        }
        case "7":
        {

        }
        case "|":
        {

        }
        case "J":
        {

        }
        case "L":
        {

        }
        case "F":
        {

        }
        default:
        {
          throw new Error(`Error: Value found is not valid (${val})`);
        }
      }
    }
  }

}

function nextValue(position)
{
  var row; var col;


  
  return [row, col];
}

function getStartPoints(sCoord, lines)
{
  let startPoints = [];

  // 4a. look North
  if ( sCoord.row > 0 )
  {
    if ( lines[sCoord.row-1][sCoord.col].match(/[|F7]/) )
    {
      startPoints.push(new Coord(sCoord.row - 1, sCoord.col));
    }
  }
  // 4b. look East
  if ( sCoord.col <= lines[sCoord.row].length )
  {
    if ( lines[sCoord.row][sCoord.col + 1].match(/[-J7]/) )
    {
      startPoints.push(new Coord(sCoord.row, sCoord.col + 1));
    }
  }
  // 4c. look South
  if ( sCoord.row <= lines.length )
  {
    if ( lines[sCoord.row + 1][sCoord.col].match(/[|LJ]/))
    {
      startPoints.push(new Coord(sCoord.row + 1, sCoord.col));
    }
  }
  // 4d. look West
  if ( sCoord.col > 0 )
  {
    if ( lines[sCoord.row][sCoord.col - 1].match(/[-LF]/))
    {
      startPoints.push(new Coord(sCoords.row, sCoords.col - 1))
    }
  }

  return startPoints;
}

function findS(lines) //returns Coord
{
  for (let line = 0; line < lines.length; line++)
  {
    let result = lines[line].indexOf("S");
    if (result !== -1)
    {
      return new Coord(line, result);
    }
  }
  throw new Error("Error: No S found in the input data");
}

DayTen();