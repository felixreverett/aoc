// day X8b
// Plan:
// - Parse input into instructions. 
// - Extract correct instructions from hexadecimal codes

var fs = require("fs"); // imports fs
const InstructionB = require("./InstructionB.js");

function DayEighteenB()
{
  // 1. Parse input
  let lines = fs.readFileSync("day-X8/sample-input-2023-18.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n");

  // 1b. Create InstructionsList
  let instructionsList = [];

  // 1c. Turn input into instructions
  for (let line = 0; line < lines.length; line++)
  {
    let currentLine = lines[line].split(" ")[2].replace(/[()#]/gm, "");
    let distance = parseInt(currentLine.substring(0, 5), 16);
    let direction = parseInt(currentLine.substring(5));
          
    instructionsList.push(new InstructionB(distance, direction));
  }
  
  // 1d. Test
  for (let line = 0; line < instructionsList.length; line++)
  {
    console.log(instructionsList[line].distance);
  }

  // 2a. Record coordinates of every vertex to coordinatesList
  let coordinatesList = [];
  
  let currentX = 0; let currentY = 0;

  for (let i = 0; i < instructionsList.length; i++)
  {
    coordinatesList.push([currentX, currentY]);
    switch (instructionsList[i].direction)
    {
      case "L":
        {
          currentX -= instructionsList[i].distance;
          break;
        }
      case "R":
        {
          currentX += instructionsList[i].distance;
          break;
        }
      case "U":
        {
          currentY -= instructionsList[i].distance;
          break;
        }
      case "D":
        {
          currentY += instructionsList[i].distance;
          break;
        }
    }
    
  }

  // 2b. Test
  for (let i = 0; i < coordinatesList.length; i++)
  {
    console.log(`Vertex at ${coordinatesList[i][0]}, ${coordinatesList[i][1]}`);
  }
  
  // 3a. Shoelace formula
  let sum = 0; let n = coordinatesList.length;

  for (let v = 0; v < n - 1; v++)
  {
    let x1 = coordinatesList[v][0]; let y1 = coordinatesList[v][1];
    let x2 = coordinatesList[v + 1][0]; let y2 = coordinatesList[v + 1][1];
    sum += ( x1 * y2 - x2 * y1 );
    console.log(`Multiplying ${x1} by ${y2} and subtracting ${x2} multiplied by ${y1} to give current sum: ${sum}`);
  }

  sum += ( coordinatesList[n - 1][0] * coordinatesList[0][1] - coordinatesList[n - 1][1] * coordinatesList[0][0] );

  let area = Math.abs(sum) / 2;
  console.log(area);
  
}

DayEighteenB();