var fs = require("fs"); // imports fs
console.time('a');

/* Plan 14a
> I can use 100 * (x and y) / and % by the dimensions of the space
> To calculate quadrants I can post-process each robot's x and y to see which value to increment
> I should be able to achieve all this dynamically
*/

function Solution()
{
  let input = fs.readFileSync("14/sample-input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n\n")
    .map(row => row.split("\n"));

  let total = 0;

  input.forEach((row) => {
    total += ProcessClawMachine(row);
  });
  
  console.timeEnd('a');
  console.log(`Day 14a solution: ${total}`);
}

Solution();