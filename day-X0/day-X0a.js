//day X0a

var fs = require("fs"); // imports fs
const Coord = require("../day-X0/Coord.js");

function DayTen()
{
  // 1. Parsing input
  let lines = fs.readFileSync("day-X0/input-2023-10.txt", "utf-8")
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
  distanceArray[sCoord.row][sCoord.col] = 0;
  console.log(sCoord); //debug

  // 4. Find startpoints
  let pointers = getStartPoints(sCoord, lines);
  console.log(pointers); //debug

  // 5. Iterate through lines from each startpoint, reading values to find next pipe and writing distances to distanceArray
  let endFound = false;
  let distanceFromStart = 0;
  while (!endFound)
  {
    console.log(distanceFromStart);
    distanceFromStart++;
    // find the two directions to travel
    // iterate through, one at a time
    for (let p = 0; p < pointers.length; p++)
    {
      distanceArray[pointers[p].row][pointers[p].col] = distanceFromStart;

      let val = lines[pointers[p].row][pointers[p].col];

      switch(val)
      {
        // F-7
        // |.|
        // L-J
        case "-":
        {
          console.log("found: -");
          if ( !distanceArray[pointers[p].row][pointers[p].col - 1].toString().match(/[\d]/) )
          {
            distanceArray[pointers[p].row][pointers[p].col - 1] = distanceFromStart;
            pointers[p].col -= 1;
          }
          else if ( !distanceArray[pointers[p].row][pointers[p].col + 1].toString().match(/[\d]/) )
          {
            distanceArray[pointers[p].row][pointers[p].col + 1] = distanceFromStart;
            pointers[p].col += 1;
          }
          else
          {
            distanceArray[pointers[p].row][pointers[p].col] = distanceFromStart;
            //console.log(distanceArray); //debug
            endFound = true;
          }
          break;
        }
        case "7":
        {
          console.log("found: 7");
          if ( !distanceArray[pointers[p].row][pointers[p].col - 1].toString().match(/[\d]/) )
          {
            distanceArray[pointers[p].row][pointers[p].col - 1] = distanceFromStart;
            pointers[p].col -= 1;
          }
          else if ( !distanceArray[pointers[p].row + 1][pointers[p].col].toString().match(/[\d]/) )
          {
            distanceArray[pointers[p].row + 1][pointers[p].col] = distanceFromStart;
            pointers[p].row += 1;
          }
          else
          {
            distanceArray[pointers[p].row][pointers[p].col] = distanceFromStart;
            //console.log(distanceArray); //debug
            endFound = true;
          }
          break;
        }
        case "|":
        {
          console.log("found: |");
          if ( !distanceArray[pointers[p].row - 1][pointers[p].col].toString().match(/[\d]/) )
          {
            distanceArray[pointers[p].row - 1][pointers[p].col] = distanceFromStart;
            pointers[p].row -= 1;
          }
          else if ( !distanceArray[pointers[p].row + 1][pointers[p].col].toString().match(/[\d]/) )
          {
            distanceArray[pointers[p].row + 1][pointers[p].col] = distanceFromStart;
            pointers[p].row += 1;
          }
          else
          {
            distanceArray[pointers[p].row][pointers[p].col] = distanceFromStart;
            //console.log(distanceArray); //debug
            endFound = true;
          }
          break;
        }
        case "J":
        {
          console.log("found: J");
          if ( !distanceArray[pointers[p].row - 1][pointers[p].col].toString().match(/[\d]/) )
          {
            distanceArray[pointers[p].row - 1][pointers[p].col] = distanceFromStart;
            pointers[p].row -= 1;
          }
          else if ( !distanceArray[pointers[p].row][pointers[p].col - 1].toString().match(/[\d]/) )
          {
            distanceArray[pointers[p].row][pointers[p].col - 1] = distanceFromStart;
            pointers[p].col -= 1;
          }
          else
          {
            distanceArray[pointers[p].row][pointers[p].col] = distanceFromStart;
            //console.log(distanceArray); //debug
            endFound = true;
          }
          break;
        }
        case "L":
        {
          console.log("found: L");
          if ( !distanceArray[pointers[p].row - 1][pointers[p].col].toString().match(/[\d]/) )
          {
            distanceArray[pointers[p].row - 1][pointers[p].col] = distanceFromStart;
            pointers[p].row -= 1;
          }
          else if ( !distanceArray[pointers[p].row][pointers[p].col + 1].toString().match(/[\d]/) )
          {
            distanceArray[pointers[p].row][pointers[p].col + 1] = distanceFromStart;
            pointers[p].col += 1;
          }
          else
          {
            distanceArray[pointers[p].row][pointers[p].col] = distanceFromStart;
            //console.log(distanceArray); //debug
            endFound = true;
          }
          break;
        }
        case "F":
        {
          console.log("found: F");
          if ( !distanceArray[pointers[p].row][pointers[p].col + 1].toString().match(/[\d]/) )
          {
            distanceArray[pointers[p].row][pointers[p].col + 1] = distanceFromStart;
            pointers[p].col += 1;
          }
          else if ( !distanceArray[pointers[p].row + 1][pointers[p].col].toString().match(/[\d]/) )
          {
            distanceArray[pointers[p].row + 1][pointers[p].col] = distanceFromStart;
            pointers[p].row += 1;
          }
          else
          {
            distanceArray[pointers[p].row][pointers[p].col] = distanceFromStart;
            //console.log(distanceArray); //debug
            endFound = true;
          }
          break;
        }
        default:
        {
          console.log(distanceArray); //debug
          throw new Error(`Error: Value found is not valid (${val})`);
        }
      }
    }
  }
  //console.log(distanceArray); //debug
  for (let i = 0; i < distanceArray.length; i++)
  {
    let row = "";
    for (let j = 0; j < distanceArray[i].length; j++)
    {
      row += `-${distanceArray[i][j]}-`;
    }
    if (row.match(/[\d]/))
    {
      console.log(row);
    }
  }

  //5. Solution
  console.log(`The greatest distance from the start point is: ${distanceFromStart + 1}`);

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
      startPoints.push(new Coord(sCoord.row, sCoord.col - 1))
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