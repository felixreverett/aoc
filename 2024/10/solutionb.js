var fs = require("fs"); // imports fs
console.time('a');

// For this day I decided to use a queue rather than recursion (based on issues with recursive pathfinding from AoC 2023)
let topographicMap;
let finalScore = 0;

function IsInBounds(row, col)
{
  return row >= 0 &&
    row < topographicMap.length &&
    col >= 0 &&
    col < topographicMap[row].length;
}

function CalculateScore(row, col)
{
  let queue = [[0, row, col]];
  let score = 0;

  while (queue.length > 0)
  {
    let [value, r, c] = queue.shift();

    if (value === 9) score++;

    else
    {
      if (IsInBounds(r - 1, c) && topographicMap[r - 1][c] === value + 1) queue.push([value + 1, r - 1, c]);
      if (IsInBounds(r, c + 1) && topographicMap[r][c + 1] === value + 1) queue.push([value + 1, r, c + 1]);
      if (IsInBounds(r + 1, c) && topographicMap[r + 1][c] === value + 1) queue.push([value + 1, r + 1, c]);
      if (IsInBounds(r, c - 1) && topographicMap[r][c - 1] === value + 1) queue.push([value + 1, r, c - 1]);
    }
  }
  return score;
}

function Solution()
{
  topographicMap = fs.readFileSync("10/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(row => row.split(""))
    .map(row => row.map(value => parseInt(value)));

  topographicMap.forEach((subArray, row) =>
  {
    subArray.forEach((value, col) =>
    {
      if (value === 0)
      {
        finalScore += CalculateScore(row, col);
      }
    })
  });

  console.timeEnd('a');
  console.log(`Day 10a solution: ${finalScore}`);
}

Solution();