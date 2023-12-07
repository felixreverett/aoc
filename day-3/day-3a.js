//day 3
var fs = require("fs"); // imports fs

function DayThree()
{
    let data = fs.readFileSync("day-3/input-2023-3.txt", "utf-8").replace(/[^0-9]/g, " ").split(" ");
    let dataNumbers = [];
    let myregex = /\d/;
    for (let i = 0; i < data.length; i++)
    {
        if (myregex.test(data[i]))
        {
            dataNumbers.push(data[i]);
        }
    }
    for (let i = 0; i < dataNumbers.length; i++)
    {
        console.log(dataNumbers[i]);
    }
}

function DayThree2()
{
    let lines = fs.readFileSync("day-3/input-2023-3.txt", "utf-8").split("\n");
    let validator = new Array(lines.length);
    for (let i = 0; i < lines.length; i++)
    {
        validator[i] = new Array(lines[i].length).fill(0);
    }

    console.log(validator[1][1]);

    let numberRegex = /\d/;
    for (let row = 0; row < lines.length; row++)
    {
        for (let col = 0; col < row.length; col++)
        {
            if (numberRegex.test(lines))
            {

            }
        }
    }
}

DayThree2();