class Hand
{
    constructor(cards, bid)
    {
        this.cards = cards;                 // str[]
        this.cardQuantities = []            // 2d array
        this.bid = bid;                     // int
        this.type;                          // str
        this.rank;
        //console.log(this.cardQuantities);
        this.type = this.CalculateType();   // set type
        //console.log(this.cardQuantities);
        //console.log(this.type);
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

}

module.exports = Hand;