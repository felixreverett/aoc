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
  let [WorkflowsInput, PartsInput] = fs.readFileSync("day-X9/input-2023-19.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n\n")
  .map(i => i.split("\n"));

  //console.log(WorkflowsInput);
  //console.log(PartsInput);

  // 2. Create list of Workflows
  let Workflows = [];
  for (let w = 0; w < WorkflowsInput.length; w++)
  {
    let [name, conditions] = WorkflowsInput[w].replace("}", "").split("{");
    Workflows.push(new Workflow(name, conditions));
  }

  /* console.log(Workflows);
  for (let c = 0 ; c < Workflows.length; c++)
  {
    console.log(Workflows[c]);
  }*/

  // 3. Create list of Parts
  let Parts = [];
  for (let p = 0; p < PartsInput.length; p++)
  {
    let [x, m, a, s] = PartsInput[p].replace("{", "").replace("x=", "").replace("m=", "").replace("a=", "").replace("s=", "").replace("}", "").split(",");
    Parts.push(new Part(x, m, a, s));
  }

  //console.log(Parts);

  // 4. Iterate through each part and assign whether that part was Accepted or Rejected
  for (let p = 0; p < Parts.length; p++)
  {
    let isAccepted = FindResultOfWorkflow("in", Parts[p], Workflows);
    Parts[p].IsAccepted = isAccepted;
  }
  //console.log(Parts);

  let totalSum = 0;
  for (let p = 0; p < Parts.length; p++)
  {
    if (Parts[p].IsAccepted)
    {
      totalSum += Parts[p].SumOfXMAS;
    }
  }
  console.log(`The total sum of all accepted parts is ${totalSum}`);
}

function FindResultOfWorkflow(workflowName, part, Workflows) //return result of workflow
{
  let currentWorkflow = Workflows.find(w => w.Name === workflowName);
  
  // go through each condition of the workflow
  for (let c = 0; c < currentWorkflow.Conditions.length; c++) // for each condition
  {
    let currentCondition = currentWorkflow.Conditions[c];
    
    // if DefaultCondition is reached
    if (c === currentWorkflow.Conditions.length - 1)
    {
      console.log(`> Current Default Condition Result is ${currentCondition.Result}`);
      switch (currentCondition.Result)
      {
        case "A": { return true; }
        case "R": { return false; }
        default: { return FindResultOfWorkflow(currentCondition.Result, part, Workflows); }
      }
    }

    // if Condition is reached
    else
    {
      let partLetterValue;
      switch (currentCondition.Letter.toLowerCase())
      {
        case "x": partLetterValue = part.X; break;
        case "m": partLetterValue = part.M; break;
        case "a": partLetterValue = part.A; break;
        case "s": partLetterValue = part.S; break;
        default: console.log("No letter found for current condition");
      }

      switch (currentCondition.Operator)
      {
        case ">":
        {
          if (partLetterValue > currentCondition.Value)
          {
            switch (currentCondition.Result)
            {
              case "A": { return true; }
              case "R": { return false; }
              default: { return FindResultOfWorkflow(currentCondition.Result, part, Workflows); }
            }
          }
          else
          {
            break;
          }
        }
        case "<":
        {
          if (partLetterValue < currentCondition.Value)
          {
            switch (currentCondition.Result)
            {
              case "A": { return true; }
              case "R": { return false; }
              default: { return FindResultOfWorkflow(currentCondition.Result, part, Workflows); }
            }
          }
          else
          {
            break;
          }
        }
      }
    }
  }
}

DayNineteen();