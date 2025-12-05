const fs = require("fs"); // imports file management
const path = require("path");
const filePath = path.join(__dirname, "input.txt");

function PartOne() {
    console.time('a');
    let input = fs.readFileSync(filePath, "utf-8")
        .replace(/\r/gm, "")
        .split("\n")
        .map(i => i.split("").map(i => +i));

    let total = 0;

    for (let r = 0; r < input.length; r++) {
        let largestPosC = 0;
        let largestValC = -1;
        for (let c = 0; c < input[r].length-1; c++) {
            let currentVal = input[r][c];
            if (currentVal > largestValC) {
                largestValC = currentVal;
                largestPosC = c;
                if (currentVal == 9) {
                    break;
                }
            }
        }

        let largestPosC2 = 0;
        let largestValC2 = -1;
        for (let c2 = largestPosC+1; c2 < input[r].length; c2++) {
            let currentVal = input[r][c2];
            if (currentVal > largestValC2) {
                largestValC2 = currentVal;
                largestPosC2 = c2;
                if (currentVal == 9) {
                    break;
                }
            }
        }
        total+= +largestValC*10+ +largestValC2;
    }

    console.timeEnd('a');
    console.log(total);
}

function PartTwo() {
    console.time('a');
    let input = fs.readFileSync(filePath, "utf-8")
        .replace(/\r/gm, "")
        .split("\n")
        .map(i => i.split("").map(i => +i));

    let total = 0;
    let valueLength = 12;

    for (let r = 0; r < input.length; r++) {
        let largestUnitsInRow = [];
        let largestPos = -1;
        for (let unit = 0; unit < valueLength; unit++) {
            let largestVal = -1;
            for (let lPointer = largestPos+1; lPointer < input[r].length-valueLength+unit+1; lPointer++) {
                let currentVal = input[r][lPointer];
                if (currentVal > largestVal) {
                    largestVal = currentVal;
                    largestPos = lPointer;
                    if (currentVal == 9) {
                        break;
                    }
                }
            }
            largestUnitsInRow.push(largestVal);
        }
        let subtotal = 0;
        for (let u = 0; u < largestUnitsInRow.length; u++) {
            subtotal+=largestUnitsInRow[u]*10**(valueLength-u-1);
        }
        total += subtotal;
    }
    console.timeEnd('a');
    console.log(total);
}


PartOne();
PartTwo();