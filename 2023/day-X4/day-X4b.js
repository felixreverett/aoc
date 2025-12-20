// day X4b

var fs = require("fs"); // imports fs
const ReflectorDish = require("./ReflectorDish.js");

function DayFourteenB()
{
  // 1. Parse input into startReflectorDish
  let startReflectorDish = fs.readFileSync("day-X4/input-2023-14.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n");

  let reflectorDish = new ReflectorDish(startReflectorDish);
  //reflectorDish.Print();

  let memos = []; // loop might take more than 1 cycle to get to same pos

  let loops = 1000000000;

  for (let i = 0; i < loops; i++)
  {
    newMemo = [ConvertToMemo(reflectorDish.reflectorDish), i];
    
    let isMemoInMemos = memos.find(subArray => subArray[0] === newMemo[0]);

    if (isMemoInMemos)
    {
      console.log(isMemoInMemos);
      console.log(`The cycle repeats between ${isMemoInMemos[1]} and ${i}`);
      let loopLength = i - isMemoInMemos[1];
      console.log(loopLength);
      let remainingCycles = parseInt(Math.floor((loops - i) / loopLength));
      console.log(remainingCycles);
      let jumpTo = remainingCycles * loopLength;
      console.log(jumpTo);
      i += jumpTo;
      console.log(i);
      for (let j = 0; j < loops - i; j++)
      {
        reflectorDish.TiltNorth();
        reflectorDish.TiltWest();
        reflectorDish.TiltSouth();
        reflectorDish.TiltEast();
      }

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