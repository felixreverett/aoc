// day X9a
// Plan:
// - 1. Divide input into Workflows[] and Parts[]
// - 2. Iterate through parts to calculate whether they're accepted or rejected
// - 3. Run a check to sum the XMAS values of all accepted parts

var fs = require("fs"); // imports fs
//const Instruction = require("./Instruction.js");
//const Trench = require("./Trench.js");

function DayNineteen()
{
  // 1. Parse input
  let [WorkFlows, Parts] = fs.readFileSync("day-X9/sample-input-2023-19.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n\n")
  .map(i => i.split("\n"));

  console.log(WorkFlows);


  
}

DayNineteen();