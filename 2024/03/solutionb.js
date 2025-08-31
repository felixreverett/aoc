var fs = require("fs"); // imports fs

let input;
const regex = /mul\(\d+,\d+\)/gm;
const doRegex = /do\(\)/;
const dontRegex = /don't\(\).*/gm;

function Solution()
{
  input = fs.readFileSync("03/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .replace(/\n/gm, "")
    .split(doRegex)
    .map(i => i.replace(dontRegex, "").match(regex))
    .flat()
    .map(i => i.replace("mul(", ""))
    .map(i => i.replace(")", ""))
    .map(i => i.split(",").map(j => parseInt(j)))
    .reduce((sum, i) => {
      return sum + (i[0] * i[1]);
    }, 0);

  console.log(input);
}

Solution();