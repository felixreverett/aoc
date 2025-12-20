class ScratchCard
{
    constructor(cardID, wins, winningNumbers, cardNumbers, copies = 1)
    {
        this.cardID = cardID;
        this.wins = wins;
        this.winningNumbers = winningNumbers;
        this.cardNumbers = cardNumbers;
        this.copies = copies;
    }
}

module.exports = ScratchCard;