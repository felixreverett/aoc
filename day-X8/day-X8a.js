// day X8a
// Plan:
// - Parse input into instructions. I'm going to OOP the heck out of this solution.
// - Each 'instruction' will have a Direction, Scale, Color
// - I will then create 

var fs = require("fs"); // imports fs
const Instruction = require("./Instruction.js");
const Trench = require("./Trench.js");

function DayEighteen()
{
  // 1. Parse input
  let lines = fs.readFileSync("day-X8/sample-input-2023-18.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n");

  let instructionsList = [];

  // 2. Turn input into Instructions
  for (let line = 0; line < lines.length; line++)
  {
    let direction, scale, length;
    [direction, scale, length] = lines[line].replace(/[()#]/gm, "").split(" ");
    instructionsList.push(new Instruction(direction, parseInt(scale), length));
  }

  // 2b. Test
  for (let i = 0; i < instructionsList.length; i++)
  {
    console.log(`Instruction ${i}:`);
    console.log(instructionsList[i].direction);
    console.log(instructionsList[i].scale);
    console.log(instructionsList[i].color);
  }

  // 3. Find required dimensions of trench "array"
  let leftMost = 0; let rightMost = 0; let upMost = 0; let downMost = 0;
  let currentX = 0; let currentY = 0;
  for (let i = 0; i < instructionsList.length; i++)
  {
    console.log(`The current direction is ${instructionsList[i].direction} and the scale is ${instructionsList[i].scale}`);
    switch (instructionsList[i].direction)
    {
      case "L":
        {
          currentX -= instructionsList[i].scale;
          if (currentX < leftMost) {leftMost = currentX}
          break;
        }
      case "R":
        {
          currentX += instructionsList[i].scale;
          if (currentX > rightMost) {rightMost = currentX}
          break;
        }
      case "U":
        {
          currentY -= instructionsList[i].scale;
          if (currentY < upMost) {upMost = currentY}
          break;
        }
      case "D":
        {
          currentY += instructionsList[i].scale;
          if (currentY > downMost) {downMost = currentY}
          break;
        }
    }
  }

  // 3b. Test
  console.log(`The leftMost value was ${leftMost}`);
  console.log(`The rightMost value was ${rightMost}`);
  console.log(`The upMost value was ${upMost}`);
  console.log(`The downMost value was ${downMost}`);

  // 4. Create the trench array
  let numberOfRows = rightMost - leftMost + 1;
  let numberOfColumns = downMost - upMost + 1;
  let trench = new Trench(numberOfRows, numberOfColumns, instructionsList);
  trench.InitialiseTrench();  

  // 4b. Test
  trench.Print();

  // 5. Fill in the trench array edges using the instructions
  let trenchX = 0 - leftMost; // we want to imagine our start to be 0,0, so we need to offset the actual value by leftMost and upMost
  let trenchY = 0 - upMost;
  trench.Dig(trenchX, trenchY, instructionsList);
  trench.Print();  

  // 6. Fill in middle of trench array
  trench.Fill();
  trench.Print();
}

DayEighteen();