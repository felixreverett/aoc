class ConditionRecord
{
    constructor(record, contiguousGroups)
    {
        this.record = record; // string
        this.contiguousGroups = contiguousGroups; // list

        this.possibleXArrangements = 0;
        this.possibleX2Arrangements = 0;
        this.possibleX3Arrangements = 0;
        this.possibleX4Arrangements = 0;
        this.possibleX5Arrangements = 0;

        this.possibleTotalArrangements = 0;

        this.possibleXArrangements = this.CalculateArrangements(this.record, 0);

        // X?X?X?X?X = 16 arrangements
        // .X. -> multiply result by possibleXarrangements
        // X#X.X#X -> calculate separately, multiply results together.
        let groupRecord = "X?X?X?X?X";
        this.CalculateTotalArrangements(groupRecord);
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

    CalculateTotalArrangements(groupRecord)
    {
        let indexOfQ = groupRecord.indexOf("?");

        if (indexOfQ !== -1)
        {
            let newGroupRecordA = groupRecord.replace("?", ".");
            this.CalculateTotalArrangements(newGroupRecordA);

            let newGroupRecordB = groupRecord.replace("?", "#");
            this.CalculateTotalArrangements(newGroupRecordB);
        }

        else
        {
            console.log(groupRecord);
        }
    }
}

module.exports = ConditionRecord;