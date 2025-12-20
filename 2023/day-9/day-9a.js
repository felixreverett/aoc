//day 9a

var fs = require("fs"); // imports fs
const History = require("../day-9/History.js");

function DayNine()
{
  // 1. Parsing input
  let lines = fs.readFileSync("day-9/input-2023-9.txt", "utf-8")
    .split("\n")
    .map(i => i.replace("\r", ""));

  let Histories = [];

  for (let line = 0; line < lines.length; line++)
  {
    let sequence = lines[line].split(" ").map(i => parseInt(i));
    Histories.push(new History(sequence));
  }

  let total = 0;
  for (let h = 0; h < Histories.length; h++)
  {
    console.log(Histories[h].nextValue);
    total += Histories[h].nextValue;
  }

  console.log(`Day 9a solution is ${total}`);
  
}

DayNine();