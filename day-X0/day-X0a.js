//day X0a

var fs = require("fs"); // imports fs

function DayTen()
{
  // 1. Parsing input
  let lines = fs.readFileSync("day-X0/sample-input-2023-10.txt", "utf-8")
    .split("\n")
    .map(i => i.replace("\r", ""))
    .map(i => i.replace(" ", ""))
    .map(i => i.split(""));

  // 2. Map to an array of distances from S
  let distanceArray = [];
  for (let i = 0; i < lines.length; i++)
  {
    let subArray = [];
    for (let j = 0; j < lines[i].length; j++)
    {
      subArray.push("_");
    }
    distanceArray.push(subArray);
  }

  console.log(distanceArray); //debug
  console.log(lines); //debug

  // 3. Find S
  let sIndex = findS(lines);
  console.log(sIndex); //debug

  // 4. Find startpoints
  

  // 5. Iterate through lines from each startpoint, reading values to find next pipe and writing distances to distanceArray
  let endFound = false;
  while (!endFound)
  {
    endFound = true;
    // find the two directions to travel
    // iterate through, one at a time
  }

}

function nextValue(position)
{
  var row; var col;


  
  return [row, col];
}

function findS(lines)
{
  let sIndex = [];
  for (let line = 0; line < lines.length; line++)
  {
    let result = lines[line].indexOf("S");
    if (result !== -1)
    {
      sIndex.push(line); sIndex.push(result);
    }
  }
  return sIndex;
}

DayTen();