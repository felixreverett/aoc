const crypto = require('crypto');

class ModulesManager
{
    constructor(list)
    {
        this.List = list;
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

    PushButton()
    {
        let thisCyclePulses = [["button", "Low", "broadcaster"]];
        
        while (thisCyclePulses.length > 0)
        {
            console.log(`This cycle's pulses is: ${thisCyclePulses}`); //debug
            let nextCyclePulses = [];

            for (let signal = 0; signal < thisCyclePulses.length; signal++)
            {
                let currentPulse = thisCyclePulses[signal];
                let module = this.List.find(i => i.Name === currentPulse[2]);
                console.log(`Signal ${thisCyclePulses[signal][1]} sent to module ${module.Name}`); //debug
                nextCyclePulses = module.SendPulse(module.ReceivePulse(currentPulse[0], currentPulse[1]));
                console.log(nextCyclePulses);
            }

            thisCyclePulses = nextCyclePulses;
        }

        console.log("One button Cycle complete");
        console.log(`The state is: ${this.GetStateAsHash()}`);
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
}

module.exports = ModulesManager;