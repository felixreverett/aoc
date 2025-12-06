const fs = require("fs"); // imports file management
const path = require("path");
const filePath = path.join(__dirname, "input.txt");

function isInBounds(r, c, maxR, maxC) {
    return r >= 0 && r < maxR && c >= 0 && c < maxC;
}

function print2DArray(array) {
    console.log("==========")
    for (let r = 0; r < array.length; r++) {
        let row = "";
        for (let c = 0; c < array[r].length; c++) {
            row += array[r][c];
        }
        console.log(row);
    }
}

function PartOne() {
    console.time('a');
    let input = fs.readFileSync(filePath, "utf-8")
        .replace(/\r/gm, "")
        .split("\n")
        .map(i => i.split(""));

    let total=0;

    for (let r = 0; r < input.length; r++) {
        for (let c = 0; c < input[r].length; c++) {
            let adjacentRolls = 0;
            if (input[r][c] == "@") {
                for (let subR = -1; subR < 2; subR++) {
                    for (let subC = -1; subC < 2; subC++) {
                        if (subR == 0 && subC == 0) {
                            continue;
                        }
                        else if (isInBounds(r+subR, c+subC, input.length, input[r].length) && input[r+subR][c+subC] == "@") {
                            adjacentRolls++;
                        }
                    }
                }
                if (adjacentRolls < 4) {
                    total++;
                }
            }
        }
    }
    
    console.timeEnd('a');
    console.log(total);
}

function PartTwo() {
    console.time('a');
    let input = fs.readFileSync(filePath, "utf-8")
        .replace(/\r/gm, "")
        .split("\n")
        .map(i => i.split(""));

    let total=0;
    let isReducing = true;

    while (isReducing) {
        let subtotal = 0;
        let valuesToUpdate = [];
        //print2DArray(input);
        for (let r = 0; r < input.length; r++) {
            for (let c = 0; c < input[r].length; c++) {
                let adjacentRolls = 0;
                if (input[r][c] == "@") {
                    for (let subR = -1; subR < 2; subR++) {
                        for (let subC = -1; subC < 2; subC++) {
                            if (subR == 0 && subC == 0) {
                                continue;
                            }
                            else if (isInBounds(r+subR, c+subC, input.length, input[r].length) && input[r+subR][c+subC] == "@") {
                                adjacentRolls++;
                            }
                        }
                    }
                    if (adjacentRolls < 4) {
                        subtotal++;
                        valuesToUpdate.push([r, c]);
                    }
                }
            }
        }
        total+=subtotal;
        //console.log(`Adding ${subtotal}`);
        for (let a = 0; a < valuesToUpdate.length; a++) {
            input[valuesToUpdate[a][0]][valuesToUpdate[a][1]] = ".";
        }
        if (subtotal == 0) {
            isReducing = false;
        }
    }
    
    console.timeEnd('a');
    console.log(total);
}

//PartOne();
PartTwo();