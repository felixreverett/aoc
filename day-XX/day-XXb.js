// day XXb
/*
  we want a single low pulse sent to rx
  This requires dc, rv, vp, cq to all send high pulses to &ns in the same pulse,
  which requires dj, rr, pb, nl to all send low pulses in the same pulse:
    &dc -> ns
      &dj -> dc, ...
        (8 inputs)
    &rv -> ns
      &rr -> rv, ...
        (9 inputs)
    &vp -> ns
      &pb -> vp, ...
        (7 inputs)
    &cq -> ns
      &nl -> cq, ...
        (7 inputs)
    We could calculate how long for a low pulse to be sent to dj, rr, pb, nl separately, and find the LCM,
    But could the solution be more automated, so no matter the modules we can efficiently get the solution?
      Note: community discussions seem to concur on using LCM for the separate modules.
*/
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

  let buttonPresses = 1000000; // it is 229,414,480,926,893

  for (let i = 0; i < buttonPresses; i++)
  {
    modulesManager.PushButton(i);
    if (i % 100000 === 0) { console.log(i); }
    if (modulesManager.LowPulseSentToTarget)
    {
      console.log(`A low pulse was sent to Target on press ${i}`);
      break;
    }
  }
  
  let [ totalLow, totalHigh ] = modulesManager.GetTotalLowAndHighPulses();
  let answer = totalLow * totalHigh;

  console.log(`Day 20 part 2 answer: ${answer}`);
}

DayTwentyB();