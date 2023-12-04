//day 1 part 2
var fs = require("fs"); // imports fs
var lines = fs.readFileSync("./sample-input-2023-1.txt", "utf-8").split("\n");

var totalValue = 0;

for (let i = 0; i < lines.length; i++)
{
    var line = lines[i];
    let regexMatch = line.match(/\d|one|two|three|four|five|six|seven|eight|nine/g);
    if (regexMatch)
    {
        let firstNum = regexMatch[0].replace("one", "1").replace("two", "2").replace("three", "3").replace("four", "4").replace("five", "5").replace("six", "6").replace("seven", "7").replace("eight", "8").replace("nine", "9");
        console.log(firstNum);
        let lastNum = regexMatch[regexMatch.length-1].replace("one", "1").replace("two", "2").replace("three", "3").replace("four", "4").replace("five", "5").replace("six", "6").replace("seven", "7").replace("eight", "8").replace("nine", "9");
        console.log(`last number: ${lastNum}`);
        totalValue += parseInt(firstNum) * 10 + parseInt(lastNum);
    }
}

console.log(totalValue);