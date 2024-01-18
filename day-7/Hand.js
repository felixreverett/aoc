const Type = require("./Type.js");

class Hand
{
    constructor(cards, bid)
    {
        this.cards = cards;
        this.bid = bid;
        this.type;
        this.rank;
        this.CalculateType();
    }

    CalculateType()
    {

    }

}

module.exports = Hand;