//day 3
/* Conceptual approach:
> Create identically sized array to input
> Go through input and check for numbers at each *, keeping a tally
> If 2 adjacent numbers, proceed:
  >  mark this asterisk differently in the new array
*/

var fs = require("fs"); // imports fs

function DayThree()
{
    // 1) first identify all symbols and mark around them in an array the same size as the input

    let lines = fs.readFileSync("day-3/input-2023-3.txt", "utf-8").split("\n").filter(line => line.trim() !== "");
    
    // create validator which will be used to pre-determine if a value is a number
    let validator = new Array(lines.length);
    let numberRegex = /[0-9]/;
    for (let i = 0; i < lines.length; i++)
    {
        validator[i] = new Array(lines[i].length || 0).fill("."); // mark as . as filler
    }

    for (let row = 0; row < lines.length; row++)
    {
        for (let col = 0; col < lines[row].length; col++)
        {
            let adjacentNumberTotal = 0;
            let indicesToAdjust = []; // record every row-col that has been changed in case the adjacent number total exceeds 2
            if (lines[row][col] === "*")
            {
                // top row
                if (row > 0) // if there is a row above
                {
                    let middleOfRowIsNumber = false;
                    if (numberRegex.test(lines[row - 1][col])) // if directly above is number
                    {
                        validator[row - 1][col] = "N";
                        middleOfRowIsNumber = true;
                        adjacentNumberTotal++;
                    }

                    if (col > 0) // if there is a col to the left
                    {
                        validator[row - 1][col - 1] = "V"; // mark as V for Validated (adjacent to a Symbol)
                    }
                    validator[row-1][col] = "V";
                    if (col < lines[row - 1].length - 1)
                    {
                        validator[row - 1][col + 1] = "V";
                    }
                }
                // middle row
                if (col > 0)
                {
                    validator[row][col - 1] = "V";
                }
                if (col < lines[row].length - 1)
                {
                    validator[row][col + 1] = "V";
                }
                // bottom row
                if (row < lines.length - 1)
                {
                    if (col > 0)
                    {
                        validator[row + 1][col - 1] = "V";
                    }
                    validator[row + 1][col] = "V";
                    if (col < lines[row + 1].length - 1)
                    {
                        validator[row + 1][col + 1] = "V";
                    }
                }
            }
        }
    }
}

DayThree();