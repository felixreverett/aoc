//day 4a
var fs = require("fs"); // imports fs

function DayFour()
{
    // 1) first identify all symbols and mark around them in an array the same size as the input
    let lines = fs.readFileSync("day-4/input-2023-4.txt", "utf-8")
        .replace(/Card \d*: /g, "")
        .split("\r\n")
        .filter(line => line.trim() !== "")
        .map(line => line.split(" | "));

    // 2) Array is now 2D but individual numbers are not yet separated -> I'll do this next
    var newLines = [];
    for (let line = 0; line < lines.length; line++) {
        newLines[line] = [];
        newLines[line][0] = lines[line][0].split(" ").filter(i => i !== "");
        newLines[line][1] = lines[line][1] ? lines[line][1].split(" ") : [];
    }

    // 3) Calculate score
    let totalPoints = 0;

    for (let line = 0; line < newLines.length; line++)
    {
        let tally = 0;
        
        for (let j = 0; j < newLines[line][0].length; j++)
            {
                if (newLines[line][1].includes(newLines[line][0][j]))
                {
                    tally++;
                }
            }

        if (tally > 0)
        {
            totalPoints += 2 ** (tally - 1)
        }
        
        console.log(`Line: ${line} | Matches: ${tally} | Running total of ${totalPoints}.`)
    }

    console.log(`Final total: ${totalPoints}`);
}

DayFour();