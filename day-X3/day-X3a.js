// day X3a
// 1. Break up input into ConditionRecords
// 2. For each conditionRecord, calculate possible permutations. Do this inside each class instance for (what I consider to be) cleaner code
//    a. For every ?, try a permutation where it is . and try a permutation where it is #
//    b. if the arrangement of #'s is valid in this permutation, increment an existing tally of permutations. Else, don't
// Note: There may be around 250 million calculations required with this solution.

var fs = require("fs"); // imports fs
const Pattern = require("./Pattern.js");

function DayThirteen()
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

  console.log(`Day 13a solution: ${solution}`);

}

DayThirteen();