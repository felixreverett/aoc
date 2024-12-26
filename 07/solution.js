var fs = require("fs"); // imports fs

function Solution()
{
  mappedArea = fs.readFileSync("07/sample-input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(line => line.split(""));

  
}

Solution();