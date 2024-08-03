//day 5b
var fs = require("fs"); // imports fs
const MapB = require("./MapB.js");

function DayFiveB()
{
    // 1. Parse data into lines
    let lines = fs.readFileSync("day-5/sample-input-2023-5.txt", "utf-8")
        .replace("\r\r", "")
        .split("\n")
        .filter(line => line.trim() !== "")

    // 2. Generate Map Objects
    let Maps = [];
    
    for (let line = 0; line < lines.length; line++)
    {
        if (lines[line].match(/[a-z]*-to-[a-z]* map:/))
        {
            let mapInput = [];
            let mapSource = lines[line].split("-to-")[0];
            let mapDestination = lines[line].split("-to-")[1].split(" map:")[0];

            let pointer = 1;
            while (line + pointer < lines.length && lines[line + pointer][0].match(/\d/))
            {
                mapInput.push(lines[line + pointer].replace("\r", "").split(" ").map(Number));
                pointer++;
            }
            Maps.push(new MapB(mapSource, mapDestination, mapInput));
        }
    }

    // 3. Generate Ranges of type "Seed" => ["Seed", lowerBound, upperBound]
    let seedsListIndex = lines.findIndex(i => i.match(/seeds:.*/));
    let seedsList = lines[seedsListIndex].replace("\r", "").split(" ").filter(value => value.trim() !== "seeds:").map(Number);
    let Ranges = [];

    for (let s = 0; s < seedsList.length / 2; s++)
    {
        Ranges.push(["seed", seedsList[s], seedsList[s] + seedsList[s + 1]]);
    }

    // 4. Process Ranges into LocationRanges
    let LocationRanges = [];
    for (let r = 0; r < Ranges.length; r++)
    {
        LocationRanges.push(ProcessRange(Ranges[r]));
    }

    // 5. Get lowest bound of all location ranges

    for (let s = 0; s < seedsList.length; s++)
    {
        let mapSource = "seed";
        let theValue = seedsList[s];

        while (mapSource !== "location")
        {
            mapIndex = mapList.findIndex(obj => obj.mapSource === mapSource);
            //console.log(mapSource);
            //console.log(mapIndex);
            theValue = MapAValue(mapList[mapIndex].mapData, theValue);
            mapSource = mapList[mapIndex].mapDestination;
        }

        finalValuesList.push(theValue);
    }

    console.log(seedsList);
    console.log(`The lowest value is: ${finalValuesList.sort((a, b) => a - b)[0]}`);
    
}

function ProcessRange(range)
{
    //
}



DayFiveB();