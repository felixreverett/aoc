var fs = require("fs"); // imports fs
console.time('a');

let antennaMap = new Map();
let antinodePositions = [];

function CoordinatesInBounds(coordinates, array) {
  if ( coordinates[0] >= 0
    && coordinates[0] < array.length
    && coordinates[1] >= 0
    && coordinates[1] < array[0].length
  ) {
    return true;
  }
  return false;
}

function Solution() {
  let cityGrid = fs.readFileSync("08/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(line => line.split(""));

  for (let row = 0; row < cityGrid.length; row++) {
    for (let col = 0; col < cityGrid.length; col++) {
      let val = cityGrid[row][col];
      if (val !== ".") {
        if (antennaMap.has(val)) {
          antennaMap.set(val, antennaMap.get(val).concat([[row, col]]));
        }
        else {
          antennaMap.set(val, [[row, col]]);
        }
      }
    }
  }

  antennaMap.forEach(antenna => {
    for (let a = 0; a < antenna.length; a++) {
      for (let b = a + 1; b < antenna.length; b++) {
        let rowDelta = antenna[a][0] - antenna[b][0];
        let colDelta = antenna[a][1] - antenna[b][1];
        
        let antinodeA = [antenna[a][0] + rowDelta, antenna[a][1] + colDelta];
        let antinodeB = [antenna[b][0] - rowDelta, antenna[b][1] - colDelta];

        if (!antinodePositions.includes("r" + antinodeA[0] + "c" + antinodeA[1]) && CoordinatesInBounds(antinodeA, cityGrid)) {
          antinodePositions.push("r" + antinodeA[0] + "c" + antinodeA[1]);
        }

        if (!antinodePositions.includes("r" + antinodeB[0] + "c" + antinodeB[1]) && CoordinatesInBounds(antinodeB, cityGrid)) {
          antinodePositions.push("r" + antinodeB[0] + "c" + antinodeB[1]);
        } 
      }
    }
  });

  console.timeEnd('a');
  console.log(antinodePositions.length);
}

Solution();