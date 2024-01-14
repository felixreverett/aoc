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
    /*
    let lines = fs.readFileSync("day-6/sample-input-2023-6.txt", "utf-8")
        .replace("\r", "")
        .split("\n");
    let raceTimeList = lines[0].split(" ").filter(i => i !== "Time:").filter(i => i !== "");
    let recordDistanceList = lines[1].split(" ").filter(i => i !== "Distance:").filter(i => i !== "");
    let marginOfErrorList = [];

    for (let race = 0; race < raceTimeList.length; race++)
    {
        let lowerLimit = getLowerLimit(0, raceTimeList[race], recordDistanceList[race], raceTimeList[race]);
        //let UpperLimit = getUpperLimit(0, raceTimeList[race], recordDistanceList[race], raceTimeList[race]);
        //marginOfErrorList.push(UpperLimit - lowerLimit + 1);
    }
    */

    //console.log(marginOfErrorList);

    
    let lowerLimit = getLowerLimit(0, 7, 9, 7); // every value above this and below upper limit is valid
    let lowerLimitDistance = ReturnDistanceFromPressTime(lowerLimit, 7);
    console.log(`The lower limit is: ${lowerLimit}ms which would give you the distance of ${lowerLimitDistance}`);

    let upperLimit = getUpperLimit(0, 7, 9, 7); // every value above this and below upper limit is valid
    let upperLimitDistance = ReturnDistanceFromPressTime(upperLimit, 7);
    console.log(`The upper limit is: ${upperLimit}ms which would give you the distance of ${upperLimitDistance}`);


}

function getLowerLimit(min, max, recordDistance, raceTime)
{
    let midPoint = Math.floor((min + max)/2);
    let newDistance = ReturnDistanceFromPressTime(midPoint, raceTime);
    console.log(`At midpoint ${midPoint}, the distance gained is ${newDistance} and needs to be >= ${recordDistance}`);
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
    let midPoint = Math.ceil((min + max)/2);
    let newDistance = ReturnDistanceFromPressTime(midPoint, raceTime);
    console.log(`At midpoint ${midPoint}, the distance gained is ${newDistance} and needs to be >= ${recordDistance}`);
    if (newDistance === recordDistance)
    {
        console.log("upper limit found");
        return midPoint - 1; //highest value above the record
    }
    else if (newDistance > recordDistance) //output still too high, check higher inputs
    {
        console.log("newDistance > recordDistance --> output still too high. Check higher inputs");
        return getUpperLimit(midPoint + 1, max, recordDistance, raceTime);
    }

    else //newDistance < recordDistance --> we've gone beyond the upper limit. Check one lower
    {
        console.log("newdistance < recordDistance --> output too low. Check lower");
        if (ReturnDistanceFromPressTime(midPoint + 1) <= recordDistance)
        {
            return midPoint;
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