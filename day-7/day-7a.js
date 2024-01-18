//day 7a

/* Solution Plan:
> Parse input:
  > Create list hands[] of HAND datatype which has the cards, the bid, the type, the rank
  > type:
    > T5K five of a kind
    > T4K four of a kind
    > TFH full house
    > T3K three of a kind
    > T2P two pair
    > T1P one pair
    > THC high card
> Determine every hand's type
> Sort by type, then by rank within that type
> Iterate through hands[] and write output to console
*/
var fs = require("fs"); // imports fs
const Hand = require("./Hand.js");

const T5k = new Type(0);
const 

function DaySix()
{
    let lines = fs.readFileSync("day-6/input-2023-6.txt", "utf-8")
        .replace("\r", "")
        .split("\n");
   
}

DaySeven();