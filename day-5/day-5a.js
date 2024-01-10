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

    //let seedsListIndex = lines.findIndex(i => i === /seeds:.*/);
    //console.log(seedsListIndex);
    //let seedsList = lines[seedsListIndex].split(" ").filter(value => value.trim() !== "seeds:");
    //lines.splice(seedsListIndex, 1);

    //lines.split(/[a-z]*-to-[a-z]* map:/)

    for (let line = 0; line < lines.length; line++)
    {
        if (lines[line].match(/[a-z]*-to-[a-z]* map:/))
        {
            let mapData = [];
            let mapSrc = lines[line].split("-to-")[0];
            let mapDest = lines[line].split("-to-")[1];

            let pointer = 1;
            while (line + pointer < lines.length && lines[line + pointer][0].match(/\d/))
            {
                mapData.push(lines[line + pointer].replace("\r", "").split(" "));
                pointer++;
            }

            //console.log(mapData);
            mapList.push(new Map(mapSrc, mapDest, mapData));
        }
    }

    //console.log(mapList.length);
}

DayFive();