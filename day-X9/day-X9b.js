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
  let [WorkflowsInput, PartsInput] = fs.readFileSync("day-X9/sample-input-2023-19.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n\n")
  .map(i => i.split("\n"));

  // 2. Create list of Workflows
  let workflows = [];
  for (let w = 0; w < WorkflowsInput.length; w++)
  {
    let [name, conditions] = WorkflowsInput[w].replace("}", "").split("{");
    workflows.push(new Workflow(name, conditions));
  }

  let grandTotal = ProcessCondition("in", 1, 4000, 1, 4000, 1, 4000, 1, 4000, workflows);
  console.log(grandTotal);
}

function ProcessCondition(currentWorkflowName, xl, xu, ml, mu, al, au, sl, su, workflows)
{
  let currentWorkflow = workflows.find(w => w.Name === currentWorkflowName);
  console.log(`New workflow found: ${currentWorkflow.Name}`);
  let routesToThisPoint = (xu - xl + 1) * (mu - ml + 1) * (au - al + 1) * (su - sl + 1);

  let runningTotal = 0;

  for (let c = 0; c < currentWorkflow.Conditions.length; c++)
  {
    let currentCondition = currentWorkflow.Conditions[c];
    let result = currentCondition.Result;

    // Default Condition
    if (c === currentWorkflow.Conditions.length - 1)
    {
      switch(result)
      {
        case "R":
          return runningTotal;
        case "A":
          console.log(`Accepted amount here ${routesToThisPoint}`);
          return runningTotal + routesToThisPoint;  
        default:
          return runningTotal + ProcessCondition(result, xl, xu, ml, mu, al, au, sl, su, workflows);
      }
    }
    
    // Condition
    let letter = currentWorkflow.Conditions[c].Letter;
    let operator = currentWorkflow.Conditions[c].Operator;
    let value = currentWorkflow.Conditions[c].Value;
    let newRanges = getNewRanges(xl, xu, ml, mu, al, au, sl, su, letter, operator, value);

    switch (result)
    {
      case "R":
        break;
      case "A":
        console.log(`Accepted amount here ${routesToThisPoint}`);
        runningTotal += routesToThisPoint;
        break;
      default:
        runningTotal += ProcessCondition(result, ...newRanges, workflows);
        break;
    }
  }
  
  return runningTotal;
}

function getNewRanges(xl, xu, ml, mu, al, au, sl, su, letter, operator, value)
{
  switch (letter.toLowerCase())
  {
    case "x":
      return operator === ">" ? [value + 1, xu, ml, mu, al, au, sl, su] : [xl, value - 1, ml, mu, al, au, sl, su];
    case "m":
      return operator === ">" ? [xl, xu, value + 1, mu, al, au, sl, su] : [xl, xu, ml, value - 1, al, au, sl, su];
    case "a":
      return operator === ">" ? [xl, xu, ml, mu, value + 1, au, sl, su] : [xl, xu, ml, mu, al, value - 1, sl, su];
    case "s":
      return operator === ">" ? [xl, xu, ml, mu, al, au, value + 1, su] : [xl, xu, ml, mu, al, au, sl, value - 1];
    default:
      throw new Error(`Unknown letter: ${letter}`);
  }
}

DayNineteenB();