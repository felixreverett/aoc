class Pattern
{
    constructor(patternData)
    {
       this.patternData = patternData;
       this.rowLength = patternData[0].length;
       this.colLength = patternData.length;
       this.symmetryType;
       this.solution;
    }

    // attempt vertical symmetry
    // Iterate through row 0 and if two identical cells are found, check the next -1 and +1 within the confines of the row
    // if all conditions are met, check the corresponding cells at row + 1
    // if all conditions are met, your line of symmetry is vertical and you can return the solution
    // otherwise, attempt horizontal symmetry

    // attempt horizontal symmetry

    AttemptVerticalSymmetry()
    {
        let row = 0;

        for (let a = 0; a < this.rowLength -1; a++)
        {
            b = a + 1; let boundsLimit = Math.lower(a, this.rowLength - b);
            this.RowsMatch() // continue here
        }

        for (let a = 0; a < this.rowLength - 1; a++)
        {
            b = a + 1; let boundsLimit = Math.lower(a, this.rowLength - b);

            if (!this.RowMatch(boundsLimit, row, a, b))
            {
                console.log(`Debug: no line of symmetry found on row ${row} at a = ${a}.`);
            }

            else
            {

            }
        }
        
    }

    RowsMatch()
    {
        for (let row = 0; row < this.rowLength; row++)
        {
            if (!this.RowMatch(boundsLimit, row, a, b))
                {
                    console.log(`Debug: no line of symmetry found on row ${row} at a = ${a}.`);
                    return false;
                }

                else
                {

                }
        }
    }

    /*bool*/ RowMatch(/*int*/ boundsLimit, row, a, b)
    {
        for (let CheckAdjacent = 0; checkAdjacent < boundsLimit; checkAdjacent++)
        {
            if (this.patternData[row][a - checkAdjacent] != this.patternData[row][b + checkAdjacent])
            {
                return false;
            }

            else
            {
                console.log(`These are the same char: ${pattern[row][a - checkAdjacent]}, ${pattern[row][b + checkAdjacent]}`);
            }
        }

        return true; // full row is symmetrical along symmetry ab
    }
}

module.exports = Pattern;