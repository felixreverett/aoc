class ConditionRecord
{
    constructor(record, contiguousGroups)
    {
        this.record = record; // string
        this.contiguousGroups = contiguousGroups; // list
        
        this.recordTimesFive = record;
        this.contiguousGroupsTimesFive = contiguousGroups;
        for (let i = 0; i < 4; i ++)
        {
            this.recordTimesFive += "?" + record;
            this.contiguousGroupsTimesFive = this.contiguousGroupsTimesFive.concat(contiguousGroups);
        }

        this.recordTimesFive;
        this.totalArrangements = this.CalculateArrangements(this.recordTimesFive, this.contiguousGroupsTimesFive, 0);
    }

    CalculateArrangements(record, contiguousGroups, sum)
    {
        let indexOfQ = record.indexOf("?");

        if (indexOfQ !== -1)
        {
            let newRecordA = record.replace("?", ".");
            sum = this.CalculateArrangements(newRecordA, contiguousGroups, sum);

            let newRecordB = record.replace("?", "#");
            sum = this.CalculateArrangements(newRecordB, contiguousGroups, sum);

            return sum;
        }

        else
        {
            // test if valid. increment if valid.
            let brokenRecord = record.split(".").filter(i => i !== "");
            
            let valid = false;
            if (contiguousGroups.length === brokenRecord.length)
            {
                valid = true;

                for (let i = 0; i < brokenRecord.length; i++)
                {
                    if (brokenRecord[i].length !== contiguousGroups[i])
                    {
                        valid = false;
                    }
                }
            }

            if (valid)
            {
                return sum + 1;
            }
            else
            {
                return sum;
            }
        }
    }
}

module.exports = ConditionRecord;