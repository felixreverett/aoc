class Hand
{
    constructor(cards, bid)
    {
        this.cards = cards;                 // str[]
        this.cardQuantities = []            // 2d array
        this.bid = bid;                     // int
        this.type;                          // str
        this.rank;
        this.jesters = 0;
        
        this.type = this.CalculateType();   // set type

        if (cards.includes("J"))
        {
            for (let i = 0; i < cards.length; i++)
            {
                if (cards[i] === "J")
                {
                    this.jesters++;
                }
            }
            let text = `The hand of ${this.cards} has ${this.jesters} jesters and type ${this.type}`;
            this.type = this.AdjustTypeForJesters();
            console.log(`${text} --> returning type ${this.type}`);
        }
        
        this.cards.unshift(this.type);
    }

    CalculateType()
    {
        let cardQuantitiesMap = new Map();

        for (let c = 0; c < this.cards.length; c++)
        {
            let currentCard = this.cards[c];
            if (cardQuantitiesMap.has(currentCard))
            {
                let currentCardValue = cardQuantitiesMap.get(currentCard);
                cardQuantitiesMap.set(currentCard, currentCardValue + 1);
            }
            else
            {
                cardQuantitiesMap.set(currentCard, 1);
            }
        }

        this.cardQuantities = Array.from(cardQuantitiesMap);
        this.cardQuantities.sort((a, b) => b[1] - a[1]);
        
        switch(this.cardQuantities[0][1])
        {
            case 5:
                {
                    return "FiveOfAKind";
                }
            case 4:
                {
                    return "FourOfAKind";
                }
            case 3:
                {
                    switch(this.cardQuantities[1][1])
                    {
                        case 2:
                        {
                            return "FullHouse";
                        }
                        default:
                        {
                            return "ThreeOfAKind";
                        }
                    }
                }
            case 2:
                {
                    switch(this.cardQuantities[1][1])
                    {
                        case 2:
                        {
                            return "TwoPairs";
                        }
                        default:
                        {
                            return "OnePair";
                        }
                    }
                }
            default:
            {
                return "HighCard";
            }
        }
    }

    AdjustTypeForJesters()
    {
        switch (this.jesters)
        {
            case 5:
            case 4:
            {
                return "FiveOfAKind";
            }
            case 3:
            {
                if (this.type === "FullHouse")
                {
                    return "FiveOfAKind";
                }
                else // three of a kind from Jesters
                {
                    return "FourOfAKind";
                }
            }
            case 2:
            {
                if (this.type === "FullHouse")
                {
                    return "FiveOfAKind";
                }
                else if (this.type === "TwoPairs")
                {
                    return "FourOfAKind";
                }
                else{
                    return "ThreeOfAKind";
                }
            }
            case 1:
            {
                if (this.type === "FourOfAKind")
                {
                    return "FiveOfAKind";
                }
                else if (this.type === "ThreeOfAKind")
                {
                    return "FourOfAKind";
                }
                else if (this.type === "TwoPairs")
                {
                    return "FullHouse";
                }
                else if (this.type === "OnePair")
                {
                    return "ThreeOfAKind";
                }
                else if (this.type === "HighCard")
                {
                    return "OnePair";
                }
            }
        }
    }
}

module.exports = Hand;