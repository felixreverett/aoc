// day X3b
// Functionally the same as 13a, but PatternB.js will run different code to test for exactly 1 mismatch (or "smudge")

var fs = require("fs"); // imports fs
const Pattern = require("./PatternB.js");

function DayThirteenB()
{
  // 1. Separate patterns
  let patterns = fs.readFileSync("day-X3/input-2023-13.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n\n");

  console.log(patterns);

  
  // 2. Create list of Pattern objects
  let patternList = [];

  for (let pat = 0; pat < patterns.length; pat++)
  {
    let newPatternData = patterns[pat].split("\n");

    console.log(newPatternData);
    patternList.push(new Pattern(pat, newPatternData));
  }

  let solution = 0;
  for (let pat = 0; pat < patternList.length; pat++)
  {
    solution += patternList[pat].solution;
  }

  console.log(`Day 13b solution: ${solution}`);

}

DayThirteenB();