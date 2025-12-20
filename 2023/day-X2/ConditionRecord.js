class ConditionRecord
{
    constructor(record, contiguousGroups)
    {
        this.record = record; // string
        this.contiguousGroups = contiguousGroups; // list
        this.totalArrangements = this.CalculateArrangements(this.record, 0);
    }

    CalculateArrangements(record, sum)
    {
        let indexOfQ = record.indexOf("?");

        if (indexOfQ !== -1)
        {
            let newRecordA = record.replace("?", ".");
            sum = this.CalculateArrangements(newRecordA, sum);

            let newRecordB = record.replace("?", "#");
            sum = this.CalculateArrangements(newRecordB, sum);

            return sum;
        }

        else
        {
            // test if valid. increment if valid.
            let brokenRecord = record.split(".").filter(i => i !== "");
            
            let valid = false;
            if (this.contiguousGroups.length === brokenRecord.length)
            {
                valid = true;

                for (let i = 0; i < brokenRecord.length; i++)
                {
                    if (brokenRecord[i].length !== this.contiguousGroups[i])
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