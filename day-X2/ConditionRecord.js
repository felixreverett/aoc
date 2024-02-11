class ConditionRecord
{
    constructor(record, contiguousGroups)
    {
        this.record = record; // string
        this.contiguousGroups = contiguousGroups; // list
        this.possibleArrangements = 0;
        this.CalculateArrangements(this.record);
    }

    CalculateArrangements(record)
    {
        let indexOfQ = record.indexOf("?");

        if (indexOfQ !== -1)
        {
            let newRecordA = record.replace("?", ".");
            this.CalculateArrangements(newRecordA);

            let newRecordB = record.replace("?", "#");
            this.CalculateArrangements(newRecordB);
        }

        else
        {
            //console.log(`Arrangement found at ${record}`);
            // test if valid. increment if valid.
            let brokenRecord = record.split(".").filter(i => i !== "");
            //console.log(`This is split into ${brokenRecord}`);
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
                console.log(`Valid arrangement found at ${brokenRecord}`);
                this.possibleArrangements++;
            }
        }
    }
}

module.exports = ConditionRecord;