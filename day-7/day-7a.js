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

const typeMap = new Map([
  ["FiveOfAKind",     0],
  ["FourOfAKind",     1],
  ["FullHouse",       2],
  ["ThreeOfAKind",    3],
  ["TwoPairs",        4],
  ["OnePair",         5],
  ["HighCard",        6],
]);

function DaySeven()
{
  let lines = fs.readFileSync("day-7/sample-input-2023-7.txt", "utf-8")
    .split("\n")
    .map(i => i.replace("\r", ""))

  let handsList = [];
  
  for (let l = 0; l < lines.length; l++)
  {
    let splitLine = lines[l].split(" ");
    handsList.push(
      new Hand(splitLine[0], parseInt(splitLine[1]))
    );
  }
  
  console.log(handsList);
  //let testHand = new Hand("23332", 10);
  
}

DaySeven();