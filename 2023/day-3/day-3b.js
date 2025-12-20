//day 3

var fs = require("fs"); // imports fs

function DayThree()
{
    // 1) first identify all symbols and mark around them in an array the same size as the input
    
    let lines = fs.readFileSync("day-3/input-2023-3.txt", "utf-8")
        .replace(/\r/gm, "")
        .split("\n")
        .map(i => i.split(""));

    // create valid gears array "mirror" structure
    let validatorArray = [];
    
    for (let r = 0; r < lines.length; r++)
    {
        let newRow = [];
        for (let c = 0; c < lines[r].length; c++)
        {
            newRow.push(".");
        }
        validatorArray.push(newRow);
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
                    validatorArray[row][col] = "*";
                }
            }
        }
    }

    // 3b) populate each "number" of the validatorArray with
    let currentlyANumber;
    let indicesToUpdate;
    let currentNumber;

    for (let row = 0; row < lines.length; row++)
    {
        currentlyANumber = false;
        indicesToUpdate = [];

        for (let col = 0; col < lines[row].length; col++)
        {
            let numberIsInt = numberRegex.test(lines[row][col]);
            if (numberIsInt)
            {
                // an ongoing number being built
                if (currentlyANumber)
                {
                    currentNumber = currentNumber * 10 + parseInt(lines[row][col]);
                }
                // a new number starting
                else
                {
                    currentNumber = parseInt(lines[row][col]);
                    currentlyANumber = true;
                }
                indicesToUpdate.push([row, col]);
            }

            // if current number is not an int or is the last in the row, and currentlyANumber is true
            // then fill in every indexed cell of validatorArray with that number
            if ((!numberIsInt || col >= lines[row].length - 1) && currentlyANumber)
            {
                for (let i = 0; i < indicesToUpdate.length; i++)
                {
                    validatorArray[indicesToUpdate[i][0]][indicesToUpdate[i][1]] = currentNumber;
                }
                currentlyANumber = false;
                indicesToUpdate = [];
            }
        }
    }

    // 4
    let total = 0;
    for (let r = 0; r < validatorArray.length; r++)
    {
        for (let c = 0; c < validatorArray[r].length; c++)
        {
            if (validatorArray[r][c] === "*")
            {
                total += MultiplyAdjacentNumbers(r, c, lines, validatorArray);
            }
        }
    }

    console.log(`The grand total for day 3b is: ${total}`);
}

DayThree();

function MultiplyAdjacentNumbers(r, c, lines, validatorArray)
{
    let numberRegex = /[0-9]/;
    let surroundingCells = [];
    for (let i = 0; i < 3; i ++)
    {
        surroundingCells.push([".",".","."]);
    }

    // test the surrounding cells to find the numbers
    for (let adjr = 0; adjr < surroundingCells.length; adjr++)
    {
        for (let adjc = 0; adjc < surroundingCells[adjr].length; adjc++)
        {
            if (numberRegex.test(lines[r - 1 + adjr][c - 1 + adjc]))
            {
                surroundingCells[adjr][adjc] = "N";
            }
        }
    }

    // multiply numbers based on patterns
    let foundNumbers = [];
    for (let adjr = 0; adjr < surroundingCells.length; adjr++)
    {
        let currentRow = surroundingCells[adjr].join("");
        switch (currentRow)
        {
            case "...":
            {
                break;
            }
            case "NNN":
            case "NN.":
            case "N..":
            case "N*.":
            {
                let newNumber = validatorArray[r + adjr - 1][c - 1];
                foundNumbers.push(newNumber);
                break;
            }
            case ".NN":
            case "..N":
            case ".*N":
            {
                let newNumber = validatorArray[r + adjr - 1][c + 1];
                foundNumbers.push(newNumber);
                break;
            }
            case "N.N":
            case "N*N":
            {
                let newNumber = validatorArray[r + adjr - 1][c - 1];
                foundNumbers.push(newNumber);
                newNumber = validatorArray[r + adjr - 1][c + 1];
                foundNumbers.push(newNumber);
                break;
            }
            case ".N.":
            {
                let newNumber = validatorArray[r + adjr - 1][c];
                foundNumbers.push(newNumber);
            }
            default:
            {
                console.log(`error: you didn't account for this case ${currentRow}`);
                break;
            }
        }
    }
    console.log("These are the found numbers:");
    console.log(foundNumbers);
    return foundNumbers[0] * foundNumbers[1];
}