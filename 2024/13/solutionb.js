var fs = require("fs"); // imports fs
console.time('a');

function Solution()
{
  let input = fs.readFileSync("13/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n\n")
    .map(row => row.split("\n"));

  let total = 0;

  input.forEach((row) => {
    total += ProcessClawMachine(row);
  });
  
  console.timeEnd('a');
  console.log(`Day 13b solution: ${total}`);
}

function ProcessClawMachine(clawMachineString)
{
  let [stringButtonA, stringButtonB, stringPrize] = clawMachineString;
  let [Ax, Ay] = stringButtonA.replace("Button A: X+", "").split(", Y+").map(i => parseInt(i));
  let [Bx, By] = stringButtonB.replace("Button B: X+", "").split(", Y+").map(i => parseInt(i));
  let [Px, Py] = stringPrize.replace("Prize: X=", "").split(", Y=").map(i => parseInt(i) + 10000000000000);

  let det = Ax * By - Bx * Ay;

  if (det === 0)
  {
    return 0; // there is no solution
  }
  
  let A_times_det = (  By * Px - Bx * Py );
  let B_times_det = ( -Ay * Px + Ax * Py );

  if (A_times_det % det !== 0 || B_times_det % det !== 0)
  {
    return 0; // division does not produce an integer solution
  }

  let A = A_times_det / det;
  let B = B_times_det / det;

  return 3*A + B;
}

Solution();