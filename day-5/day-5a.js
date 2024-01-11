//day 5a
var fs = require("fs"); // imports fs
const Map = require("./Map.js");

// Solution:
// 1) Parse input into each line
// detect if a line

function DayFive()
{
    // 1) first identify all symbols and mark around them in an array the same size as the input
    let lines = fs.readFileSync("day-5/sample-input-2023-5.txt", "utf-8")
        .replace("\r\r", "")
        .split("\n")
        .filter(line => line.trim() !== "")

    var mapList = [];

    // Generate seeds list
    let seedsListIndex = lines.findIndex(i => i.match(/seeds:.*/));
    let seedsList = lines[seedsListIndex].replace("\r", "").split(" ").filter(value => value.trim() !== "seeds:");
    console.log(seedsList);

    
    // Generate maps
    for (let line = 0; line < lines.length; line++)
    {
        if (lines[line].match(/[a-z]*-to-[a-z]* map:/))
        {
            let mapData = [];
            let mapSrc = lines[line].split("-to-")[0];
            let mapDest = lines[line].split("-to-")[1].replace(" map:", "");

            let pointer = 1;
            while (line + pointer < lines.length && lines[line + pointer][0].match(/\d/))
            {
                mapData.push(lines[line + pointer].replace("\r", "").split(" "));
                pointer++;
            }

            console.log(`Source: ${mapSrc}`);
            console.log(`Destination: ${mapDest}`);
            console.log(mapData);
            mapList.push(new Map(mapSrc, mapDest, mapData));
        }
    }

    // Process every seed
    for (let s = 0; s < seedsList.length; s++)
    {
        
    }
}

DayFive();