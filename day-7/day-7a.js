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

const typeAndCardOrderMap = new Map([
  ["FiveOfAKind",     0],
  ["FourOfAKind",     1],
  ["FullHouse",       2],
  ["ThreeOfAKind",    3],
  ["TwoPairs",        4],
  ["OnePair",         5],
  ["HighCard",        6],
  ["A",   7],
  ["K",   8],
  ["Q",   9],
  ["J",   10],
  ["T",   11],
  ["9",   12],
  ["8",   13],
  ["7",   14],
  ["6",   15],
  ["5",   16],
  ["4",   17],
  ["3",   18],
  ["2",   19],
]);

function DaySeven()
{
  // 1. Parsing input
  let lines = fs.readFileSync("day-7/input-2023-7.txt", "utf-8")
    .split("\n")
    .map(i => i.replace("\r", ""));

  // 2. Creating handsList
  let handsList = [];
  
  for (let l = 0; l < lines.length; l++)
  {
    let splitLine = lines[l].split(" ");
    handsList.push(
      new Hand(splitLine[0].split(""), parseInt(splitLine[1]))
    );
  }
  
  //console.log(handsList);
  
  // 3. sorting handsList
  handsList.sort((a, b) =>
  {
    const compareCards = (cardA, cardB) => {
    const orderA = typeAndCardOrderMap.get(cardA) || 0;
    const orderB = typeAndCardOrderMap.get(cardB) || 0;
    return orderA - orderB;
  };

  for (let i = 0; i < Math.min(a.cards.length, b.cards.length); i++) {
    const result = compareCards(a.cards[i], b.cards[i]);
    if (result !== 0) return result;
  }

  })

  console.log("Post sort:");

  //console.log(handsList);

  // 4. 
  let totalWinnings = 0;
  for (let i = 0; i < handsList.length; i++)
  {
    totalWinnings += (handsList.length - i + 1) * handsList[i].bid;
  }
  console.log(`Total winnings for this hands list: ${totalWinnings}`);
}

DaySeven();