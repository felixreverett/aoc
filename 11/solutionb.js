var fs = require("fs"); // imports fs
console.time('a');

let memoisationMap = new Map();

function ComputeBlink(stone, blinks)
{
  if (blinks === 0)
  {
    return 1;
  }
  else if (memoisationMap.has(stone + "b" + blinks))
  {
    return memoisationMap.get(stone + "b" + blinks);
  }

  let count = 0;
  let stringified = String(stone);
  if (stone === 0)
  {
    count = ComputeBlink(1, blinks - 1);
  }
  else if (stringified.length % 2 === 0)
  {
    count = ComputeBlink(parseInt(stringified.slice(0, stringified.length / 2)), blinks - 1) 
          + ComputeBlink(parseInt(stringified.slice(stringified.length / 2)),    blinks - 1);
  }
  else
  {
    count = ComputeBlink(stone * 2024, blinks - 1);
  }

  memoisationMap.set(stone + "b" + blinks, count);

  return count;
}

function Solution()
{
  let stones = fs.readFileSync("11/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split(" ")
    .map(stone => parseInt(stone));
    
  let blinks = 75;

  let count = 0;

  for (let s = 0; s < stones.length; s++)
  {
    count += ComputeBlink(stones[s], blinks);
  }

  console.timeEnd('a');
  console.log(`Day 11b solution: ${count}`);
}

Solution();