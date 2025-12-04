const fs = require("fs"); // imports file management
const path = require("path");
const filePath = path.join(__dirname, "input.txt");

function PartOne() {
    console.time('a');
    let input = fs.readFileSync(filePath, "utf-8")
        .replace(/\r/gm, "")
        .split("\n")
        .map(i => i.split("").map(i => +i));

    console.log(input);
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


PartOne();
//PartTwo();