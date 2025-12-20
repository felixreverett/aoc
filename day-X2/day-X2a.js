// day X2a
// 1. Break up input into ConditionRecords
// 2. For each conditionRecord, calculate possible permutations. Do this inside each class instance for (what I consider to be) cleaner code
//    a. For every ?, try a permutation where it is . and try a permutation where it is #
//    b. if the arrangement of #'s is valid in this permutation, increment an existing tally of permutations. Else, don't
// Note: There may be around 250 million calculations required with this solution.

var fs = require("fs"); // imports fs
const ConditionRecord = require("./ConditionRecord.js");

function DayTwelve()
{
  // 1. Parsing input
  let records = fs.readFileSync("day-X2/input-2023-12.txt", "utf-8")
    .split("\n")
    .map(i => i.replace("\r", ""));

  let conditionRecordList = [];
 
  for (let r = 0; r < records.length; r++)
  {
    let currentRecord = records[r].split(" ");
    let condition = currentRecord[0];
    let contiguousGroups = currentRecord[1].split(",").map(i => parseInt(i));
    console.log(`Calculating: ${r + 1}/${records.length}`);
    conditionRecordList.push(new ConditionRecord(condition, contiguousGroups));
  }

  let sumOfArrangements = 0;
  for (let r = 0; r < conditionRecordList.length; r++)
  {
    sumOfArrangements += conditionRecordList[r].totalArrangements;
  }
  console.log(`The total sum of total arrangements (and solution) is: ${sumOfArrangements}`);

}

DayTwelve();