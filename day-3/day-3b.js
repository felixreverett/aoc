//day 3

var fs = require("fs"); // imports fs

function DayThree()
{
    // 1) first identify all symbols and mark around them in an array the same size as the input
    
    let lines = fs.readFileSync("day-3/sample-input-2023-3.txt", "utf-8")
        .replace(/\r/gm, "")
        .split("\n")
        .map(i => i.split(""));

    // create valid gears array "mirror" structure
    let validGearsArray = [];
    
    for (let r = 0; r < lines.length; r++)
    {
        let newRow = [];
        for (let c = 0; c < lines[r].length; c++)
        {
            newRow.push(".");
        }
        validGearsArray.push(newRow);
    }

    // 3) Iterate through Lines to identify all "gears" *
    let numberRegex = /[0-9]/;
    for (let row = 0; row < lines.length; row++)
    {
        for (let col = 0; col < lines[row].length; col++)
        {
            let adjacentNumbers = 0;
            if (lines[row][col] === "*")
            {
                // top row
                if (row > 0) // if there is a row above the gear
                {
                    if (numberRegex.test(lines[row - 1][col]))
                    {
                        adjacentNumbers++;
                    }

                    else
                    {
                        // if there is a col to the left and that value is a number
                        if (col > 0 && numberRegex.test(lines[row - 1][col - 1]))
                        {
                            adjacentNumbers++;
                        }

                        // if there is a col to the right and that value is a number
                        if (col < lines[row - 1].length - 1 && numberRegex.test(lines[row - 1][col + 1]))
                        {
                            adjacentNumbers++;
                        }
                    }
                }

                // middle row (left)
                if (col > 0 && numberRegex.test(lines[row][col - 1]))
                {
                    adjacentNumbers++;
                }

                // middle row (right)
                if (col < lines[row].length - 1 && numberRegex.test(lines[row][col + 1]))
                {
                    adjacentNumbers++;
                }

                // bottom row
                if (row < lines.length - 1)
                {
                    // middle
                    if (numberRegex.test(lines[row + 1][col]))
                    {
                        adjacentNumbers++;
                    }

                    // left and right
                    else
                    {
                        // if there is a col to the left
                        if (col > 0 && numberRegex.test(lines[row + 1][col - 1]))
                        {
                            adjacentNumbers++;
                        }
                        
                        // if there is a col to the right
                        if (col < lines[row - 1].length - 1 && numberRegex.test(lines[row + 1][col + 1]))
                        {
                            adjacentNumbers++;
                        }
                    }
                }

                // Find and multiply the numbers if exactly 2 were found and add to total
                if (adjacentNumbers === 2)
                {
                    validGearsArray[row][col] = "*";
                }
            }
        }
    }

    for (let i = 0; i < validGearsArray.length; i++)
    {
        let row = "";
        for (let j = 0; j < validGearsArray[0].length; j++)
        {
            row += validGearsArray[i][j];
        }
        console.log(row);
    }

    // 4
    let total = 0;
    for (let r = 0; r < validGearsArray.length; r++)
    {
        for (let c = 0; c < validGearsArray[r].length; c++)
        {
            if (validGearsArray[r][c] === "*")
            {
                total += MultiplyAdjacentNumbers(r, c, lines);
            }
        }
    }
}

DayThree();

function MultiplyAdjacentNumbers(r, c, lines)
{
    let numbers = [];
    let numbersFound = 0;
    let numberRegex = /[0-9]/;

    while (numbersFound < 2)
    {
        // NNNNNNN
        // NNN*NNN
        // NNNNNNN
        // look for numbers in row above
        if (r > 0)
        {
            if (c - 2 > 0)
            {
                if (numberRegex.test(lines[r - 1][c - 3]))
                {
                    let currentNumber = lines[r - 1][c - 3];
                    let a = 1;
                    while (numberRegex.test(lines[r - 1][c - 3 + a]))
                    {
                        currentNumber = currentNumber * 10 + lines[r-1][c - 3 + a];
                    }
                }
            }
        }
    }
}