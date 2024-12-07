var fs = require("fs"); // imports fs

let input;
let leftArray = [];
let rightArray = [];
let similarityScore = 0;

function Solution()
{
  input = fs.readFileSync("01/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(i => i.replace(/\s+/gm, ","))
    .map(i => i.split(","));

  // separate out into two arrays
  for (let i = 0; i < input.length; i++)
  {
    let leftValue = parseInt(input[i][0]);
    let rightValue = parseInt(input[i][1]);

    leftArray.push(leftValue);
    
    let rightIndex = rightArray.findIndex(i => i[0] === rightValue);
    if (rightIndex !== -1)
    {
      rightArray[rightIndex][1]++;
    }
    else
    {
      rightArray.push([rightValue, 1]);
    }
  }

  for (let i = 0; i < leftArray.length; i++)
  {
    let rightIndex = rightArray.findIndex(a => a[0] === leftArray[i]);
    if (rightIndex !== -1)
    {
      similarityScore += (leftArray[i] * rightArray[rightIndex][1]);
    }
  }

  console.log(`Your similarity score is ${similarityScore}`);
}

Solution();