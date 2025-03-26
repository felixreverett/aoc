var fs = require("fs"); // imports fs
console.time('a');

/* Plan 14a
> I can use 100 * (x and y) / and % by the dimensions of the space
> To calculate quadrants I can post-process each robot's x and y to see which value to increment
> I should be able to achieve all this dynamically
*/

function ProcessRobot(robot, mapWidth, mapHeight, seconds)
{
  let [pCol, pRow, vCol, vRow] = robot;

  let finalRow = (pRow + seconds * vRow ) % mapHeight;
  let adjustedFinalRow = finalRow < 0 ? finalRow + mapHeight : finalRow;
  let finalCol = (pCol + seconds * vCol ) % mapWidth;
  let adjustedFinalCol = finalCol < 0 ? finalCol + mapWidth : finalCol;

  //console.log(`Final position for ${pRow}, ${pCol} is ${finalRow}, ${finalCol}. Adjusted to ${adjustedFinalRow}, ${adjustedFinalCol}.`);

  // calculate quadrant
  if (adjustedFinalRow === Math.floor(mapHeight / 2) || adjustedFinalCol === Math.floor(mapWidth / 2))
  {
    return 4;
  }

  if (adjustedFinalRow < mapHeight / 2)
  {
    if (adjustedFinalCol < mapWidth / 2)
    {
      return 0;
    }
    return 1;
  }
  else
  {
    if (adjustedFinalCol < mapWidth / 2)
    {
      return 3;
    }
    return 2;
  }
}

function Solution(mapWidth, mapHeight, seconds)
{
  let robots = fs.readFileSync("14/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .replace(/p=/gm, "")
    .replace(/\sv=/gm, ",")
    .split("\n")
    .map(row => row.split(","))
    .map(row => row.map(col => parseInt(col)));

  let solution = 0;
  let quadrants = [0, 0, 0, 0, 0] // NW, NE, SE, SW, Centre

  robots.forEach((robot) => {
    quadrant = ProcessRobot(robot, mapWidth, mapHeight, seconds);
    quadrants[quadrant]++;
  });

  solution = quadrants.slice(0, 4).reduce((acc, num) => acc * num, 1);
  
  console.timeEnd('a');
  console.log(`Day 14a solution: ${solution}`);
}

Solution(101, 103, 100);