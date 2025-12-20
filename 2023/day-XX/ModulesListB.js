const crypto = require('crypto');

class ModulesManagerB
{
    constructor(list)
    {
        this.List = list;
        this.States = [];
        this.CycleNumber;
        this.LoopFound = false;
        this.LoopStart; this.LoopEnd;
        this.LowPulseSentToRX = false;
        this.LowPulseSentToTarget = false; //dc, rv, vp, cq all need to receive low pulse (thus output high pulse) in the same cycle
        this.PopulateModuleConnectedSources();
    }

    // Fill in ConnectedSources for every Module by iterating through the Destinations of each module
    PopulateModuleConnectedSources()
    {
        for (let m = 0; m < this.List.length; m++)
        {
            for (let d = 0; d < this.List[m].Destinations.length; d++)
            {
                let destinationName = this.List[m].Destinations[d];
                let destinationModule = this.List.find(i => i.Name === destinationName);
                if (destinationModule)
                {
                    let isAlreadyConnected = destinationModule.ConnectedSources.some(source => source[0] === destinationName);
                    if (!isAlreadyConnected)
                    {
                        destinationModule.ConnectedSources.push([this.List[m].Name, "Low"]);
                    }
                }
            }
        }
    }

    PushButton(cycleNumber)
    {
        let thisCyclePulses = []; thisCyclePulses.push(["button", "Low", "broadcaster"]);
        let lowCount = 1; let highCount = 0;
        
        while (thisCyclePulses.length > 0)
        {
            //console.log(`This cycle's pulses is: ${thisCyclePulses}`); //debug
            let nextCyclePulses = [];

            for (let signal = 0; signal < thisCyclePulses.length; signal++)
            {
                let currentPulse = thisCyclePulses[signal];
                let module = this.List.find(i => i.Name === currentPulse[2]);
                if (module != null)
                {
                    //console.log(`> Sending signal "${thisCyclePulses[signal][1]}" to module "${module.Name}"`); //debug
                    let sentPulses = module.SendPulse(module.ReceivePulse(currentPulse[0], currentPulse[1]));
                    if (sentPulses.some(pulse => pulse[2] === "cq" && pulse[1] === "Low"))
                    {
                        //this.LowPulseSentToRX = true;
                        this.LowPulseSentToTarget = true; //dc (3796 +1), rv (4050 +1), vp (3846 +1), cq (3876 +1) LCM = 229,414,480,926,893
                    }
                    nextCyclePulses = nextCyclePulses.concat(sentPulses);
                }
            }
            //console.log(nextCyclePulses);

            // count up all low and high pulses for the next cycle
            for (let p = 0; p < nextCyclePulses.length; p++)
            {
                let pulseType = nextCyclePulses[p][1];
                if (pulseType === "Low") { lowCount++; }
                else if (pulseType === "High") { highCount++; }
                else { throw new Error("Error: Pulse was neither Low or High"); }
            }
            
            thisCyclePulses = nextCyclePulses;
        }

        let state = this.GetStateAsHash();

        let matchingState = this.States.find(i => i[0] === state);

        if (matchingState === undefined)
        {
            //console.log("no state found"); //debug
            this.States.push( [state, cycleNumber, lowCount, highCount] );
        }
        else
        {
            this.LoopFound = true; this.LoopStart = matchingState[1]; this.LoopEnd = cycleNumber;
            //console.log(`Loop found between states ${this.LoopStart} and ${this.LoopEnd}`);
        }

        //console.log("[!] One button Cycle complete");
        //console.log(`[!] The state is: ${this.GetStateAsHash()}`);
        //console.log(`[!] Low pulses sent: ${lowCount} | High pulses sent ${highCount}`)
    }

    GetStateAsHash()
    {
        let state = [];
        for (let m = 0; m < this.List.length; m++)
        {
            state.push(this.List[m].GetState());
        }
        return crypto.createHash('sha256').update(state.join()).digest('hex');
    }


    GetTotalLowAndHighPulses()
    {
        let totalLow = 0;
        let totalHigh = 0;
        
        for (let s = 0; s < this.States.length; s++)
        {
            totalLow += this.States[s][2];
            totalHigh += this.States[s][3];
        }

        return [ totalLow, totalHigh ];
    }

    GetTotalLowAndHighPulsesInLoop()
    {
        let totalLow = 0;
        let totalHigh = 0;
        
        for (let s = this.LoopStart; s < this.States.length; s++)
        {
            totalLow += this.States[s][2];
            totalHigh += this.States[s][3];
        }

        return [ totalLow, totalHigh ];
    }

    GetTotalLowAndHighPulsesBeforeLoop()
    {
        let totalLow = 0;
        let totalHigh = 0;
        
        for (let s = 0; s < this.LoopStart; s++)
        {
            totalLow += this.States[s][2];
            totalHigh += this.States[s][3];
        }

        return [ totalLow, totalHigh ];
    }

    GetTotalLowAndHighPulsesAfterLoop(endIndex)
    {
        let totalLow = 0;
        let totalHigh = 0;
        
        for (let s = 0; s < endIndex; s++)
        {
            totalLow += this.States[s][2];
            totalHigh += this.States[s][3];
        }

        return [ totalLow, totalHigh ];
    }

    GetAnswer(buttonPresses)
    {
        // get totalLow and totalHigh pulses between loop start and loop end
        let [ totalLow, totalHigh ] = this.GetTotalLowAndHighPulsesInLoop();
        
        // get all other Low and High pulses prior to the loop start
        let [ extraLowBefore, extraHighBefore ] = this.GetTotalLowAndHighPulsesBeforeLoop();

        // number of loops found
        let loopLength = this.LoopEnd - this.LoopStart;
        let numberOfLoops = (buttonPresses - this.LoopStart) / loopLength;

        // get all other Low and High pulses after the last full loop cycle completes
        let fractionOfLoopAfterLastFullLoop = numberOfLoops - Math.floor(numberOfLoops);
        let endIndexOfPartialLoop = parseInt(fractionOfLoopAfterLastFullLoop * loopLength);
        let [ extraLowAfter, extraHighAfter ] = this.GetTotalLowAndHighPulsesAfterLoop(endIndexOfPartialLoop);

        // get final total low and high pulses sent
        let grandTotalLow = totalLow * numberOfLoops + extraLowBefore + extraLowAfter;
        let grandTotalHigh = totalHigh * numberOfLoops + extraHighBefore + extraHighAfter;

        // Multiply final low and high pulses
        let answer = grandTotalLow * grandTotalHigh;
        console.log(`Loop length: ${loopLength}`);
        console.log(`Number of loops: ${numberOfLoops}`);
        console.log(`Fraction of loop after last full loop: ${fractionOfLoopAfterLastFullLoop}`);
        console.log(`Loop start and end points: ${this.LoopStart} | ${this.LoopEnd}`);
        console.log(`Answer: ${answer}`);
        return answer;
    }
}

module.exports = ModulesManagerB;