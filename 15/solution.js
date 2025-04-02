var fs = require("fs"); // imports fs
console.time('a');

/* Plan 15a
> Break input into warehouse map and instruction set
*/

function FindRobot(map)
{
  for (let row = 0; row < map.length; row++)
  {
    for (let col = 0; col < map[row].length; col++)
    {
      if (map[row][col] === "@")
      {
        return row, col
      }
    }
  }
  console.error("No robot found in map.");
}

function IsInBounds(row, col, map)
{
  if (row < 0 || row > map.length || col < 0 || col > map[row].length)
  {
    return false;
  }
  return true;
}

function ProcessInstruction(map, instruction, x, y)
{
  // Process instruction
  // If x and y are not -1 and @ is at location of x y, use this value
  // Otherwise find @
  if (!IsInBounds(row, col) || map[row][col] === "@")
  {
    row, col = FindRobot(map);
  }
  
  let offset = [];
  switch (instruction) {
    case "^":
      offset = [-1, 0];
      break;
    case ">":
      offset = [0, 1];
      break;
    case "v":
      offset = [1, 0];
      break;
    case "<":
      offset = [0, -1];
      break;
    default:
      console.error("instruction type not found.");
  }
}

function Solution()
{
  let mapAndInstructions = fs.readFileSync("15/sample-input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n\n");

  let map = mapAndInstructions[0].split("\n").map(i => i.split(""));
  let instructions = mapAndInstructions[1].replace(/\n/gm, "").split("");

  let row = -1;
  let col = -1;

  instructions.forEach(instruction => {
    row, col = ProcessInstruction(map, instruction, row, col);
  });

  console.log(map);

  let solution = 0;
  
  console.timeEnd('a');
  console.log(`Day 15a solution: ${solution}`);
}

Solution();