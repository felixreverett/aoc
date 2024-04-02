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
        for (let a = 0; a < rowLength -1; a++)
        {
            b = a + 1;
            if (patternData[row][a] == patternData[row][b]) // if a and b could reflect, check all adjacents on that row
            {
                let adjacentLimit = Math.lower(a, rowLength - b); // only check within confines of
                for (let checkAdjacent = 1; checkAdjacent < adjacentLimit; checkAdjacent++)
                {
                    if (patternData[row][a - checkAdjacent] != patternData[row][b + checkAdjacent])
                    {
                        break;
                    }

                    else
                    {

                    }
                }
            }
        }
    }
}

module.exports = Pattern;