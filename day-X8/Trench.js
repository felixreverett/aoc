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