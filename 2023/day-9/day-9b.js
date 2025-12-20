//day 9a

var fs = require("fs"); // imports fs
const History = require("./History.js");

function DayNine()
{
  // 1. Parsing input
  let lines = fs.readFileSync("day-9/input-2023-9.txt", "utf-8")
    .split("\n")
    .map(i => i.replace("\r", ""));

  let Histories = [];

  for (let line = 0; line < lines.length; line++)
  {
    let sequence = lines[line].split(" ").map(i => parseInt(i)).reverse(); // only change between 9a and 9b
    Histories.push(new History(sequence));
  }

  let total = 0;
  for (let h = 0; h < Histories.length; h++)
  {
    console.log(Histories[h].nextValue);
    total += Histories[h].nextValue;
  }

  console.log(`Day 9b solution is ${total}`);
  
}

DayNine();