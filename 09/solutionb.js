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
      if (diskMap[a][v] !== ".")
      {
        checkSum += iterator * diskMap[a][v];
      }
      iterator++;
    }
  }

  return checkSum;
}

function CalculateFreeSpace(array)
{
  let freeSpace = 0; let firstFreeIndex = -1;
  for (let i = 0; i < array.length; i++)
  {
    if (array[i] === ".")
    {
      if (freeSpace === 0) firstFreeIndex = i;
      freeSpace++;
    }
  }
  return [freeSpace, firstFreeIndex];
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

  for (let r = diskMap.length - 1; r > 0; r -= 2)
  {
    for (let l = 1; l < r; l += 2)
    {
      let [freeSpace, firstFreeIndex] = CalculateFreeSpace(diskMap[l]);
      if (freeSpace >= diskMap[r].length)
      {
        for (let i = 0; i < diskMap[r].length; i++)
        {
          [diskMap[l][firstFreeIndex + i], diskMap[r][i]] = [diskMap[r][i], diskMap[l][firstFreeIndex + i]];
        }
        break;
      }
    }
  }

  console.timeEnd('a');
  console.log(GetCheckSum(diskMap)); //solution
}

Solution();