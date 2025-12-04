const fs = require("fs"); // imports file management
const path = require("path");
const filePath = path.join(__dirname, "input.txt");

function PartOne() {
    console.time('a');
    let input = fs.readFileSync(filePath, "utf-8")
        .replace(/\r|\n/gm, "")
        .split(",")
        .map(i => i.split("-").map(i => +i));

    const re = /^(.+)\1$/;
    let total = 0;

    for (let [i, j] of input) {
        while (i <= j) {
            i2 = ""+i;
            if (i2.length && 1 != 0 && re.test(i2)) {
                total += i;
            }
            i++;
        }
    }

    console.timeEnd('a');
    console.log(total);
}

function PartTwo() {
    console.time('a');
    let input = fs.readFileSync(filePath, "utf-8")
        .replace(/\r|\n/gm, "")
        .split(",")
        .map(i => i.split("-").map(i => +i));

    const re = /^(.+)\1+$/;
    let total = 0;

    for (let [i, j] of input) {
        while (i <= j) {
            i2 = ""+i;
            if (i2.length && 1 != 0 && re.test(i2)) {
                total += i;
            }
            i++;
        }
    }

    console.timeEnd('a');
    console.log(total);
}

PartOne();
PartTwo();