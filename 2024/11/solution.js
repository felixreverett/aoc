var fs = require("fs"); // imports fs
console.time('a');

function Solution()
{
  let stonesArray = fs.readFileSync("11/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split(" ")
    .map(stone => parseInt(stone));
    
  let blinks = 25;

  for (let b = 0; b < blinks; b++)
  {
    let nextArray = [];
    
    for (let s = 0; s < stonesArray.length; s++)
    {
      let stringified = String(stonesArray[s]);

      if (stonesArray[s] === 0)
      {
        nextArray.push(1);
      }
      else if (stringified.length % 2 === 0)
      {
        nextArray.push(parseInt(stringified.slice(0, stringified.length / 2)));
        nextArray.push(parseInt(stringified.slice(stringified.length / 2)));
      }
      else
      {
        nextArray.push(stonesArray[s] * 2024);
      }
    }
    
    stonesArray = nextArray;
  }
  

  console.timeEnd('a');
  console.log(`Day 11a solution: ${stonesArray.length}`);
}

Solution();