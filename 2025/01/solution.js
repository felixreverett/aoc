const fs = require("fs"); // imports file management
const path = require("path");
const filePath = path.join(__dirname, "sample-input.txt");

function PartOne() {
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
        console.log(`dial location is now ${dialLocation}`);
    }

    console.log(timesAtZero);
}

function PartTwo() {
    let input = fs.readFileSync(filePath, "utf-8")
            .replace(/\r/gm, "")
            .split("\n")
            .map(i => [i.charAt(0) === "L" ? -1 : 1,+i.slice(1)]);

    let dialLocation = 50;
    let TotalTimesPassedZero = 0;

    console.log((Math.abs(0)/100|0)+1);
    console.log(100/100|0);
    //return;
    
    for (let [direction, magnitude] of input)
    {
        let delta = direction * magnitude;
        let previousLoc = dialLocation;
        let nextLoc = dialLocation + delta;

        if (previousLoc - nextLoc < 0) {

        }
        

        dialLocation = (((dialLocation) % 100) + 100) % 100;
    }

    console.log(TotalTimesPassedZero);
}

//PartOne();
PartTwo();

// 6467
// 6467 x
// 6917 x