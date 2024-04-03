class Pattern
{
    constructor(identifier, patternData)
    {
       this.identifier = identifier;

       this.patternData = patternData;
       this.numberOfCols = patternData[0].length;
       this.numberOfRows = patternData.length;

       this.symmetryType;
       this.a;
       this.solution;
       this.AttemptVerticalSymmetry();
       
       console.log(this.a);
       console.log(this.solution);
    }

    // attempt vertical symmetry
    // Iterate through row 0 and if two identical cells are found, check the next -1 and +1 within the confines of the row
    // if all conditions are met, check the corresponding cells at row + 1
    // if all conditions are met, your line of symmetry is vertical and you can return the solution
    // otherwise, attempt horizontal symmetry

    // attempt horizontal symmetry

    AttemptVerticalSymmetry()
    {
        // 1. Iterate through every ab pair along the top row
        for (let a = 0; a < this.numberOfCols - 1; a++)
        {
            let b = a + 1; let boundsLimit = Math.min(a, this.numberOfCols - 1 - b);

            // 2. Test every following row for symmetry mirrored at ab
            if(this.RowsMatch(a, b, boundsLimit))
            {
                this.symmetryType = "vertical";
                this.a = a;
                return true;
            }
        }

        // 3. Return false if no vertical symmetry is found
        return false;
    }

    RowsMatch(a, b, boundsLimit)
    {
        // 1. Iterate through every row from 0 and test if the row is mirrored at ab
        console.log(`Trying a RowsMatch at a: ${a}, b: ${b}.`); //debug
        for (let row = 0; row < this.numberOfRows; row++)
        {
            if (this.IsRowMirrored(boundsLimit, row, a, b))
            {
                console.log(`> Row ${row} is mirrored`); //debug
                // proceed to next row
            }

            else
            {
                // 2. If any row is not mirrored, there is no vertical symmetry at ab -> return false
                console.log(`> No line of symmetry found on row ${row} at ab = ${a}, ${b}`);
                return false;
            }
        }

        // 3. If all rows are mirrored, there is vertical symmetry at ab -> return true
        console.log(`All rows at ab ${a}, ${b} are mirrored.`);
        return true;
    }

    IsRowMirrored(boundsLimit, row, a, b)
    {
        for (let checkAdjacent = 0; checkAdjacent <= boundsLimit; checkAdjacent++)
        {
            if (this.patternData[row][a - checkAdjacent] != this.patternData[row][b + checkAdjacent])
            {
                console.log(`>> Opposing values on row ${row} are not symmetrical. Returning false`); //debug
                return false;
            }

            else
            {
                console.log(`>> These are the same char: ${this.patternData[row][a - checkAdjacent]} ${this.patternData[row][b + checkAdjacent]}`);
            }
        }

        console.log(`> Full Row is mirrored. Returning true`); //debug
        return true; // full row is symmetrical along symmetry ab
    }
}

module.exports = Pattern;