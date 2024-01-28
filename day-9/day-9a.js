//day 9a

var fs = require("fs"); // imports fs
const History = require("../day-9/History.js");

function DayNine()
{
  // 1. Parsing input
  let lines = fs.readFileSync("day-9/sample-input-2023-9.txt", "utf-8")
    .split("\n")
    .map(i => i.replace("\r", ""));

  let Histories = [];

  for (let line = 0; line < lines.length; line++)
  {
    let sequence = lines[line].split(" ").map(i => parseInt(i));
    Histories.push(new History(sequence));
  }
  
}

DayNine();