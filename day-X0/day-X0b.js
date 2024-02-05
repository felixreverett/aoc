// day X0b
// Start with day A solution
// Instead of calculating distances, simply record a unique char for the outlines of the mirrorArray

var fs = require("fs"); // imports fs
const Coord = require("./Coord.js");

function DayTen()
{
  // 1. Parsing input
  let lines = fs.readFileSync("day-X0/input-2023-10.txt", "utf-8")
    .split("\n")
    .map(i => i.replace("\r", ""))
    .map(i => i.replace(" ", ""))
    .map(i => i.split(""));

  // 2. Create a mirror array of the loop starting at S
  let mirrorArray = getMirrorArray(lines);

  // 3. Find S
  let sCoord = findS(lines);
  mirrorArray[sCoord.row][sCoord.col] = "S"; // this is kinda broken rn

  // 4. Find startpoints
  let pointers = getStartPoints(sCoord, lines);

  // 5. Iterate through lines from each startpoint, reading values to find next pipe and writing X to mirrorArray
  let endFound = false;
  while (!endFound)
  {
    // find the two directions to travel
    // iterate through, one at a time
    for (let p = 0; p < pointers.length; p++)
    {
      //mirrorArray[pointers[p].row][pointers[p].col] = "X";

      let val = lines[pointers[p].row][pointers[p].col];

      switch(val)
      {
        // F-7
        // |.|
        // L-J
        case "-": // ═
        {
          console.log("found: -");
          mirrorArray[pointers[p].row][pointers[p].col] = "═";

          if ( mirrorArray[pointers[p].row][pointers[p].col - 1] === "_" )
          {
            pointers[p].col -= 1;
          }
          else if ( mirrorArray[pointers[p].row][pointers[p].col + 1] === "_" )
          {
            pointers[p].col += 1;
          }
          else
          {
            console.log("End found at -");
            endFound = true;
          }
          break;
        }
        case "7": // ╗
        {
          console.log("found: 7");
          mirrorArray[pointers[p].row][pointers[p].col] = "╗";

          if ( mirrorArray[pointers[p].row][pointers[p].col - 1] === "_" )
          {
            pointers[p].col -= 1;
          }
          else if ( mirrorArray[pointers[p].row + 1][pointers[p].col] === "_" )
          {
            pointers[p].row += 1;
          }
          else
          {
            console.log("End found at 7");
            endFound = true;
          }
          break;
        }
        case "|": // ║
        {
          console.log("found: |");
          mirrorArray[pointers[p].row][pointers[p].col] = "║";
          
          if ( mirrorArray[pointers[p].row - 1][pointers[p].col] === "_" )
          {
            pointers[p].row -= 1;
          }
          else if ( mirrorArray[pointers[p].row + 1][pointers[p].col] === "_" )
          {
            pointers[p].row += 1;
          }
          else
          {
            console.log("End found at |");
            endFound = true;
          }
          break;
        }
        case "J": // ╝
        {
          console.log("found: J");
          mirrorArray[pointers[p].row][pointers[p].col] = "╝";

          if ( mirrorArray[pointers[p].row - 1][pointers[p].col] === "_" )
          {
            pointers[p].row -= 1;
          }
          else if ( mirrorArray[pointers[p].row][pointers[p].col - 1] === "_" )
          {
            pointers[p].col -= 1;
          }
          else
          {
            console.log("End found at J");
            endFound = true;
          }
          break;
        }
        case "L": // ╚
        {
          console.log("found: L");
          mirrorArray[pointers[p].row][pointers[p].col] = "╚";

          if ( mirrorArray[pointers[p].row - 1][pointers[p].col] === "_" )
          {
            pointers[p].row -= 1;
          }
          else if ( mirrorArray[pointers[p].row][pointers[p].col + 1] === "_" )
          {
            pointers[p].col += 1;
          }
          else
          {
            console.log("End found at L");
            endFound = true;
          }
          break;
        }
        case "F": // ╔
        {
          console.log("found: F");
          mirrorArray[pointers[p].row][pointers[p].col] = "╔";

          if ( mirrorArray[pointers[p].row][pointers[p].col + 1] === "_" )
          {
            pointers[p].col += 1;
          }
          else if ( mirrorArray[pointers[p].row + 1][pointers[p].col] === "_" )
          {
            pointers[p].row += 1;
          }
          else
          {
            console.log("End found at F");
            endFound = true;
          }
          break;
        }
        default:
        {
          console.log(mirrorArray); //debug
          throw new Error(`Error: Value found is not valid (${val})`);
        }
      }
    }
  }

  // 6. Prepare a new array for easier processing. I could probably do 6 and 7 in one step but this approach is more human-readable and I'm here to learn.
  let newMirrorArray = [];
  for (let i = 0; i < mirrorArray.length; i++)
  {
    let row = [];
    for (let j = 0; j < mirrorArray[i].length; j++)
    {
      row.push(mirrorArray[i][j]);
    }
    newMirrorArray.push(row);
  }

  // 7. Solution
  let area = 0; let insideLoop = false; let lastVertical;

  for (let r = 1; r < newMirrorArray.length - 1; r++)
  {
    lastVertical = "None"; // use this to determine whether a "loop switch" has happened

    for (let c = 0; c < newMirrorArray[r].length; c++)
    {
      let currentValue = newMirrorArray[r][c];
      
      switch (currentValue)
      {
        case "╔":
        {
          lastVertical = "╔";
        }
        case "╝":
        {
          if (lastVertical === "╔")
          {
            insideLoop = !insideLoop;
          }

          lastVertical = "╝";
        }
        case "╚":
        {
          lastVertical = "╚";
        }
        case "╗":
        {
          if (lastVertical === "╚")
          {
            insideLoop = !insideLoop;
          }

          lastVertical = "╗";
        }
        case "║":
        {
          insideLoop = !insideLoop;
          lastVertical = "║";
        }
        default:
        {
          break;
        }
      }

      if (insideLoop && currentValue === "_")
      {
        area++;
        newMirrorArray[r][c] = "O";
      }
    }

    insideLoop = false;
  }

  console.log(`The total area within the loop is ${area}.`);

  for (let i = 0; i < newMirrorArray.length; i++)
  {
    let row = "";
    for (let j = 0; j <newMirrorArray[i].length; j++)
    {
      row += newMirrorArray[i][j];
    }
    console.log(row);
  }

  console.log(`The total area within the loop is ${area}.`);
  

}

function getMirrorArray(lines)
{
  let mirrorArray = [];
  for (let i = 0; i < lines.length; i++)
  {
    let subArray = [];
    for (let j = 0; j < lines[i].length; j++)
    {
      subArray.push("_");
    }
    mirrorArray.push(subArray);
  }
  return mirrorArray;
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