var fs = require("fs"); // imports fs

let input;
let total = 0;

function Solution()
{
  input = fs.readFileSync("04/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(i => i.split(""));

    for (let row = 1; row < input.length - 1; row++)
    {
      for (let col = 1; col < input[row].length - 1; col++)
      {
        if (input[row][col] === "A")
        {
          let backslash = (input[row - 1][col - 1] === "M" && input[row + 1][col + 1] === "S") || (input[row - 1][col - 1] === "S" && input[row + 1][col + 1] === "M");
          let forwardslash = (input[row - 1][col + 1] === "M" && input[row + 1][col - 1] === "S") || (input[row - 1][col + 1] === "S" && input[row + 1][col - 1] === "M");

          if (backslash && forwardslash)
          {
            total++;
          }
        }
      }
    }

  console.log(total);
}

Solution();