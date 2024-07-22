//day 3

var fs = require("fs"); // imports fs

function DayThree()
{
    // 1) first identify all symbols and mark around them in an array the same size as the input

    let lines = fs.readFileSync("day-3/input-2023-3.txt", "utf-8").split("\n").filter(line => line.trim() !== "");
    
    // create valid gears array "mirror" structure
    let validGearsArray = new Array(lines.length);
    
    for (let i = 0; i < lines.length; i++)
    {
        validGearsArray[i] = new Array(lines[i].length || 0).fill("."); // mark as . as filler
    }

    let numberRegex = /[0-9]/;
    let total = 0;
    // 3) Iterate through Lines to identify all "gears" *
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
                        if (col < lines[row - 1].length - 1 && numberRegex.test(lines)[row - 1][col + 1])
                        {
                            adjacentNumbers++;
                        }
                    }
                }

                // middle row (left)
                if (col > 0 && numberRegex.test(lines)[row][col - 1])
                {
                    adjacentNumbers++;
                }

                // middle row (right)
                if (col < lines[row].length - 1 && numberRegex.test(lines)[row][col + 1])
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
                        if (col < lines[row - 1].length - 1 && numberRegex.test(lines)[row + 1][col + 1])
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
        console.log(validGearsArray[i]);
    }
}

DayThree();