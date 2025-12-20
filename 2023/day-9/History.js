class History
{
    constructor(sequence)
    {
        this.sequences = [];
        this.sequences.push(sequence); // array of array sequences
        this.nextValue = this.NextValueInSequence();
    }

    NextValueInSequence()
    {
        let zeroSequence = false;   // used to escape loop once condition is met
        let sequenceIndex = 0;     //used to go sequence by sequence

        // 1. make new arrays until the "0 sequence" is found

        while (!zeroSequence)
        {
            // break if "0 sequence" found
            if (this.sequences[sequenceIndex].reduce((zeroSoFar, a) => zeroSoFar && a === 0, true))
            {
                zeroSequence = true;
                break;
            }
            // calculate next sequence otherwise
            else
            {
                let nextSequence = [];
                for (let n = 0; n < this.sequences[sequenceIndex].length - 1; n++)
                {
                    let diff = (this.sequences[sequenceIndex][n + 1]) - (this.sequences[sequenceIndex][n]);
                    //console.log(`The difference is ${diff}`); //debug
                    nextSequence.push(diff);
                }
                //console.log("End of that loop"); //debug
                this.sequences.push(nextSequence);
                sequenceIndex++;
            }
        }

        //console.log(this.sequences); //debug

        // 2. Go through all arrays in reverse order until index = 0. Set last value of array 0 to nextValue.

        let reverseIndex = this.sequences.length - 1;
        this.sequences[reverseIndex].push(0);

        while (reverseIndex > 0)
        {
            //console.log("running"); //debug
            let endOfSequenceAbove = this.sequences[reverseIndex - 1][this.sequences[reverseIndex - 1].length - 1];
            let endOfSequenceBelow = this.sequences[reverseIndex][this.sequences[reverseIndex].length - 1];
            let nextValueInSequenceAbove = endOfSequenceAbove + endOfSequenceBelow;
            //console.log(`The next value is ${endOfSequenceAbove} + ${endOfSequenceBelow} = ${nextValueInSequenceAbove}`); //debug
                        
            this.sequences[reverseIndex - 1].push(nextValueInSequenceAbove);
            
            reverseIndex--;
        }

        //console.log(this.sequences); //debug

        return this.sequences[0][this.sequences[0].length - 1];
    }

}

module.exports = History;