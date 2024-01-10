//day 5a
var fs = require("fs"); // imports fs
const Map = require("./Map.js");

// Solution:
// 1) Parse input into each line
// detect if a line

function DayFive()
{
    // 1) first identify all symbols and mark around them in an array the same size as the input
    let lines = fs.readFileSync("day-5/sample-input-2023-5.txt", "utf-8")
        .replace("\r", "")
        .split("\n")
        .filter(line => line.trim() !== "")

    let seedsListIndex = lines.findIndex(i => i === "seeds:");
    let seedsList = lines[seedsListIndex].split(" ").filter(value => value.trim() !== "seeds:");
    lines.splice(seedsListIndex, 1);

    for (let line = 0; line < lines.length; line++)

    /*for (let line = 0; line < lines.length; line++)
    {
        // seeds List
        seedsList = 
        if (lines[line].startsWith("seeds:"))
        {
            seedsList = lines[line].split(" ").filter(value => value.trim() !== "seeds:");
        }
        else if()
    }*/
 
    console.log(seedsList);
}

DayFive();