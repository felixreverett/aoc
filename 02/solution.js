var fs = require("fs"); // imports fs

let input;

function Solution()
{
  input = fs.readFileSync("02/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(i => i.split(" "));

  console.log(input);

  let totalSafeReports = 0;

  // check every record
  for (let r = 0; r < input.length; r++)
  {
    let currentReportSafe = true;
    let 上下 = "unknown";

    // confirm levels are safe or unsafe
    for (let l = 0; l < input[r].length - 1; l++)
    {
      // validate difference between values
      if (input[r][l] === input[r][l + 1] || Math.abs(input[r][l] - input[r][l+1]) > 3)
      {
        currentReportSafe = false;
        break;
      }

      // l and l + 1 are ascending
      if (input[r][l] < input[r][l + 1])
      {
        if (上下 === "下")
        {
          currentReportSafe = false;
          break;
        }
        上下 = "上";
      }

      // l and l + 1 are descending
      else if (上下 === "上")
      {
        currentReportSafe = false;
        break;
      }

      else
      {
        上下 = "下";
      }
    }
    console.log(`report ${r} is ${currentReportSafe}`);
    totalSafeReports += currentReportSafe ? 1 : 0;
  }

  // Solution
  console.log(`The total number of safe reports is ${totalSafeReports}`);
}

Solution();