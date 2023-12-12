//day 3
var fs = require("fs"); // imports fs

function DayThree()
{
    // 1) first identify all symbols and mark around them in an array the same size as the input

    let lines = fs.readFileSync("day-3/input-2023-3.txt", "utf-8").split("\n").filter(line => line.trim() !== "");
    
    // create validator which will be used to pre-determine if a value is a number
    let validator = new Array(lines.length);
    for (let i = 0; i < lines.length; i++)
    {
        validator[i] = new Array(lines[i].length || 0).fill("."); // mark as . as filler
    }

    let numberRegex = /[^0-9.]/;
    for (let row = 0; row < lines.length; row++)
    {
        for (let col = 0; col < lines[row].length; col++)
        {
            if (numberRegex.test(lines[row][col]) && lines[row][col] !== "\r") // this \r was breaking everything!
            {
                // top row
                if (row > 0)
                {
                    if (col > 0)
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

    // test it
    /*
    for (let row = 0; row < validator.length; row++)
    {
        tempRow = "";
        for (let i = 0; i < validator[row].length; i++)
        {
            tempRow += validator[row][i];
        }
        console.log(`Row ${row}: ${tempRow}`);
    }*/

    // pass through again. Find valid numbers and add to string separated by spaces.
    let validator2 = new Array(lines.length);
    for (let i = 0; i < lines.length; i++)
    {
        validator2[i] = new Array(lines[i].length || 0).fill("."); // mark as . as filler
    }

    let numberRegex2 = /[0-9]/;
    for (let row = 0; row < lines.length; row++)
    {
        for (let col = 0; col < lines[row].length; col++)
        {
            // if it's a number and it's a valid number (adjacent to a symbol)
            if (numberRegex2.test(lines[row][col]) && validator[row][col] === "V")
            {
                validator2[row][col] = "N";
            
                let lookLeft = col;
                while (lookLeft > 0 && numberRegex2.test(lines[row][lookLeft - 1]))
                {
                    validator2[row][lookLeft - 1] = "N";
                    lookLeft--;
                }

                let lookRight = col;
                while (lookRight < lines[row].length - 1 && numberRegex2.test(lines[row][lookRight + 1]))
                {
                    validator2[row][lookRight + 1] = "N";
                    lookRight++;
                }
            }
        }
    }

    // test it again
    /*
    for (let row = 0; row < validator2.length; row++)
    {
        tempRow = "";
        for (let i = 0; i < validator2[row].length; i++)
        {
            tempRow += validator2[row][i];
        }
        console.log(`Row ${row}: ${tempRow}`);
    }*/

    // prepare number string of all valid inputs
    let numberString = "";

    for (let row = 0; row < lines.length; row++)
    {
        for (let col = 0; col < lines[row].length; col++)
        {
            if (validator2[row][col] === "N")
            {
                numberString += lines[row][col];
            }
            else if (numberString[numberString.length- 1] !== ",")
            {
                numberString += ",";
            }
        }
    }

    //test
    console.log(numberString);

    let arrayOfFinalNumbers = numberString.split(",").filter(str => str !== ""); // filter out empty strings (does nothing)

    let finalTotal = 0;
    for (let x = 0; x < arrayOfFinalNumbers.length; x++)
    {
        let parsedNumber = parseInt(arrayOfFinalNumbers[x], 10);
        if (!isNaN(parsedNumber))
        {
            finalTotal = finalTotal + parsedNumber;
        }
        if (x < 10)
        {
            console.log(`first 10 values: ${arrayOfFinalNumbers[x]}`);
        }
        //console.log(`Total: ${finalTotal}, number: ${arrayOfFinalNumbers[x]}`);
    }
    console.log(`Your final total is ${finalTotal}`);
}

DayThree();