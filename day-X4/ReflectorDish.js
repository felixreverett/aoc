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

        for (let r = 0; r < this.reflectorDish.length; r++)
        {
            for (let c = 0; c < this.reflectorDish[r].length; c++)
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

    TiltEast(){}

    TiltSouth(){}
    TiltWest(){}

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
                    lowestRockRow.push(this.rows);
                }
            }
            case "East":
            {
                for (let r = 0; r < this.columns; r++)
                {
                    lowestRockRow.push(this.columns);
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