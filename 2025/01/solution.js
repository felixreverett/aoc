const fs = require("fs"); // imports file management
const path = require("path");
const filePath = path.join(__dirname, "input.txt");

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

    for (let [direction, magnitude] of input)
    {
        let oldLocation = dialLocation;
        dialLocation += direction * magnitude;
        let cycles = 0;

        if (dialLocation == 0) { TotalTimesPassedZero++ }

        if (dialLocation < 0) {
            if (oldLocation == 0) {
                cycles = Math.abs(dialLocation)/100|0
            } else {
                cycles = (Math.abs(dialLocation)/100|0)+1;
            }
        } else {
            cycles = Math.abs(dialLocation)/100|0;
        }
        console.log(`Value moved ${direction*magnitude} from ${oldLocation} to ${dialLocation}`);
        console.log(`Crossed zero ${cycles} times.`);
        TotalTimesPassedZero += cycles;
        
        dialLocation = (((dialLocation) % 100) + 100) % 100;
        
        console.log(`Value was then clamped to ${dialLocation}\n=====`);
    }

    console.log(TotalTimesPassedZero);
}

PartOne();
PartTwo();