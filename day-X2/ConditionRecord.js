class ConditionRecord
{
    constructor(condition, contiguousGroups)
    {
        this.condition = condition; // string
        this.contiguousGroups = contiguousGroups; // list
        this.possibleArrangements;
    }
}

module.exports = ConditionRecord;