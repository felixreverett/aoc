// day X4b

var fs = require("fs"); // imports fs
const ReflectorDish = require("./ReflectorDish.js");

function DayFourteenB()
{
  // 1. Parse input into startReflectorDish
  let startReflectorDish = fs.readFileSync("day-X4/sample-input-2023-14.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n");

  let reflectorDish = new ReflectorDish(startReflectorDish);
  //reflectorDish.Print();
  reflectorDish.TiltSouth(); //here
  reflectorDish.Print();
  reflectorDish.CountLoad();

}

DayFourteenB();