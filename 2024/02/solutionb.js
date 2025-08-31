var fs = require("fs"); // imports fs

let input;

function Solution()
{
  input = fs.readFileSync("02/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(i => i.split(" ").map(j => parseInt(j)));

  let totalSafeReports = 0;

  // check every record
  for (let r = 0; r < input.length; r++)
  {
    totalSafeReports += ProcessReport(input[r]) ? 1 : 0;
  }

  // Solution
  console.log(`The total number of safe reports with a Problem Dampener is ${totalSafeReports}`);
}

function ProcessReport(report)
{
  // process every report and its permutations. If at least one is valid, return
  if (ProcessSubReport(report)) { return true; }

  for (let sr = 0; sr < report.length; sr++)
  {
    let subReport = report.slice(0, sr)
      .concat(report.slice(sr + 1));

    if (ProcessSubReport(subReport)) { return true; }
  }
  
  return false;
}

function ProcessSubReport(report)
{
  let currentReportSafe = true;
  let 上下 = "unknown";

  for (let l = 0; l < report.length - 1; l++)
  {
    if (report[l] === report[l + 1] || Math.abs(report[l] - report[l+1]) > 3)
    {
      currentReportSafe = false;
      break;
    }
    if (report[l] < report[l + 1])
    {
      if (上下 === "下")
      {
        currentReportSafe = false;
        break;
      }

      上下 = "上";
    }
    else
    {
      if (上下 === "上")
      {
        currentReportSafe = false;
        break;
      }

      上下 = "下";
    }
  }
  return currentReportSafe;
}

Solution();