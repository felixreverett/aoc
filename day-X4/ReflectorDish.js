class ReflectorDish
{
    constructor(reflectorDish)
    {
       this.reflectorDish = reflectorDish;
       this.rows = reflectorDish.length;
       this.columns = reflectorDish[0].length;
    }

    TiltNorth()
    {
        let newReflectorDish = this.MakeNewReflectorDish();

        let lowestRockRow = this.MakeLowestRockRow("North");

        for (let r = 0; r < this.rows; r++)
        {
            for (let c = 0; c < this.columns; c++)
            {
                if (this.reflectorDish[r][c] === "O")
                {
                    newReflectorDish[lowestRockRow[c]][c] = "O";
                    lowestRockRow[c] += 1;
                }

                else if (this.reflectorDish[r][c] === "#")
                {
                    newReflectorDish[r][c] = "#";
                    lowestRockRow[c] = r + 1;
                }
            }
        }

        this.reflectorDish = newReflectorDish;
    }

    TiltEast()
    {
        let newReflectorDish = this.MakeNewReflectorDish();

        let lowestRockRow = this.MakeLowestRockRow("East");

        for (let c = this.columns; c >= 0; c--)
        {
            for (let r = 0; r < this.rows; r++)
            {
                if (this.reflectorDish[r][c] === "O")
                {
                    newReflectorDish[r][lowestRockRow[r]] = "O";
                    lowestRockRow[r] -= 1;
                }

                else if (this.reflectorDish[r][c] === "#")
                {
                    newReflectorDish[r][c] = "#";
                    lowestRockRow[r] = c - 1;
                }
            }
        }

        this.reflectorDish = newReflectorDish;
    }

    TiltSouth()
    {
        let newReflectorDish = this.MakeNewReflectorDish();

        let lowestRockRow = this.MakeLowestRockRow("South");

        for (let r = this.rows - 1; r >= 0; r--)
        {
            for (let c = 0; c < this.columns; c++)
            {
                if (this.reflectorDish[r][c] === "O")
                {
                    newReflectorDish[lowestRockRow[c]][c] = "O";
                    lowestRockRow[c] -= 1;
                }

                else if (this.reflectorDish[r][c] === "#")
                {
                    newReflectorDish[r][c] = "#";
                    lowestRockRow[c] = r - 1;
                }
            }
        }

        this.reflectorDish = newReflectorDish;   
    }

    TiltWest()
    {
        let newReflectorDish = this.MakeNewReflectorDish();

        let lowestRockRow = this.MakeLowestRockRow("West");

        for (let c = 0; c < this.columns; c++)
        {
            for (let r = 0; r < this.rows; r++)
            {
                if (this.reflectorDish[r][c] === "O")
                {
                    newReflectorDish[r][lowestRockRow[r]] = "O";
                    lowestRockRow[r] += 1;
                }

                else if (this.reflectorDish[r][c] === "#")
                {
                    newReflectorDish[r][c] = "#";
                    lowestRockRow[r] = c + 1;
                }
            }
        }

        this.reflectorDish = newReflectorDish;
    }

    CountLoad()
    {
        let solution = 0;

        for (let r = 0; r < this.rows; r++)
        {
            for (let c = 0; c < this.columns; c++)
            {
                if (this.reflectorDish[r][c] === "O")
                {
                    solution += (this.rows - r);
                }
            }
        }
        console.log(`The total load on the Reflector Dish is: ${solution}`);
    }

    MakeNewReflectorDish()
    {
        let newReflectorDish = [];
        for (let r = 0; r < this.rows; r++)
        {
            let row = [];
            for (let c = 0; c < this.columns; c++)
            {
                row.push(".");
            }

            newReflectorDish.push(row);
        }
        return newReflectorDish;
    }

    MakeLowestRockRow(type)
    {
        let lowestRockRow = [];

        switch(type)
        {
            case "North":
            {
                for (let r = 0; r < this.rows; r++)
                {
                    lowestRockRow.push(0);
                }
            }
            case "South":
            {
                for (let r = 0; r < this.rows; r++)
                {
                    lowestRockRow.push(this.rows - 1);
                }
            }
            case "East":
            {
                for (let r = 0; r < this.columns; r++)
                {
                    lowestRockRow.push(this.columns - 1);
                }
            }
            case "West":
            {
                for (let r = 0; r < this.columns; r++)
                {
                    lowestRockRow.push(0);
                }
            }
        }
        return lowestRockRow;
    }

    Print()
    {
        for (let r = 0; r < this.rows; r++)
        {
            let row = "";
            for (let c = 0; c < this.columns; c++)
            {
                row += this.reflectorDish[r][c];
            }
            console.log(row);
        }
    }
}

module.exports = ReflectorDish;