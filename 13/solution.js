var fs = require("fs"); // imports fs
console.time('a');

// Plan (13a):
/*
Button A: X+94, Y+34    a, c
Button B: X+22, Y+67    b, d
Prize: X=8400, Y=5400   e, f

( 94 22 ) (A) = ( 8400 ) 
( 34 67 ) (B) = ( 5400 )

( a b ) (A) = ( e )
( c d ) (B) = ( f )

det := ad-bc

( A ) = 1 / det * ( d -b ) ( e ) = ( ( d / det) * e + (-b / det) * f )
( B ) =           ( -c a ) ( f ) = ( (-c / det) * e + ( a / det) * f )

A = 
*/

function Solution()
{
  let input = fs.readFileSync("13/sample-input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(row => row.split(""));
  
  console.timeEnd('a');
  console.log(`Day 13a solution: `);
}

Solution();