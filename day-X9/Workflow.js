const Condition = require("./Condition.js");
const DefaultCondition = require("./DefaultCondition.js");

class Workflow
{
    constructor(name, conditions)
    {
       this.Name = name;
       this.Conditions = this.GenerateConditions(conditions);
    }

    GenerateConditions(conditions)
    {
        let Conditions = [];
        let conditionsList = conditions.split(",");
        for (let c = 0; c < conditionsList.length - 1; c++)
        {
            let letter = conditionsList[c][0]; // letter
            let operator = conditionsList[c][1]; // < or >
            let result = conditionsList[c].substring(2);
            Conditions.push(new Condition(letter, operator, result));
        }
        Conditions.push(new DefaultCondition(conditionsList[conditionsList.length - 1]));
        return Conditions;
    }
    
}

module.exports = Workflow;