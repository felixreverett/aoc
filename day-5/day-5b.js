//day 5b
var fs = require("fs"); // imports fs
const Map = require("./Map.js");

function DayFiveB()
{
    // 1. Parse data into lines
    let lines = fs.readFileSync("day-5/sample-input-2023-5.txt", "utf-8")
        .replace("\r\r", "")
        .split("\n")
        .filter(line => line.trim() !== "")

    // 2a. A list of all "maps"
    let mapList = [];

    // 2b. Generate array of seed lower and upper bounds based on their ranges
    let seedsListIndex = lines.findIndex(i => i.match(/seeds:.*/));
    let seedsList = lines[seedsListIndex].replace("\r", "").split(" ").filter(value => value.trim() !== "seeds:").map(Number);
    let seedRanges = [];
    for (let s = 0; s < seedsList.length / 2; s++)
    {
        seedRanges.push([seedsList[s], seedsList[s] + seedsList[s + 1]]);
    }
    
    // 3. Generate maps
    // For every line that is a a-to-b map
    // Set the source and destination names to current map
    // For every next line, if it starts with decimal, add to mapData
    // Sort the mapData
    // Add mapData to current map
    for (let line = 0; line < lines.length; line++)
    {
        if (lines[line].match(/[a-z]*-to-[a-z]* map:/))
        {
            let mapData = [];
            let mapSrc = lines[line].split("-to-")[0];
            let mapDest = lines[line].split("-to-")[1].split(" map:")[0];

            let pointer = 1;
            while (line + pointer < lines.length && lines[line + pointer][0].match(/\d/))
            {
                mapData.push(lines[line + pointer].replace("\r", "").split(" ").map(Number));
                pointer++;
            }

            mapData.sort((a,b) => b[1] - a[1]);

            //console.log(`Source: "${mapSrc}"`);
            //console.log(`Destination: "${mapDest}"`);
            //console.log(mapData[0]);
            mapList.push(new Map(mapSrc, mapDest, mapData));
        }
    }

    // 4. Process every seed range
    finalValuesList = [];

    for (let s = 0; s < seedRanges.length; s++)
    {

    }

    for (let s = 0; s < seedsList.length; s++)
    {
        let mapSource = "seed";
        let theValue = seedsList[s];

        while (mapSource !== "location")
        {
            mapIndex = mapList.findIndex(obj => obj.mapSrc === mapSource);
            //console.log(mapSource);
            //console.log(mapIndex);
            theValue = MapAValue(mapList[mapIndex].mapData, theValue);
            mapSource = mapList[mapIndex].mapDest;
        }

        finalValuesList.push(theValue);
    }

    console.log(seedsList);
    console.log(`The lowest value is: ${finalValuesList.sort((a, b) => a - b)[0]}`);
    
}

/// returns an integer value using a sorted map (descending)
function MapAValue(mapData, value)
    {
        value = parseInt(value);
        //console.log("Your current map data is:");
        //console.log(mapData);
        for (let i = 0; i < mapData.length; i++)
        {
            if (value >= mapData[i][1] && value < mapData[i][1] + mapData[i][2])
            {
                //console.log(`a map was found for value ${value} at mapSource ${mapData[i][1]}`);
                //console.log(mapData[i][0]);
                value = mapData[i][0] + (value - mapData[i][1]);
                //console.log(value);
                return value;
            }
        }

        //console.log(`no match was found for value ${value}`);
        return value; // no map was found
    }

DayFiveB();