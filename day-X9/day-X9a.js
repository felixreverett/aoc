// day X9a
// Plan:
// - 1. Divide input into Workflows[] and Parts[]
// - 2. Iterate through parts to calculate whether they're accepted or rejected
// - 3. Run a check to sum the XMAS values of all accepted parts

var fs = require("fs"); // imports fs
const Workflow = require("./Workflow.js");
const Part = require("./Part.js");
const Condition = require("./Condition.js");

function DayNineteen()
{
  // 1. Parse input
  let [WorkflowsInput, PartsInput] = fs.readFileSync("day-X9/sample-input-2023-19.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n\n")
  .map(i => i.split("\n"));

  console.log(WorkflowsInput);
  console.log(PartsInput);

  // 2. Create list of Workflows
  let Workflows = [];
  for (let w = 0; w < WorkflowsInput.length; w++)
  {
    let [name, conditions] = WorkflowsInput[w].replace("}", "").split("{");
    Workflows.push(new Workflow(name, conditions));
  }

  console.log(Workflows);

  // 3. Create list of Parts
  let Parts = [];
  for (let p = 0; p < PartsInput.length; p++)
  {
    let [x, m, a, s] = PartsInput[p].replace("{", "").replace("x=", "").replace("m=", "").replace("a=", "").replace("s=", "").replace("}", "").split(",");
    Parts.push(new Part(x, m, a, s));
  }

  console.log(Parts);

  
}

DayNineteen();