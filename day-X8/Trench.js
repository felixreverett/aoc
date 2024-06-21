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
        let isEntrenched;
        for (let row = 0; row < this.Trench.length; row++)
        {
            isEntrenched = false;
            for (let col = 0; col < this.Trench[row].length; col++)
            {
                if (this.Trench[row][col] === "#")
                {
                    if (col > 0 && this.Trench[row][col-1] === "#")
                    {
                        if (col < this.Trench[row].length - 1 && this.Trench[row][col+1] ==="#")
                        {
                            // do nothing
                        }
                        else
                        {
                            isEntrenched = !isEntrenched;
                            console.log(`toggling isEntrenched to ${isEntrenched}`);
                        }
                    }
                    else
                    {
                        isEntrenched = !isEntrenched;
                        console.log(`toggling isEntrenched to ${isEntrenched}`);
                    }
                }
                if (this.Trench[row][col] === "." && isEntrenched)
                {
                    this.Trench[row][col] = "*";
                    console.log("Writing *");
                }
                // if the value is #:
                //      if the value left of that is #:
                //          if the value to the right of that is #:
                //              do nothing
                //          else:
                //              toggle isEntrenched
                //      else:
                //          toggle isEntrenched
                // if the value is . && isEntrenched:
                //  set that value to *
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