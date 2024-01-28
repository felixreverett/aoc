class History
{
    constructor(sequence)
    {
        this.sequences = [];
        this.sequences.push(sequence); // array of array sequences
        /*this.nextValue = */this.NextValueInSequence();
    }

    NextValueInSequence()
    {
        let zeroSequence = false;   // used to escape loop once condition is met
        let sequenceIndex = 0;     //used to go sequence by sequence

        // 1. make new arrays until the "0 sequence" is found

        while (!zeroSequence)
        {
            // break if "0 sequence" found
            if (this.sequences[sequenceIndex].reduce((partialSum, a) => partialSum + a, 0) === 0)
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
                    console.log(`The difference is ${diff}`); //debug
                    nextSequence.push(diff);
                }
                console.log("End of that loop"); //debug
                this.sequences.push(nextSequence);
                sequenceIndex++;
            }
        }

        console.log(this.sequences); //debug

        // 2. Go through all arrays in reverse order until index = 0. Set last value of array 0 to nextValue.
    }

}

module.exports = History;