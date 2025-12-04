const fs = require("fs"); // imports file management
const path = require("path");
const filePath = path.join(__dirname, "input.txt");

function PartOne() {
    console.time('a');
    let input = fs.readFileSync(filePath, "utf-8")
        .replace(/\r/gm, "")
        .split("\n")
        .map(i => [i.charAt(0) === "L" ? -1 : 1,+i.slice(1)]);

    let dialLocation = 50;
    let timesAtZero = 0;

    for (let i = 0; i < input.length; i++)
    {
        dialLocation = (((dialLocation+input[i][0]*input[i][1]) % 100) + 100) % 100;
        dialLocation === 0 ? timesAtZero++ : timesAtZero;
        //console.log(`dial location is now ${dialLocation}`);
    }

    console.timeEnd('a');
    console.log(timesAtZero);
}

function PartTwo() {
    console.time('a');
    let input = fs.readFileSync(filePath, "utf-8")
            .replace(/\r/gm, "")
            .split("\n")
            .map(i => [i.charAt(0) === "L" ? -1 : 1,+i.slice(1)]);

    let dialLocation = 50;
    let TotalTimesPassedZero = 0;

    for (let [direction, magnitude] of input)
    {
        let oldLocation = dialLocation;
        dialLocation += direction * magnitude;
        if (dialLocation == 0) { TotalTimesPassedZero++ }
        TotalTimesPassedZero += (Math.abs(dialLocation)/100|0) + (dialLocation < 0 && oldLocation !== 0);
        dialLocation = (((dialLocation) % 100) + 100) % 100;
    }

    console.timeEnd('a');
    console.log(TotalTimesPassedZero);
}

PartOne();
PartTwo();