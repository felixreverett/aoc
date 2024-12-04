var fs = require("fs"); // imports fs

let input;
let leftArray = [];
let rightArray = [];
let total = 0;

function Solution()
{
  input = fs.readFileSync("01/sample-input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(i => i.replace(/\s+/gm, ","))
    .map(i => i.split(","));

  // separate out into two arrays
  for (let i = 0; i < input.length; i++)
  {
    leftArray.push(parseInt(input[i][0]));
    let rightValue = parseInt(input[i][1]);
    let rightIndex = rightArray.indexOf(rightValue);
    if (rightArray.some(i => i[0] === rightValue))
    {
      console.log(rightArray.indexOf(rightValue));
      rightArray[rightArray.indexOf(rightValue)][1]++;
    }
    else
    {
      rightArray.push([rightValue, 1]);
    }
  }

  leftArray.sort((a, b) => a - b);
  rightArray.sort((a, b) => a[0] - b[0]);

  console.log(rightArray);

  console.log(leftArray);
}

Solution();