var fs = require("fs"); // imports fs
console.time('a');

/* Plan 14b
> Chinese Remainder Theorem
*/

function SimulateSecond(CorR, robots, modulo)
{
  let position = CorR ? 0 : 1;
  let velocity = CorR ? 2 : 3;

  let newRobots = robots.map(robot => [...robot]);

  newRobots.forEach((robot) => {
    let newPosition = (robot[position] + robot[velocity]) % modulo;
    robot[position] = newPosition < 0 ? newPosition + modulo : newPosition; 
  });

  return newRobots;
}

function FindMinimumVariance(CorR, robots, width, height)
{
  let multiplier = CorR ? height : width;
  let scale = CorR ? 0 : 1;
  let offset = CorR ? 1 : 0;
  let sequence = [];

  robots.forEach((robot) =>
  {
    sequence.push(robot[scale] * multiplier + robot[offset]);
  });

  sequence.sort((a, b) => a - b);

  // calculate variance
  let n = sequence.length;
  let sum = sequence.reduce((acc, val) => acc + val, 0);
  let sumSquares = sequence.reduce((acc, val) => acc + val * val, 0);

  let mean = sum / n;
  let variance = (sumSquares / n) - (mean * mean);

  //console.log("Sequence:", sequence);
  console.log("Variance:", variance);

  return variance;
}

function NewSolution(robots, width, height)
{
  // calculate min variance for columns
  let lowestVariantSeconds;
  let lowestVariance = Infinity;

  for (let i = 0; i < width; i ++)
  {
    robots = SimulateSecond(true, robots, width, height);
    let variance = FindMinimumVariance(true, robots, width, height);
    if (variance < lowestVariance)
    {
      lowestVariance = variance;
      lowestVariantSeconds = i;
    }
  }
  console.log(lowestVariantSeconds);

  // calculate min variance for rows
  let lowestVariantSeconds2;
  let lowestVariance2 = Infinity;

  for (let i = 0; i < height; i ++)
  {
    robots = SimulateSecond(false, robots, width, height);
    let variance = FindMinimumVariance(false, robots, width, height);
    if (variance < lowestVariance2)
    {
      lowestVariance2 = variance;
      lowestVariantSeconds2 = i;
    }
  }
  console.log(lowestVariantSeconds2);

}

function SolutionB(mapWidth, mapHeight, seconds)
{
  let robots = fs.readFileSync("14/sample-input.txt", "utf-8")
    .replace(/\r/gm, "")
    .replace(/p=/gm, "")
    .replace(/\sv=/gm, ",")
    .split("\n")
    .map(row => row.split(","))
    .map(row => row.map(col => parseInt(col)));

  NewSolution(robots, 11, 7);
  
  console.timeEnd('a');
  //console.log(`Day 14a solution: ${solution}`);
  // 94785600 too low
}

SolutionB(101, 103, 100);