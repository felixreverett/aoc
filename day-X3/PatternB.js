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
       this.b;
       this.solution;

       this.smudges;

       if (this.AttemptVerticalSymmetry())
       {
           this.solution = (this.a + 1);
           console.log(this.a);
           console.log(this.solution);
       }

       else if (this.AttemptHorizontalSymmetry())
       {
            this.solution = (this.a + 1) * 100;
            console.log(this.a);
            console.log(this.solution);
       }
       
       else
       {
            throw new console.error("No symmetry found. You shouldn't be here");
       }
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
            this.smudges = 0;

            let b = a + 1; let boundsLimit = Math.min(a, this.numberOfCols - 1 - b);

            // 2. Test every following row for symmetry mirrored at ab
            if(this.RowsMatch(a, b, boundsLimit) && this.smudges === 1)
            {
                this.symmetryType = "vertical";
                this.a = a;
                this.b = b;
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
                console.log(`> Row ${row} is mirrored with ${this.smudges} smudges so far.`); //debug
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
                this.smudges++;
                if (this.smudges > 1)
                {
                    console.log(`>> Opposing values on row ${row} are not symmetrical and multiple smudges found (${this.smudges}). Returning false`); //debug
                    return false;
                }
            }

            else
            {
                console.log(`>> These are the same char: ${this.patternData[row][a - checkAdjacent]} ${this.patternData[row][b + checkAdjacent]}`);
            }
        }

        console.log(`> Full Row is mirrored with ${this.smudges} smudges total. Returning true`); //debug
        return true; // full row is symmetrical along symmetry ab
    }

    AttemptHorizontalSymmetry()
    {
        // 1. Iterate through every ab pair along the leftmost col
        for (let a = 0; a < this.numberOfRows - 1; a++)
        {
            this.smudges = 0;

            let b = a + 1; let boundsLimit = Math.min(a, this.numberOfRows - 1 - b);

            // 2. Test every following col for symmetry mirrored at ab
            if(this.ColumnsMatch(a, b, boundsLimit) && this.smudges === 1)
            {
                this.symmetryType = "horizontal";
                this.a = a;
                this.b = b;
                return true;
            }
        }

        // 3. Return false if no horizontal symmetry is found. This shouldn't happen
        return false;
    }

    ColumnsMatch(a, b, boundsLimit)
    {
        // 1. Iterate through every col from 0 and test if the col is mirrored at ab
        console.log(`Trying a ColumnsMatch at a: ${a}, b: ${b}.`); //debug
        for (let col = 0; col < this.numberOfCols; col++)
        {
            if (this.IsColumnMirrored(boundsLimit, col, a, b))
            {
                console.log(`> Column ${col} is mirrored`); //debug
                // proceed to next col
            }

            else
            {
                // 2. If any col is not mirrored, there is no horizontal symmetry at ab -> return false
                console.log(`> No line of symmetry found on column ${col} at ab = ${a}, ${b}`);
                return false;
            }
        }

        // 3. If all cols are mirrored, there is horizontal symmetry at ab -> return true
        console.log(`All cols at ab ${a}, ${b} are mirrored.`);
        return true;
    }

    IsColumnMirrored(boundsLimit, col, a, b)
    {
        for (let checkAdjacent = 0; checkAdjacent <= boundsLimit; checkAdjacent++)
        {
            if (this.patternData[a - checkAdjacent][col] != this.patternData[b + checkAdjacent][col])
            {
                this.smudges++;
                if (this.smudges > 1)
                {
                    console.log(`>> Opposing values on col ${col} are not symmetrical with ${this.smudges} smudges. Returning false`); //debug
                    return false;
                }
            }

            else
            {
                console.log(`>> These are the same char: ${this.patternData[a - checkAdjacent][col]} ${this.patternData[b + checkAdjacent][col]}`);
            }
        }

        console.log(`> Full Column is mirrored. Returning true`); //debug
        return true; // full col is symmetrical along symmetry ab
    }
}

module.exports = Pattern;