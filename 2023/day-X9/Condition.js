class Condition
{
    constructor(letter, operator, value, result)
    {
       this.Letter = letter;
       this.Operator = operator;
       this.Value = parseInt(value);
       this.Result = result;
    }
}

module.exports = Condition;