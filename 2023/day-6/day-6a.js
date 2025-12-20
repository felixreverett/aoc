//day 6a

/* Solution Plan:
> Parse input into list of boat races where boatRace contains: int recordDistance, int raceTime, ...
> We can assume a range T1 <= X <= T2 where every value in that range beats the currentRecord
> So all we need to do is find T1 and T2 for every value and we have our solution.

> 1) Let's make a method that quickly gets us the distance gained from pressing the button for a given time
> 2) An initial way I can think of to find where the distance gained exceeds the record is to start in the middle of the range,
>    if above record: {check middle of lower half} else if below record {check middle of upper half}
>    I can repeat this to find the upper limit, too, with different code executed when I finally reach the record.
*/
var fs = require("fs"); // imports fs

function DaySix()
{
    let lines = fs.readFileSync("day-6/input-2023-6.txt", "utf-8")
        .replace("\r", "")
        .split("\n");
    let raceTimeList = lines[0].split(" ").filter(i => i !== "Time:").filter(i => i !== "");
    let recordDistanceList = lines[1].split(" ").filter(i => i !== "Distance:").filter(i => i !== "");
    let marginOfErrorList = [];

    for (let race = 0; race < raceTimeList.length; race++)
    {
        let lowerLimit = getLowerLimit(0, raceTimeList[race], recordDistanceList[race], raceTimeList[race]);
        let lowerLimitDistance = ReturnDistanceFromPressTime(lowerLimit, 7);
        
        let upperLimit = getUpperLimit(0, raceTimeList[race], recordDistanceList[race], raceTimeList[race]);
        let upperLimitDistance = ReturnDistanceFromPressTime(upperLimit, 7);
        marginOfErrorList.push(upperLimit - lowerLimit + 1);
    }
    
    let totalMargin = 1;
    for (let i = 0; i < marginOfErrorList.length; i++)
    {
        totalMargin *= marginOfErrorList[i];
    }

    console.log(`The total margin of error is ${totalMargin}`);

}

function getLowerLimit(min, max, recordDistance, raceTime)
{
    let midPoint = Math.floor((min + max)/2);
    let newDistance = ReturnDistanceFromPressTime(midPoint, raceTime);
    if (newDistance === recordDistance)
    {
        console.log("lower limit found");
        return midPoint;
    }
    else if (newDistance > recordDistance)
    {
        if (ReturnDistanceFromPressTime(midPoint - 1, raceTime) <= recordDistance)
        {
            return midPoint;
        }
        else
        {
            return getLowerLimit(min, midPoint, recordDistance, raceTime);
        }
    }
    else //newDistance < recordDistance
    {
        return getLowerLimit(midPoint + 1, max, recordDistance, raceTime);
    }
}

function getUpperLimit(min, max, recordDistance, raceTime)
{
    let midPoint = Math.floor((min + max)/2);
    let newDistance = ReturnDistanceFromPressTime(midPoint, raceTime);
    
    if (newDistance === recordDistance)
    {
        return midPoint - 1; //highest value above the record
    }
    else if (newDistance > recordDistance) //output still too high, check higher inputs
    {
        if (ReturnDistanceFromPressTime(midPoint + 1, raceTime) <= recordDistance)
        {
            return midPoint; // this is the highest index above the record
        }
        else
        {
            return getUpperLimit(midPoint, max, recordDistance, raceTime);
        }
    }

    else //newDistance < recordDistance --> we've gone beyond the upper limit. Check one lower
    {
        if (ReturnDistanceFromPressTime(midPoint - 1, raceTime) > recordDistance)
        {
            // The midpoint was one higher than the upper limit, so return midPoint - 1
            return midPoint - 1;
        }
        else
        {
            return getUpperLimit(min, midPoint - 1, recordDistance, raceTime);
        }
    }
}

function ReturnDistanceFromPressTime(pressTime, raceTime)
{
    return pressTime * (raceTime - pressTime);    
}

DaySix();