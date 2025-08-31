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
      testValue === +(aggregateValue + "" + calibrationValues[0])
    );
  }
  else
  {
    //console.log(`Testing ${testValue} with ${aggregateValue} and ${calibrationValues}`);
    return (
      TestEquation(testValue, aggregateValue * calibrationValues[0], calibrationValues.slice(1)) ||
      TestEquation(testValue, aggregateValue + calibrationValues[0], calibrationValues.slice(1)) ||
      TestEquation(testValue, +(aggregateValue + "" + calibrationValues[0]), calibrationValues.slice(1))
    );
  }
}

function Solution()
{
  let calibrationEquations = fs.readFileSync("07/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .replace(/:\s/gm, " ")
    .split("\n")
    .map(line => line.split(" ").map(number => parseInt(number)));

  let total = BigInt(0);

  for (let e = 0; e < calibrationEquations.length; e++)
  {
    let testValue = calibrationEquations[e][0];
    let calibrationValues = calibrationEquations[e].slice(1);
    if (TestEquation(testValue, calibrationValues[0], calibrationValues.slice(1))) total += BigInt(testValue);
  }

  console.timeEnd('a');
  console.log(total);
}

Solution();