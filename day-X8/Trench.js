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

    Fill()
    {
        // use recursive "floodfill" to fill outsides of the loop
        // 1a. Flood-fill from the top and bottom edges
        for (let col = 0; col < this.Trench[0].length; col++)
        {
            this.FloodFill(0, col, 0, "top edge");
            this.FloodFill(this.Trench.length - 1, col, 0, "bottom edge");
        }
        // 1b. Flood fill from the left and right edges
        for (let row = 0; row < this.Trench.length; row++)
        {
            this.FloodFill(row, 0, 0, "left edge");
            this.FloodFill(row, this.Trench[0].length - 1, 0, "right edge");
        }
    }

    FloodFill(row, col, recursionDepth, startEdge)
    {
        recursionDepth++; console.log(`The recursive depth of ${startEdge} is ${recursionDepth}`);
        if (row < 0 || row > this.Trench.length - 1 || col < 0 || col > this.Trench[row].length - 1) { return; }
        if (this.Trench[row][col] !== ".") { return; }
        this.Trench[row][col] = "o";

        this.FloodFill(row + 1, col, recursionDepth, startEdge);
        this.FloodFill(row - 1, col, recursionDepth, startEdge);
        this.FloodFill(row, col + 1, recursionDepth, startEdge);
        this.FloodFill(row, col - 1, recursionDepth, startEdge);
    }

    Print()
    {
        console.log("=== Printing Trench ===");
        for (let col = 0; col < this.Trench.length; col++)
        {
            let currentColumnToPrint = "";
            for (let row = 0; row < this.Trench[col].length; row++)
            {
                currentColumnToPrint += this.Trench[col][row];
            }
            console.log(currentColumnToPrint);
        }
    }
    
}

module.exports = Trench;