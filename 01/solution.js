var fs = require("fs"); // imports fs

let input;
let leftArray = [];
let rightArray = [];
let total = 0;

function Solution()
{
  input = fs.readFileSync("01/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(i => i.replace(/\s+/gm, ","))
    .map(i => i.split(","));

  for (let i = 0; i < input.length; i++)
  {
    leftArray.push(parseInt(input[i][0]));
    rightArray.push(parseInt(input[i][1]));
  }

  leftArray.sort((a, b) => a - b);
  rightArray.sort((a, b) => a - b);

  for (let i = 0; i < input.length; i++)
  {
    total += Math.abs(leftArray[i] - rightArray[i]);
  }

  console.log(total);
}

Solution();