//day 2
var fs = require("fs"); // imports fs
// Q: does ./ denote the top-level folder for the solution?
var lines = fs.readFileSync("./day-2/input-2023-2.txt", "utf-8").split("\n");

// parse each line into its separate parts
function DayTwo(lines)
{
    let allGames = [];
    console.log(lines.length);
    for (let i = 0; i < lines.length; i++)
    {
        let line = lines[i]
        //console.log(line);

        if (line !== "")
        {
            let splitLine = line.replace("Game ", "").split(": ");
            let gameNumber = splitLine[0];

            let handfuls = splitLine[1].split(/; |, /);
            var red = 0; let green = 0; let blue = 0;
            for (let handful = 0; handful < handfuls.length; handful++)
            {
                //console.log(handfuls[handful]);
                numberAndColour = handfuls[handful].split(" ");
                number = parseInt(numberAndColour[0]); colour = numberAndColour[1];
                console.log(`${number} lots of ${colour} in this roll.`);
                if (colour === "red" && number > red)
                {
                    red = number;
                }
                else if (colour === "green" && number > green)
                {
                    green = number;
                }
                else if (colour === "blue" && number > blue)
                {
                    blue = number;
                }
            }
            
            let currentGame = new Game(gameNumber, red, green, blue);
            allGames.push(currentGame)
        }
    }

    let total = 0;

    for (let j = 0; j < allGames.length; j++)
    {
        console.log(`Game ${allGames[j].gameNumber}: ${allGames[j].red} reds, ${allGames[j].green} greens, ${allGames[j].blue} blues.`);
        if (allGames[j].red <= 12 && allGames[j].green <= 13 && allGames[j].blue <= 14)
        {
            total += parseInt(allGames[j].gameNumber);
        }
    }
    
    console.log(total);
}

// turn each line into an instance of game class (not the simplest method, but to help me understand how classes work in js)
class Game
{
    constructor(gameNumber, red, green, blue)
    {
        this.gameNumber = gameNumber;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
}

DayTwo(lines);