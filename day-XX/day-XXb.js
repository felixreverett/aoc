// day XXb
var fs = require("fs"); // imports fs
const Module = require("./Module.js");
const ModulesListB = require("./ModulesListB.js");

function DayTwentyB()
{
  // 1. Parse input
  let parsedInput = fs.readFileSync("day-XX/input-2023-20.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n")
  .map(i => i.split(" -> "));

  let mList = [];
  for (let m = 0; m < parsedInput.length; m++)
  {
    mList.push(new Module(parsedInput[m]));
  }

  let modulesManager = new ModulesListB(mList);

  let buttonPresses = 1000000; // it is >600,000

  for (let i = 0; i < buttonPresses; i++)
  {
    modulesManager.PushButton(i);
    if (i % 100000 === 0) { console.log(i); }
    if (modulesManager.LowPulseSentToRX)
    {
      console.log(`A low pulse was sent to RX on press ${i}`);
      break;
    }
  }
  
  let [ totalLow, totalHigh ] = modulesManager.GetTotalLowAndHighPulses();
  let answer = totalLow * totalHigh;

  console.log(`Day 20 part 2 answer: ${answer}`);
}

DayTwentyB();