// day X2a
// 1. Break up input into ConditionRecords
// 2. For each conditionRecord, calculate possible permutations. Do this inside each class instance for (what I consider to be) cleaner code

var fs = require("fs"); // imports fs
const ConditionRecord = require("./ConditionRecord.js");

function DayTwelve()
{
  // 1. Parsing input
  let records = fs.readFileSync("day-X2/sample-input-2023-12.txt", "utf-8")
    .split("\n")
    .map(i => i.replace("\r", ""));

  let conditionRecordList = [];
 
  for (let r = 0; r < records.length; r++)
  {
    let currentRecord = records[r].split(" ");
    let condition = currentRecord[0];
    let contiguousGroups = currentRecord[1].split(",").map(i => parseInt(i));
    conditionRecordList.push(new ConditionRecord(condition, contiguousGroups));
  }

  console.log(conditionRecordList[0]);
}

DayTwelve();