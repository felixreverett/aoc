var fs = require("fs"); // imports fs

let input;

function Solution()
{
  input = fs.readFileSync("02/sample-input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(i => i.split(" ").map(j => parseInt(j)));

  console.log(input);

  let totalSafeReports = 0;

  // check every record
  for (let r = 0; r < input.length; r++)
  {
    console.log(r);
    totalSafeReports += ProcessReport(input[r]) ? 1 : 0;
  }

  // Solution
  console.log(`The total number of safe reports with a Problem Dampener is ${totalSafeReports}`);
}

function ProcessReport(report)
{
  // process every report and its permutations. If at least one is valid, return
  if (ProcessSubReport(report)) { return true; }

  for (let sr = 0; sr < report.length - 1; sr++)
  {
    let subReport = report.slice(0, sr)
      .concat(report.splice(sr + 1));
    console.log(`> Processing subreport ${sr + 1}/${report.length}: ${subReport}`);

    if (ProcessSubReport(subReport)) { return true; }
    console.log(`> > Invalid`);
  }

  console.log("no reports variants were true");
  return false;
}

function ProcessSubReport(report)
{
  let currentReportSafe = true;
  let 上下 = "unknown";

  // confirm levels are safe or unsafe
  for (let l = 0; l < report.length - 1; l++)
  {
    // validate difference between values
    
    if (report[l] === report[l + 1] || Math.abs(report[l] - report[l+1]) > 3)
    {
      currentReportSafe = false;
      break;
    }

    // l and l + 1 are ascending
    if (report[l] < report[l + 1])
    {
      if (上下 === "下")
      {
        currentReportSafe = false;
        break;
      }

      上下 = "上";
    }

    // l and l + 1 are descending
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