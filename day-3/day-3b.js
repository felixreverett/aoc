//day 3
/* Conceptual approach:
> Create identically sized array to my input
> Go through input and check for numbers at each *, keeping a tally
> If 2 adjacent numbers, proceed:
  >  mark this asterisk differently in the new array
*/

var fs = require("fs"); // imports fs

function DayThree()
{
    // 1) first identify all symbols and mark around them in an array the same size as the input

    let lines = fs.readFileSync("day-3/input-2023-3.txt", "utf-8").split("\n").filter(line => line.trim() !== "");
    
    // create validator "mirror" structure
    let validator = new Array(lines.length);
    
    for (let i = 0; i < lines.length; i++)
    {
        validator[i] = new Array(lines[i].length || 0).fill("."); // mark as . as filler
    }

    let numberRegex = /[0-9]/;
    let total = 0;
    // 3) Iterate through Lines to identify "gears" *
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
                        // if the value directly above the gear is a number, there is at most 1 number on the top row
                        adjacentNumbers++;
                    }

                    else
                    {
                        if (col > 0) // if there is a col to the left
                        {
                            if (numberRegex.test(lines[row - 1][col - 1]))
                            {
                                adjacentNumbers++;
                            }
                        }
                        
                        if (col < lines[row - 1].length - 1) // if there is a col to the right
                        {
                            if (numberRegex.test(lines)[row - 1][col + 1])
                            {
                                adjacentNumbers++;
                            }
                        }
                    }
                }

                // middle row
                if (col > 0)
                {
                    if (numberRegex.test(lines)[row][col - 1])
                    {
                        adjacentNumbers++;
                    }
                }

                if (col < lines[row].length - 1)
                {
                    if (numberRegex.test(lines)[row][col + 1])
                    {
                        adjacentNumbers++;
                    }
                }

                // bottom row
                if (row < lines.length - 1)
                {
                    if (numberRegex.test(lines[row + 1][col]))
                    {
                        // if the value directly below the gear is a number, there is at most 1 number on the bottom row
                        adjacentNumbers++;
                    }

                    else
                    {
                        if (col > 0) // if there is a col to the left
                        {
                            if (numberRegex.test(lines[row + 1][col - 1]))
                            {
                                adjacentNumbers++;
                            }
                        }
                        
                        if (col < lines[row - 1].length - 1) // if there is a col to the right
                        {
                            if (numberRegex.test(lines)[row + 1][col + 1])
                            {
                                adjacentNumbers++;
                            }
                        }
                    }
                }

                // Find and multiply the numbers if exactly 2 were found and add to total
                if (adjacentNumbers === 2)
                {
                    numbersToMultiply = []; // should be length 2

                    // top row
                    if (row > 0) // if there is a row above the gear
                    {
                        if (numberRegex.test(lines[row - 1][col]))
                        {
                            // find leftmost connected number and go right
                        }

                        else
                        {
                            if (col > 0) // if there is a col to the left
                            {
                                if (numberRegex.test(lines[row - 1][col - 1]))
                                {
                                    // find leftmost connected number and go right
                                }
                            }
                            
                            if (col < lines[row - 1].length - 1) // if there is a col to the right
                            {
                                if (numberRegex.test(lines)[row - 1][col + 1])
                                {
                                    // find leftmost connected number and go right (probably just go right)
                                }
                            }
                        }
                    }

                    // middle row
                    if (col > 0)
                    {
                        if (numberRegex.test(lines)[row][col - 1])
                        {
                            // find leftmost connected number and go right
                        }
                    }

                    if (col < lines[row].length - 1)
                    {
                        if (numberRegex.test(lines)[row][col + 1])
                        {
                            // find leftmost connected number and go right (go right)
                        }
                    }

                    // bottom row
                    if (row < lines.length - 1)
                    {
                        if (numberRegex.test(lines[row + 1][col]))
                        {
                            // find leftmost connected number and go right
                        }

                        else
                        {
                            if (col > 0) // if there is a col to the left
                            {
                                if (numberRegex.test(lines[row + 1][col - 1]))
                                {
                                    // find leftmost connected number and go right
                                }
                            }
                            
                            if (col < lines[row - 1].length - 1) // if there is a col to the right
                            {
                                if (numberRegex.test(lines)[row + 1][col + 1])
                                {
                                    // find leftmost connected number and go right
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

DayThree();