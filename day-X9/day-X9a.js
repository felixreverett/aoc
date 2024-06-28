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

  // 4. Iterate through each part.
  for (let p = 0; p < Parts.length; p++)
  {
    let endOfWorkflowFound = false; let nextWorkflowName = "in";
    // go through each workflow
    console.log(`Processing Part ${p}...`); //debug 1
    while (!endOfWorkflowFound)
    {
      let currentWorkflow = Workflows.find(w => w.Name === nextWorkflowName);
      
      // go through each condition of the workflow
      for (let c = 0; c < currentWorkflow.Conditions.length; c++) // for each condition
      {
        console.log(`> Checking workflow "${nextWorkflowName}" condition "${c}" for Part ${p}: ${currentWorkflow.Conditions[c].Letter} must be ${currentWorkflow.Conditions[c].Operator} than ${currentWorkflow.Conditions[c].Value}`); //debug 3
        let currentCondition = currentWorkflow.Conditions[c];
        // if DefaultCondition is reached
        if (c === currentWorkflow.Conditions.length - 1)
        {
          console.log(`> > Default condition found for condition ${c}`);
          switch (currentCondition.Result)
          {
            case "R": { Parts[p].IsAccepted = false; console.log("case reached"); break; }
            case "A": { Parts[p].IsAccepted = true; console.log("case reached"); break; }
            default: { nextWorkflowName = currentCondition.Result; break; }
          }
          endOfWorkflowFound = true;
        }
        // applicable code for all other Conditions { Letter, Operator, Value, Result }
        else
        {
          console.log("> > > Else case");
          switch (currentCondition.Operator)
          {
            case ">":
            {
              console.log(`> > > The Operator for condition ${c} was ${currentCondition.Operator}. Letter is ${currentCondition.Letter}`);
              switch (currentCondition.Letter.toLowerCase())
              {
                case "x":
                {
                  console.log(`> > > > The letter was ${currentCondition.Letter}`);
                  if (Parts[p].X > currentCondition.Value)
                  {
                    // operate on result
                    switch (currentCondition.Result)
                    {
                      case "R": { Parts[p].IsAccepted = false; endOfWorkflowFound = true; console.log("case reached"); break; }
                      case "A": { Parts[p].IsAccepted = true; endOfWorkflowFound = true; console.log("case reached"); break; }
                      default: { nextWorkflowName = currentCondition.Result; break; }
                    }
                  }
                  break;
                }
                case "m":
                {
                  console.log(`> > > > The letter was ${currentCondition.Letter}`);
                  if (Parts[p].M > currentCondition.Value)
                  {
                    // operate on result
                    switch (currentCondition.Result)
                    {
                      case "R": { Parts[p].IsAccepted = false; endOfWorkflowFound = true; console.log("case reached"); break; }
                      case "A": { Parts[p].IsAccepted = true; endOfWorkflowFound = true; console.log("case reached"); break; }
                      default: { nextWorkflowName = currentCondition.Result; break; }
                    }
                  }
                  break;
                }
                case "a":
                {
                  console.log(`> > > > The letter was ${currentCondition.Letter}`);
                  if (Parts[p].A > currentCondition.Value)
                  {
                    // operate on result
                    switch (currentCondition.Result)
                    {
                      case "R": { Parts[p].IsAccepted = false; endOfWorkflowFound = true; console.log("case reached"); break; }
                      case "A": { Parts[p].IsAccepted = true; endOfWorkflowFound = true; console.log("case reached"); break; }
                      default: { nextWorkflowName = currentCondition.Result; break; }
                    }
                  }
                  break;
                }
                case "s":
                {
                  console.log(`> > > > The letter was ${currentCondition.Letter}`);
                  if (Parts[p].S > currentCondition.Value)
                  {
                    // operate on result
                    switch (currentCondition.Result)
                    {
                      case "R": { Parts[p].IsAccepted = false; endOfWorkflowFound = true; console.log("case reached"); break; }
                      case "A": { Parts[p].IsAccepted = true; endOfWorkflowFound = true; console.log("case reached"); break; }
                      default: { nextWorkflowName = currentCondition.Result; break; }
                    }
                  }
                  break;
                }
              }
            }
            case "<":
            {
              console.log(`> > > The Operator for condition ${c} was ${currentCondition.Operator}. Letter is ${currentCondition.Letter}`);
              switch (currentCondition.Letter)
              {
                case "x":
                {
                  console.log(`> > > > The letter was ${currentCondition.Letter}`);
                  if (Parts[p].X < currentCondition.Value)
                    {
                      // operate on result
                      switch (currentCondition.Result)
                      {
                        case "R": { Parts[p].IsAccepted = false; endOfWorkflowFound = true; console.log("case reached"); break; }
                        case "A": { Parts[p].IsAccepted = true; endOfWorkflowFound = true; console.log("case reached"); break; }
                        default: { nextWorkflowName = currentCondition.Result; break; }
                      }
                    }
                  break;
                }
                case "m":
                {
                  console.log(`> > > > The letter was ${currentCondition.Letter}`);
                  if (Parts[p].M < currentCondition.Value)
                    {
                      // operate on result
                      switch (currentCondition.Result)
                      {
                        case "R": { Parts[p].IsAccepted = false; endOfWorkflowFound = true; console.log("case reached"); break; }
                        case "A": { Parts[p].IsAccepted = true; endOfWorkflowFound = true; console.log("case reached"); break; }
                        default: { nextWorkflowName = currentCondition.Result; break; }
                      }
                    }
                  break;
                }
                case "a":
                {
                  console.log(`> > > > The letter was ${currentCondition.Letter}`);
                  if (Parts[p].A < currentCondition.Value)
                    {
                      // operate on result
                      switch (currentCondition.Result)
                      {
                        case "R": { Parts[p].IsAccepted = false; endOfWorkflowFound = true; console.log("case reached"); break; }
                        case "A": { Parts[p].IsAccepted = true; endOfWorkflowFound = true; console.log("case reached"); break; }
                        default: { nextWorkflowName = currentCondition.Result; break; }
                      }
                    }
                  break;
                }
                case "s":
                {
                  console.log(`> > > > The letter was ${currentCondition.Letter}`);
                  if (Parts[p].S < currentCondition.Value)
                    {
                      // operate on result
                      switch (currentCondition.Result)
                      {
                        case "R": { Parts[p].IsAccepted = false; endOfWorkflowFound = true; console.log("case reached"); break; }
                        case "A": { Parts[p].IsAccepted = true; endOfWorkflowFound = true; console.log("case reached"); break; }
                        default: { nextWorkflowName = currentCondition.Result; break; }
                      }
                    }
                  break;
                }
              }
            }
          }
        }

      }
    }
  }
  console.log(Parts);
  
}

DayNineteen();