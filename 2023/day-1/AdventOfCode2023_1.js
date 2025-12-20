//day 1
var fs = require("fs"); // imports fs
var lines = fs.readFileSync("./input-2023-1.txt", "utf-8").split("\r\n");

var totalValue = 0;

for (let i = 0; i < lines.length; i++)
{
    var line = lines[i];
    let regexMatch = line.match(/\d/g);
    var newValue = 0;
    if (regexMatch)
    {
        let firstNum = regexMatch[0];
        //console.log(firstNum);
        let lastNum = regexMatch[regexMatch.length-1];
        //console.log(`last number: ${lastNum}`);
        newValue = firstNum * 10 + lastNum * 1; //cracked hack lastNum * 1
    }
    totalValue += newValue;
}

console.log(totalValue);