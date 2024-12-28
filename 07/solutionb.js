var fs = require("fs"); // imports fs
console.time('a');

function TestEquation(testValue, aggregateValue, calibrationValues) //int, int, []int
{
  if (calibrationValues.length === 1)
  {
    //console.log(`Testing ${testValue} with remaining ${calibrationValues[0]}`); //debug
    return (
      testValue === aggregateValue * calibrationValues[0] ||
      testValue === aggregateValue + calibrationValues[0] ||
      testValue === aggregateValue * BigInt((10 ** Math.ceil(Math.log10(Number(calibrationValues[0]))))) + calibrationValues[0]
    );
  }
  else
  {
    //console.log(`Testing ${testValue} with ${aggregateValue} and ${calibrationValues}`);
    return (
      TestEquation(testValue, aggregateValue * calibrationValues[0], calibrationValues.slice(1)) ||
      TestEquation(testValue, aggregateValue + calibrationValues[0], calibrationValues.slice(1)) ||
      TestEquation(testValue, aggregateValue * BigInt((10 ** (1 + Math.floor(Math.log10(Number(calibrationValues[0])))))) + calibrationValues[0], calibrationValues.slice(1))
    );
  }
}

function Solution()
{
  let calibrationEquations = fs.readFileSync("07/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .replace(/:\s/gm, " ")
    .split("\n")
    .map(line => line.split(" ").map(number => BigInt(number)));

  let total = BigInt(0);

  for (let e = 0; e < calibrationEquations.length; e++)
  {
    let testValue = calibrationEquations[e][0];
    console.log(testValue);
    let calibrationValues = calibrationEquations[e].slice(1);
    if (TestEquation(testValue, calibrationValues[0], calibrationValues.slice(1))) total += testValue;
  }

  console.timeEnd('a');
  console.log(total);
}

Solution();

// 165271863194163 too low