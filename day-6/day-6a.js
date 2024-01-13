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
    console.log(`The lower limit is: ${getLowerLimit(0, 30, 200, 30)}`);
}

function getLowerLimit(min, max, recordDistance, raceTime)
{
    let midPoint = Math.ceil((min + max)/2);
    let newDistance = ReturnDistanceFromPressTime(midPoint, raceTime);
    console.log(`At midpoint ${midPoint}, the distance gained is ${newDistance}`);
    if (newDistance === recordDistance)
    {
        console.log("lower limit found");
        return midPoint;
    }
    else if (newDistance > recordDistance)
    {
        return getLowerLimit(min, midPoint, recordDistance, raceTime);
    }
    else //newDistance < recordDistance
    {
        return getLowerLimit(midPoint, max, recordDistance, raceTime);
    }
}

function ReturnDistanceFromPressTime(pressTime, raceTime)
{
    return pressTime * (raceTime - pressTime);    
}

DaySix();