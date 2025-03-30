var fs = require("fs"); // imports fs
console.time('a');

/* Plan 15a
> 
*/

function Solution(mapWidth, mapHeight, seconds)
{
  let input = fs.readFileSync("15/input.txt", "utf-8")
    .replace(/\r/gm, "");

  let solution = 0;
  
  console.timeEnd('a');
  console.log(`Day 15a solution: ${solution}`);
}

Solution();