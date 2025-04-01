var fs = require("fs"); // imports fs
console.time('a');

/* Plan 15a
> Break input into warehouse map and instruction set
*/

function FindRobot(x, y)
{
  //
}

function IsInBounds(x, y)
{
  //
}

function ProcessInstruction(map, instruction, x, y)
{
  // Process instruction
  // If x and y are not -1 and @ is at location of x y, use this value
  // Otherwise find @
  if (!(IsInBounds(x, y) && map[x][y] === "@"))
  {
    x, y = FindRobot(map);
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

  let x = -1;
  let y = -1;

  instructions.forEach(instruction => {
    x, y = ProcessInstruction(map, instruction, x, y);
  });

  console.log(map);

  let solution = 0;
  
  console.timeEnd('a');
  console.log(`Day 15a solution: ${solution}`);
}

Solution();