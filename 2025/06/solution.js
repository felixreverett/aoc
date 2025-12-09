const fs = require("fs"); // imports file management
const path = require("path");
const filePath = path.join(__dirname, "input.txt");

function PartOne() {
    console.time('a');
    let input = fs.readFileSync(filePath, "utf-8")
        .replace(/\r/gm, "")
        .split("\n")
        .map(i => i.split(""));

    let total=0;

    console.timeEnd('a');
    console.log(total);
}

PartOne();
//PartTwo();