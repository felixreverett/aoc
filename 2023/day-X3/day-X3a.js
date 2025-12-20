// day X3a
// - Data is parsed and separated into Pattern classes, which has become my preference
//   as I continue to develop in JavaScript with an object-oriented approach.
// - The pattern class then processes its own solution on instantiation. It's not the
//   most compact code, but it is easy to follow and helps me debug and improve.

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