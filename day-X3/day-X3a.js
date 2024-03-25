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

  // 2. Create object for each pattern
  let patternList = [];
  for (let p = 0; p < patterns.length; p++)
  {
    let patterndata = [];
    for (let r = 0; r < patterns[p].length; r++)
    {
      let row = patterns[p][r].split("");
      patterndata.push(row);
    }

    let newPattern = new Pattern(patterndata);

    patternList.push(newPattern);
  }

}

DayThirteen();