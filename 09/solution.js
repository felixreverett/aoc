var fs = require("fs"); // imports fs
console.time('a');

function GetCheckSum(diskMap)
{
  let checkSum = 0;
  let iterator = 0;

  for (let a = 0; a < diskMap.length; a++)
  {
    for (let v = 0; v < diskMap[a].length; v++)
    {
      if (diskMap[a][v] === ".") return checkSum;
      checkSum += iterator * diskMap[a][v];
      iterator++;
    }
  }

  return checkSum;
}

function Solution()
{
  let diskMap = fs.readFileSync("09/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("")
    .map((char, index) => 
    {
      let int = parseInt(char);
      let array = [];
      if (index % 2 === 0)
      {
        let fileID = index / 2;
        for (let i = 0; i < int; i++)
        {
          array.push(fileID);
        }
      }
      else
      {
        for (let i = 0; i < int; i++)
        {
          array.push(".");
        }
      }
      return array;
    });

  let leftPointer = 0;
  let rightPointer = diskMap.length - 1;
  let rightSubPointer = diskMap[rightPointer].length - 1;

  while (leftPointer < rightPointer)
  {
    let leftSubPointer = 0;

    while (leftSubPointer < diskMap[leftPointer + 1].length)
    {
      if (rightSubPointer < 0)
      {
        rightPointer -= 2;
        if (rightPointer <= leftPointer) break;
        rightSubPointer = diskMap[rightPointer].length - 1;
      }
            
      [diskMap[leftPointer + 1][leftSubPointer], diskMap[rightPointer][rightSubPointer]] = [diskMap[rightPointer][rightSubPointer], diskMap[leftPointer + 1][leftSubPointer]];
      
      leftSubPointer++;
      rightSubPointer--;
    }

    leftPointer += 2;
  }

  console.timeEnd('a');
  console.log(GetCheckSum(diskMap)); //solution
}

Solution();