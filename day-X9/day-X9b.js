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
  let workflows = [];
  for (let w = 0; w < WorkflowsInput.length; w++)
  {
    let [name, conditions] = WorkflowsInput[w].replace("}", "").split("{");
    workflows.push(new Workflow(name, conditions));
  }

  ProcessCondition("in", 1, 4000, 1, 4000, 1, 4000, 1, 4000, workflows);
}

function ProcessCondition(currentWorkflowName, xl, xu, ml, mu, al, au, sl, su, workflows)
{
  let currentWorkflow = workflows.find(w => w.Name === currentWorkflowName);
  let routesToThisPoint = (xu - xl + 1) * (mu - ml + 1) * (au - al + 1) * (su - sl + 1);

  for (let c = 0; c < currentWorkflow.Conditions.length; c++)
  {
    console.log(currentWorkflow.Conditions[c]);
    let result = currentWorkflow.Conditions[c].Result;
    
    if (c === currentWorkflow.Conditions.length - 1)
    {
      switch(result)
      {
        case "R":
          return;
        case "A":
          console.log(`Accepted amount here ${routesToThisPoint}`);  
          return;
        default:
          ProcessCondition(result, xl, xu, ml, mu, al, au, sl, su, workflows); return;
      }
    }
    else
    {
      let letter = currentWorkflow.Conditions[c].Letter;
      let operator = currentWorkflow.Conditions[c].Operator;
      let value = currentWorkflow.Conditions[c].Value;
      switch (operator)
      {
        case ">":
          switch (letter.toLowerCase())
          {
            case "x":
              switch (result)
              {
                case "R":
                  break;
                case "A":
                  console.log(`Accepted amount here ${routesToThisPoint}`);  
                  break;
                default:
                  ProcessCondition(result, value + 1, xu, ml, mu, al, au, sl, su, workflows); break;
              }
              break;
            case "m":
              switch (result)
              {
                case "R":
                  break;
                case "A":
                  console.log(`Accepted amount here ${routesToThisPoint}`);  
                  break;
                default:
                  ProcessCondition(result, xl, xu, value + 1, mu, al, au, sl, su, workflows); break;
              }
              break;
            case "a":
              switch (result)
              {
                case "R":
                  break;
                case "A":
                  console.log(`Accepted amount here ${routesToThisPoint}`);  
                  break;
                default:
                  ProcessCondition(result, xl, xu, ml, mu, value + 1, au, sl, su, workflows); break;
              }
              break;
            case "s":
              switch (result)
              {
                case "R":
                  break;
                case "A":
                  console.log(`Accepted amount here ${routesToThisPoint}`);  
                  break;
                default:
                  ProcessCondition(result, xl, xu, ml, mu, al, au, value + 1, su, workflows); break;
              }
              break;
            default: console.log("Letter not found"); break;
          }
          break;
        case "<":
          switch (letter.toLowerCase())
          {
            case "x":
              switch (result)
              {
                case "R":
                  break;
                case "A":
                  console.log(`Accepted amount here ${routesToThisPoint}`);  
                  break;
                default:
                  ProcessCondition(result, xl, value - 1, ml, mu, al, au, sl, su, workflows); break;
              }
              break;
            case "m":
              switch (result)
              {
                case "R":
                  break;
                case "A":
                  console.log(`Accepted amount here ${routesToThisPoint}`);  
                  break;
                default:
                  ProcessCondition(result, xl, xu, ml, value - 1, al, au, sl, su, workflows); break;
              }
              break;
            case "a":
              switch (result)
              {
                case "R":
                  break;
                case "A":
                  console.log(`Accepted amount here ${routesToThisPoint}`);   
                  break;
                default:
                  ProcessCondition(result, xl, xu, ml, mu, al, value - 1, sl, su, workflows); break;
              }
              break;
            case "s":
              switch (result)
              {
                case "R":
                  break;
                case "A":
                  console.log(`Accepted amount here ${routesToThisPoint}`);  
                  break;
                default:
                  ProcessCondition(result, xl, xu, ml, mu, al, au, sl, value - 1, workflows); break;
              }
              break;
            default: console.log("Letter not found"); break;
          }
          break;
        default: console.log("No correct operator found"); break;
      }
    }
  }
}

DayNineteenB();