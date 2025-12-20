// day X5b

var fs = require("fs"); // imports fs

function DayFifteen()
{
  // 1. Parse input
  let initialisationSteps = fs.readFileSync("day-X5/input-2023-15.txt", "utf-8")
  .replace(/\r/gm, "").replace(/\n/gm, "")
  .split(",");

  // 2. Create boxes
  let boxesArray = CreateBoxesArray();

  // 3. Fill in boxesArray
  boxesArray = FillInBoxesArray(boxesArray, initialisationSteps);

  // 4. Get total focusingPower

  let totalFocusingPower = AccumulateFocusingPower(boxesArray);

  console.log(`The total focusing power and Day 15b's solution is: ${totalFocusingPower}`);

}

function AccumulateFocusingPower(boxesArray)
{
  let totalFocusingPower = 0;

  for (let box = 0; box < boxesArray.length; box++)
  {
    for (let slot = 0; slot < boxesArray[box].length; slot++)
    {
      let lensPower = 1 * (box + 1) * (slot + 1) * boxesArray[box][slot][1];
      totalFocusingPower += lensPower;
    }
  }

  return totalFocusingPower;
}

function FillInBoxesArray(boxesArray, initialisationSteps)
{
  for (let step = 0; step < initialisationSteps.length; step++)
  {
    // add lens
    if (initialisationSteps[step].includes("="))
    {
      let splitInstruction = initialisationSteps[step].split("=");
      let label = splitInstruction[0];
      let focalLength = parseInt(splitInstruction[1]);
      let boxIndex = HashAlgorithm(label);
      let labelIndexInBox = boxesArray[boxIndex].findIndex(([key, _]) => key === label);
      if (labelIndexInBox !== -1)
      {
        boxesArray[boxIndex][labelIndexInBox][1] = focalLength;
      }
      else
      {
        boxesArray[boxIndex].push([label, focalLength]);
      }
    }
    //remove lens
    else 
    {
      let label = initialisationSteps[step].replace("-", "");
      let boxIndex = HashAlgorithm(label);
      boxesArray[boxIndex] = boxesArray[boxIndex].filter(([key, _]) => key !== label);
    }
  }

  return boxesArray;
}

function CreateBoxesArray()
{
  let boxesArray = [];

  for (let i = 0; i < 256; i++)
  {
    boxesArray.push([]);
  }

  return boxesArray;
}

function HashAlgorithm(input)
{
  let value = 0;
    for (let char = 0; char < input.length; char++)
    {
      let asciiValue = input.charCodeAt(char);
      value += asciiValue;
      value *= 17;
      value = value % 256;
    }
    return value;
}

DayFifteen();