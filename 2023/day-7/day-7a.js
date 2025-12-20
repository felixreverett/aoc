//day 7a

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

  // 4. 
  let totalWinnings = 0;

  for (let i = 0; i < handsList.length; i++)
  {
    totalWinnings = totalWinnings + ((1000 - i) * handsList[i].bid);
    //console.log(`Hand: ${i + 1} | cards: ${handsList[i].cards} | bid ${handsList[i].bid} * ${1000 - i} | total: ${totalWinnings}`);
  }
  console.log(`Total winnings for this hands list: ${totalWinnings}`);
}

DaySeven();