//day 5b
var fs = require("fs"); // imports fs
const MapB = require("./MapB.js");

function DayFiveB()
{
    // 1. Parse data into lines
    let lines = fs.readFileSync("day-5/input-2023-5.txt", "utf-8")
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
        Ranges.push(["seed", seedsList[s * 2], seedsList[s * 2] + seedsList[s * 2 + 1] - 1]);
    }

    // 4. Process all Ranges into LocationRanges
    let LocationRanges = [];
    for (let r = 0; r < Ranges.length; r++)
    {
        LocationRanges = LocationRanges.concat(ProcessRange(Ranges[r], Maps));
    }
    let SortedLocationRanges = [];
    for (let r = 0; r < LocationRanges.length / 3; r++)
    {
        SortedLocationRanges.push([LocationRanges[r * 3], LocationRanges[r * 3 + 1], LocationRanges[r * 3 + 2]]);
    }
    
    SortedLocationRanges.sort((a, b) => a[1] - b[1]);
    console.log("Here are all location ranges:");
    console.log(SortedLocationRanges);
    
}

function ProcessRange(range, Maps)
{
    let name = range[0];
    let inputLowerBound = range[1];
    let inputUpperBound = range[2];
    console.log(`Processing range: ${range}`);

    let nextRanges = [];

    if (name === "location")
    {
        console.log("Found a location range");
        nextRanges.push(range);
        return nextRanges;
    }

    // Get the current "mapB" from the globally accessible list
    let myMapB = Maps.find(i => i.MapSource === name);

    if (!myMapB)
    {
        console.log(`Error: no corresponding map found with name ${name}`);
    }

    for (let m = 0; m < myMapB.Maps.length; m++)
    {
        let currentMapLowerBound = myMapB.Maps[m][1];
        let currentMapUpperBound = currentMapLowerBound + myMapB.Maps[m][2] - 1;
        let currentMapDifferential = myMapB.Maps[m][0] - currentMapLowerBound;

        // if our range is below the current map's lower bound
        // then we need to process all of this subrange first
        if (inputLowerBound < currentMapLowerBound)
        {
            let newUpperBound = Math.min(currentMapUpperBound, inputUpperBound);
            nextRanges.push([myMapB.MapDestination, inputLowerBound, newUpperBound]);
            inputLowerBound = newUpperBound + 1;

            // exit the loop if we've processed all ranges
            if (inputLowerBound > inputUpperBound)
            {
                break;
            }
        }

        // The lowest our inputLowerBound can be is the lower bound of the current map.
        // If inputLowerBound is less than or equal to the current map's upper bound
        if (inputLowerBound <= currentMapUpperBound)
        {
            // define "newUpperBound" to be used in our subrange
            let newUpperBound = Math.min(currentMapUpperBound, inputUpperBound);

            // add subrange to nextRanges
            nextRanges.push([myMapB.MapDestination, inputLowerBound + currentMapDifferential, newUpperBound + currentMapDifferential]);

            // update our lowerBound to our currentUpperBound + 1 to process the next subrange
            inputLowerBound = newUpperBound + 1;

            // exit the loop if we've processed all ranges
            if (inputLowerBound > inputUpperBound)
            {
                break;
            }
        }
    }

    // After the loop, if the input lower bound is still below the input upper bound
    if (inputLowerBound <= inputUpperBound)
    {
        nextRanges.push([myMapB.MapDestination, inputLowerBound, inputUpperBound]);
    }

    let rangesToReturn = [];
    for (let r = 0; r < nextRanges.length; r++)
    {
        rangesToReturn = rangesToReturn.concat(ProcessRange(nextRanges[r], Maps));
    }

    return rangesToReturn.flat();
}

DayFiveB();