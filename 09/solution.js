var fs = require("fs"); // imports fs

let compactedFile = "";

function Solution()
{
  let diskMap = fs.readFileSync("09/sample-input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("")
    .map(int => parseInt(int));
  
  console.log(diskMap.length);

  let rightPointer = diskMap.length;

  for (let leftPointer = 0; leftPointer < rightPointer; leftPointer += 2)
  {
    // append fileID to the compacted file "diskMap[leftPointer] times"
    let fileID = leftPointer / 2;
    
    for (let i = 0; i < diskMap[leftPointer]; i++)
    {
      compactedFile += fileID;
    }

    // shift fileID values at the end of the diskMap to the compated file "diskMap[leftPointer+1] times"
    let freeSpace = fileID + 1;
    for (let space = 0; space < diskMap[leftPointer + 1]; space++)
    {
      // realising that this approach may not work.
    }
  }

  console.log(compactedFile);
}

Solution();