// day X5a

var fs = require("fs"); // imports fs

function DayFifteen()
{
  // 1. Parse input into startReflectorDish
  let initialisationSteps = fs.readFileSync("day-X5/input-2023-15.txt", "utf-8")
  .replace(/\r/gm, "").replace(/\n/gm, "")
  .split(",");

  let valueOfSteps = [];

  for (let step = 0; step < initialisationSteps.length; step++)
  {
    let currentValue = 0;
    for (let char = 0; char < initialisationSteps[step].length; char++)
    {
      let asciiValue = initialisationSteps[step].charCodeAt(char);
      currentValue += asciiValue;
      currentValue *= 17;
      currentValue = currentValue % 256;
    }
    valueOfSteps.push(currentValue);
  }

  let totalSum = valueOfSteps.reduce((accumulator, current) => accumulator + current, 0);

  console.log(`The total sum is: ${totalSum}`);

}

DayFifteen();