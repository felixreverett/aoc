// day X9b
// Plan:
// - 1. Do a "branch" approach:
//   - Find all possible routes between "in" and "R" or "A"
//   - (We can assume all routes end at "R" or "A")
//   - A route like in{s<1351:px,qqz} would have:
//     - qx:  x: 1-1351,    m/a/s: 1-4k
//     - qqz: x: 1352-4000, m/a/s: 1-4k
//   - Importantly, the sample size decreases with each Workflow reached.
//   - It makes sense to use lower and upper limits of XMAS as arguments of each iteration of the function:
//     - Signature: fn(condition, xl, xu, ml, mu, al, au, sl, su)
//   - Once a Workflow reaches "A" or "R" it can calculate the number of ways this could be reached using the xmas limits.

var fs = require("fs"); // imports fs
const Workflow = require("./Workflow.js");

function DayNineteenB()
{
  // 1. Parse input
  let [WorkflowsInput, PartsInput] = fs.readFileSync("day-X9/input-2023-19.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n\n")
  .map(i => i.split("\n"));

  // 2. Create list of Workflows
  let Workflows = [];
  for (let w = 0; w < WorkflowsInput.length; w++)
  {
    let [name, conditions] = WorkflowsInput[w].replace("}", "").split("{");
    Workflows.push(new Workflow(name, conditions));
  }

}

DayNineteenB();