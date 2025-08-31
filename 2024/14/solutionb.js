var fs = require("fs"); // imports fs
console.time('a');

/* Explanation 14b
> I don't normally write these, but this one was a headache to start, and a joy to end.
> Conceptually, two things are happening:
>  1) I am using Chinese Remainder Theorem to find the first 'overlap' of organised robots in both axes.
>  2) I am determining 'organised' robots by finding the pattern with the lowest variance.
> I never visualised my solution, so I trusted in the community advice that CRT can solve this.
> I trusted in myself that I can learn it and implement it successfully. I did because I am unstoppable.
> Here is a more detailed breakdown of the logic flow:
   1) Solution() parses data into a list of "robots" and calls GetMinimumTime()
   2) GetMinimumTime() finds the lowest Column and lowest Row variances, and uses these to calculate the solution
   3) GetTimeOfLowestVariance() finds the lowest Column or Row variances
   4) SimulateSecond() moves all robots along either the Column or Row
   5) FindVariance() returns the variance of the robots array at its given point in time
*/

function SimulateSecond(CorR, robots, width, height)
{
  let modulo = CorR ? width : height;
  let position = CorR ? 0 : 1;
  let velocity = CorR ? 2 : 3;

  let newRobots = robots.map(robot => [...robot]);

  newRobots.forEach((robot) => {
    let newPosition = (robot[position] + robot[velocity]) % modulo;
    robot[position] = newPosition < 0 ? newPosition + modulo : newPosition; 
  });

  return newRobots;
}

function FindVariance(CorR, robots, width, height)
{
  // establish values depending on whether calculating variance for height or width
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

  return variance;
}

function GetTimeOfLowestVariance(CorR, robots, width, height)
{
  let newRobots = robots.map(robot => [...robot]);
  let optimalTime = 0;
  let lowestVariance = FindVariance(CorR, newRobots, width, height); // Compute variance at t = 0

  for (let t = 1; t < (CorR ? width : height); t++)
  {
    newRobots = SimulateSecond(CorR, newRobots, width, height);
    let variance = FindVariance(CorR, newRobots, width, height);
    if (variance < lowestVariance)
    {
      lowestVariance = variance;
      optimalTime = t;
    }
  }
  return optimalTime;
}

function GetMinimumTime(robots, width, height)
{
  let bestC = GetTimeOfLowestVariance(true, robots, width, height);
  
  let bestR = GetTimeOfLowestVariance(false, robots, width, height);

  let W = width;
  let H = height;

  let t = bestC;
  while (t % H !== bestR % H)
  {
    t += W;
  }
  
  return t;
}

function Solution(width, height)
{
  let robots = fs.readFileSync("14/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .replace(/p=/gm, "")
    .replace(/\sv=/gm, ",")
    .split("\n")
    .map(row => row.split(","))
    .map(row => row.map(col => parseInt(col)));

  let solution = GetMinimumTime(robots, width, height);

  console.timeEnd('a');
  console.log(`Solution: ${solution}`);
}

Solution(101, 103);