/* day XXa
Plan:
- 1. Parse the input into 'conjunction' and 'flip-flop' modules classes with the following properties:
 - string "moduleName"
 - possibly type, although I may use different class types to determine behaviour
 - string[] destinationModules (a list of all modules to send the signal to)
- 2. Iterate through a "pulse" by queueing up the next set of modules and the input they receive
- 3. After every pulse, record the 'state' of the whole system, create a hashmap, and store that to implement memoization
  - If an existing hash is found, a loop in the system is found, meaning we don't need to calculate 1000 pulses
*/

var fs = require("fs"); // imports fs
const Module = require("./Module.js");
const ModulesList = require("./ModulesList.js");

function DayTwenty()
{
  // 1. Parse input
  let parsedInput = fs.readFileSync("day-XX/sample-input-2023-20.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n")
  .map(i => i.split(" -> "));

  let mList = [];
  for (let m = 0; m < parsedInput.length; m++)
  {
    mList.push(new Module(parsedInput[m]));
  }

  let modulesManager = new ModulesList(mList);

  for (let i = 0; i < 5; i++)
  {
    modulesManager.PushButton();
  }
}

DayTwenty();