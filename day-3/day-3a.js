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
    
    // create validator which will be used to pre-determine if a value is a number
    let validator = new Array(lines.length);
    for (let i = 0; i < lines.length; i++)
    {
        validator[i] = new Array(lines[i].length).fill(0);
    }

    //console.log(validator[0][13]);

    let numberRegex = /[0-9]/;
    for (let row = 0; row < lines.length; row++)
    {
        for (let col = 0; col < lines[row].length; col++)
        {
            if (numberRegex.test(lines[row][col]))
            {
                validator[row][col] = 1;
                //console.log(`Success! This value is a number: ${lines[row][col]}`);
            }
            else
            {
                //console.log(lines[row][col]);
            }
        }
    }

    //console.log(validator[0][13]);

    // Iterate through every validated value and  
}

function DayThree3()
{
    //identify all symbols
    let lines = fs.readFileSync("day-3/input-2023-3.txt", "utf-8").split("\n");
    
    // create validator which will be used to pre-determine if a value is a number
    let validator = new Array(lines.length);
    for (let i = 0; i < lines.length; i++)
    {
        validator[i] = new Array(lines[i].length).fill("."); // mark as . as filler
    }

    let numberRegex = /[^0-9.]/;
    for (let row = 0; row < lines.length; row++)
    {
        for (let col = 0; col < lines[row].length; col++)
        {
            if (numberRegex.test(lines[row][col]))
            {
                console.log("A number has been found");
                validator[row][col] = "S"; // mark as S for Symbol
                // top row
                if (row > 0)
                {
                    if (col > 0)
                    {
                        validator[row-1][col-1] = "V"; // mark as V for Validated
                    }
                    validator[row-1][col] = "V";
                    if (col < lines[row-1].length-1)
                    {
                        validator[row-1][col+1] = "V";
                    }
                }
                // middle row
                if (col > 0)
                {
                    validator[row][col-1] = "V";
                }
                if (col < lines[row].length-1)
                {
                    validator[row][col+1] = "V";
                }
                // bottom row
                if (row < lines.length - 1)
                {
                    if (col > 0)
                    {
                        validator[row + 1][col - 1] = "V";
                    }
                    validator[row + 1][col] = "V";
                    if (col < lines[row - 1].length - 1)
                    {
                        validator[row + 1][col + 1] = "V";
                    }
                }
            }
        }
    }

    // test it
    for (let row = 0; row < validator.length; row++)
    {
        tempRow = "";
        for (let i = 0; i < validator[row].length; i++)
        {
            tempRow += validator[row][i];
        }
        console.log(tempRow);
    }
}

DayThree3();