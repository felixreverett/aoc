class Module
{
    constructor(m)
    {
        this.Name = m[0][0] === "%" || m[0][0] === "&" ? m[0].substr(1) : m[0];
        this.Type = m[0][0] === "%" ? "Flip-flop" : m[0][0] === "&" ? "Conjunction" : "Typeless";
        this.Destinations = m[1].split(", ");
        this.ConnectedSources = []; // connected sources and their state (used by Conjunction type only)
        this.FlipFlop = false; // (used by Flip-flop type only)
    }

    ReceivePulse(source, inSignal)
    {
        console.log(`> Module "${this.Name}" received signal "${inSignal}" from "${source}"`); //debug
        let outSignal = inSignal;
        switch (this.Type)
        {
            case "Flip-flop": // %
            {
                if (inSignal === "Low")
                {
                    this.FlipFlop = !this.FlipFlop;
                    outSignal = this.FlipFlop ? "High" : "Low";
                }
                break;
            }
            case "Conjunction": // &
            {
                let connectedSource = this.ConnectedSources.find(i => i[0] === source);
                if (connectedSource === null) { throw new Error("Error: no connected source found."); }
                connectedSource[1] = inSignal;

                let anyLowPulsesInConnectedSources = false;
                
                for (let cs = 0; cs < this.ConnectedSources.length; cs++)
                {
                    if (this.ConnectedSources[cs][1] === "Low") { anyLowPulsesInConnectedSources = true; }
                }
                
                outSignal = anyLowPulsesInConnectedSources ? "High" : "Low" ;

                break;
            }
            case "Typeless":
            {
                outSignal = inSignal;
                break;
            }
        }
        
        return outSignal;
    }

    SendPulse(outSignal)
    {
        // A list of 'pulses' to be processed in the next cycle
        console.log(`> Module "${this.Name}" transmitting signal of "${outSignal}" to n = ${this.Destinations.length} destinations`); //debug
        
        let outPulses = [];

        for (let d = 0; d < this.Destinations.length; d++)
        {
            outPulses.push([this.Name, outSignal, this.Destinations[d]]);
        }

        return outPulses;
    }

    GetState()
    {
        return this.Name + this.Type + this.Destinations.join() + this.ConnectedSources.map(i => i.join()).join() + this.FlipFlop;
    }
}

module.exports = Module;