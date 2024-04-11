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

  let memos = []; // loop might take more than 1 cycle to get to same pos

  for (let i = 0; i < 1000000000; i++)
  {
    newMemo = ConvertToMemo(reflectorDish.reflectorDish);
    
    if (memos.includes(newMemo))
    {
      break;
    }

    else
    {
      memos.push(newMemo);

      reflectorDish.TiltNorth();
      reflectorDish.TiltWest();
      reflectorDish.TiltSouth();
      reflectorDish.TiltEast();
    }

  }

  reflectorDish.Print();
  reflectorDish.CountLoad();

}

function ConvertToMemo(reflectorDish)
{
  let memo = "";
  for (let r = 0; r < reflectorDish.length; r++)
  {
    for (let c = 0; c < reflectorDish[r].length; c++)
    {
      memo += reflectorDish[r][c];
    }
  }
  return memo;
}

DayFourteenB();