//day 3

var fs = require("fs"); // imports fs
//const path = require('node:path');
//var data = fs.readFileSync(".../input-2023-3.txt", "utf-8").split("\n");

function DayThree()
{
    //var data = fs.readFileSync(path.resolve(__dirname, "day-3/input-2023-3.txt"), "utf-8");
    let data = fs.readFileSync("day-3/input-2023-3.txt", "utf-8").split(".");
    console.log(data);
    for (let i = 0; i < data.length; i++)
    {
        console.log(data[i]);
    }
}

DayThree();