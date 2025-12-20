class Trench
{
    constructor(numberOfRows, numberOfCols)
    {
       this.numberOfRows = numberOfRows;
       this.numberOfCols = numberOfCols;
       this.Trench = [];
    }

    InitialiseTrench()
    {
        for (let col = 0; col < this.numberOfCols; col++)
        {
            let currentRow = [];
            for (let row = 0; row < this.numberOfRows; row++)
            {
            currentRow.push(".");
            }
            this.Trench.push(currentRow);
        }
    }

    Dig(trenchX, trenchY, instructionsList)
    {
        this.Trench[trenchY][trenchX] = "#";
        for (let i = 0; i < instructionsList.length; i++)
        {
            switch (instructionsList[i].direction)
            {
            case "L":
                {
                for (let j = 0; j < instructionsList[i].scale; j++)
                {
                    trenchX--;
                    this.Trench[trenchY][trenchX] = "#";
                }
                break;
                }
            case "R":
                {
                for (let j = 0; j < instructionsList[i].scale; j++)
                {
                    trenchX++;
                    this.Trench[trenchY][trenchX] = "#";
                }
                break;
                }
            case "U":
                {
                for (let j = 0; j < instructionsList[i].scale; j++)
                {
                    trenchY--;
                    this.Trench[trenchY][trenchX] = "#";
                }
                break;
                }
            case "D":
                {
                for (let j = 0; j < instructionsList[i].scale; j++)
                {
                    trenchY++;
                    this.Trench[trenchY][trenchX] = "#";
                }
                break;
                }
            }
      }
    }

    FillFromEdges()
    {
        for (let col = 0; col < this.Trench[0].length; col++)
        {
            this.FloodFillWithStack(0, col);
            this.FloodFillWithStack(this.Trench.length - 1, col);
        }
        
        for (let row = 0; row < this.Trench.length; row++)
        {
            this.FloodFillWithStack(row, 0);
            this.FloodFillWithStack(row, this.Trench[0].length - 1);
        }
    }

    FloodFillWithStack(row, col)
    {
        var fillStack = [];
        fillStack.push([row, col]);

        while (fillStack.length > 0)
        {
            var [row, col] = fillStack.pop();

            if (row < 0 || row > this.Trench.length - 1 || col < 0 || col > this.Trench[row].length - 1) { continue; }
            if (this.Trench[row][col] !== ".") { continue; }

            this.Trench[row][col] = "o";

            fillStack.push([row + 1, col]);
            fillStack.push([row - 1, col]);
            fillStack.push([row, col + 1]);
            fillStack.push([row, col - 1]);
        }
    }

    CountTotalValidCells(validCells)
    {
        let totalValidCells = 0;
        for (let row = 0; row < this.Trench.length; row++)
        {
            for (let col = 0; col < this.Trench[row].length; col++)
            {
                if (validCells.includes(this.Trench[row][col]))
                {
                    totalValidCells++;
                }
            }
        }
        
        console.log(`The total number of valid cells is ${totalValidCells}`);
    }

    Print()
    {
        console.log("=== Printing Trench ===");
        for (let row = 0; row < this.Trench.length; row++)
        {
            let currentRowToPrint = "";
            for (let col = 0; col < this.Trench[row].length; col++)
            {
                currentRowToPrint += this.Trench[row][col];
            }
            console.log(currentRowToPrint);
        }
    }
    
}

module.exports = Trench;