//day 4b
var fs = require("fs"); // imports fs
const ScratchCard = require("./ScratchCard.js");

function DayFour()
{
    // Parse the input into usable data

    let lines = fs.readFileSync("day-4/input-2023-4.txt", "utf-8")
        .replace(/Card \d*: /g, "")
        .split("\r\n")
        .filter(line => line.trim() !== "")
        .map(line => line.split(" | "));

    // Create an array of type ScratchCard to iterate through the list
    var scratchCards = [];

    for (let i = 0; i < lines.length; i++) {
        scratchCards[i] = new ScratchCard
        (
            i+1,                                            // ID (unused)
            0,                                              // wins
            lines[i][0].split(" ").filter(f => f !== ""),   // winningNumbers
            lines[i][1].split(" ").filter(f => f !== "")    // cardNumbers
        );
    }

    // Iterate through that array for each scratchcard and for each copy of that current scratchcard

    for (let card = 0; card < scratchCards.length; card++)
    {
        for (let i = 0; i < scratchCards[card].winningNumbers.length; i++)
        {
            if (scratchCards[card].cardNumbers.includes(scratchCards[card].winningNumbers[i]))
            {
                scratchCards[card].wins++;
            }
        }

        // for every copy of this card
        for (let c = 0; c < scratchCards[card].copies; c++)
        {
            // for every win within that copy, create copies of the subsequent cards for the number of wins
            for (let w = 1; w <= scratchCards[card].wins; w++)
            {
                // ensure within bounds of array
                if (card + w < scratchCards.length)
                {
                    scratchCards[card + w].copies++;
                }
            }
        }
    }
    
    // 3) Calculate the total number of cards

    let totalScratchCards = 0;

    for (let card = 0; card < scratchCards.length; card++)
    {
        totalScratchCards += scratchCards[card].copies;
        console.log(`Card ${card+1}: has ${scratchCards[card].copies} copies, ${scratchCards[card].wins} wins, for a running total of ${totalScratchCards} cards!`);
    }

    console.log(`You have ${totalScratchCards} scratchcards!`);
}

DayFour();