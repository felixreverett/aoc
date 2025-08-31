var fs = require("fs"); // imports fs
console.time('a');

/* Plan (13a):
Button A: X+94, Y+34    Ax Ay
Button B: X+22, Y+67    Bx By
Prize: X=8400, Y=5400   Px Py

( 94 22 ) (A) = ( 8400 ) 
( 34 67 ) (B) = ( 5400 )

( Ax Bx ) (A) = ( Px )
( Ay By ) (B) = ( Py )

det := Ax * By - Bx * Ay

( A ) = 1 / det * ( d -b ) ( e ) = ( ( d / det) * e + (-b / det) * f )
( B ) =           ( -c a ) ( f ) = ( (-c / det) * e + ( a / det) * f )

A = (  By * Px / det ) + ( -Bx * Py / det )
B = ( -Ay * Px / det ) + (  Ax * Py / det )
*/

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
  console.log(`Day 13a solution: ${total}`);
}

function ProcessClawMachine(clawMachineString)
{
  let [stringButtonA, stringButtonB, stringPrize] = clawMachineString;
  let [Ax, Ay] = stringButtonA.replace("Button A: X+", "").split(", Y+").map(i => parseInt(i));
  let [Bx, By] = stringButtonB.replace("Button B: X+", "").split(", Y+").map(i => parseInt(i));
  let [Px, Py] = stringPrize.replace("Prize: X=", "").split(", Y=").map(i => parseInt(i));

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