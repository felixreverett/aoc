var fs = require("fs"); // imports fs
console.time('a');

// Plan (13a):
// 

function Solution()
{
  let input = fs.readFileSync("13/sample-input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(row => row.split(""));
  
  console.timeEnd('a');
  console.log(`Day 13a solution: `);
}

Solution();