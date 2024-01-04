//day 4
var fs = require("fs"); // imports fs

// parse input for each day into winning numbers + your numbers
// for each day, check each number of winning numbers against your numbers, and keep a tally
// if tally > 0, add to answer 1 * 2 ^ (tally - 1)
// return answer

function DayFour()
{
    // 1) first identify all symbols and mark around them in an array the same size as the input

    let lines = fs.readFileSync("day-4/input-2023-4.txt", "utf-8")
        .replace(/[Card \d*: ]/, "")
        .split("\n")
        .map(line => line.split(" | "));

    // Array is now 2D but individual numbers are not yet separated -> I'll do this next

}

DayFour();