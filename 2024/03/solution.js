var fs = require("fs"); // imports fs

let input;
const regex = /mul\(\d+,\d+\)/g;

function Solution()
{
  input = fs.readFileSync("03/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .match(regex)
    .map(i => i.replace("mul(", ""))
    .map(i => i.replace(")", ""))
    .map(i => i.split(",").map(j => parseInt(j)));

  let solution = input.reduce((sum, i) => {
    return sum + (i[0] * i[1]);
  }, 0);

  console.log(solution);
}

Solution();