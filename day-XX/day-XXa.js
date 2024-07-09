// day XXa
// Plan:
// - 1. parse the input into conjunction and flip-flop modules
//   - "moduleName", type, and list of destination modules

var fs = require("fs"); // imports fs

function DayTwenty()
{
  // 1. Parse input
  let [WorkflowsInput, PartsInput] = fs.readFileSync("day-X9/input-2023-19.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n\n")
  .map(i => i.split("\n"));

  
}

DayTwenty();