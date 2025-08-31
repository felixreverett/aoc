var fs = require("fs"); // imports fs

let input;
let total = 0;

function Solution()
{
  input = fs.readFileSync("04/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(i => i.split(""));

    for (let row = 0; row < input.length; row++)
    {
      for (let col = 0; col < input[row].length; col++)
      {
        if (input[row][col] === "X")
        {
          let N = row > 2;
          let E = col < input[row].length - 3;
          let S = row < input.length - 3;
          let W = col > 2;

          if (N && input[row - 1][col] === "M" && input[row - 2][col] === "A" && input[row - 3][col] === "S")
          {
            total++;
          }
          if (N && E && input[row - 1][col + 1] === "M" && input[row - 2][col + 2] === "A" && input[row - 3][col + 3] === "S")
          {
            total++;
          }
          if (E && input[row][col + 1] === "M" && input[row][col + 2] === "A" && input[row][col + 3] === "S")
          {
            total++;
          }
          if (S && E && input[row + 1][col + 1] === "M" && input[row + 2][col + 2] === "A" && input[row + 3][col + 3] === "S")
          {
            total++;
          }
          if (S && input[row + 1][col] === "M" && input[row + 2][col] === "A" && input[row + 3][col] === "S")
          {
            total++;
          }
          if (S && W && input[row + 1][col - 1] === "M" && input[row + 2][col - 2] === "A" && input[row + 3][col - 3] === "S")
          {
            total++;
          }
          if (W && input[row][col - 1] === "M" && input[row][col - 2] === "A" && input[row][col - 3] === "S")
          {
            total++;
          }
          if (N && W && input[row - 1][col - 1] === "M" && input[row - 2][col - 2] === "A" && input[row - 3][col - 3] === "S")
          {
            total++;
          }
        }
      }
    }

  console.log(total);
}

Solution();