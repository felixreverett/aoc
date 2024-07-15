//day 1 part 2
var fs = require("fs"); // imports fs

function DayOneB()
{
    let regexp = /\d|one|two|three|four|five|six|seven|eight|nine/g;

    let input = fs.readFileSync("./day-1/input-2023-1.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(i => i
        .match(regexp).map(j => j
            .replace("one", 1)
            .replace("two", 2)
            .replace("three", 3)
            .replace("four", 4)
            .replace("five", 5)
            .replace("six", 6)
            .replace("seven", 7)
            .replace("eight", 8)
            .replace("nine", 9)
        )
    );

    console.log(input);

    let totalValue = 0;
    for (let i = 0; i < input.length; i++)
    {
        let nextValue = parseInt(input[i][0]) * 10 + parseInt(input[i][input[i].length - 1]);
        console.log(nextValue);
        totalValue += nextValue;
    }
        
    console.log(totalValue);
}

DayOneB();