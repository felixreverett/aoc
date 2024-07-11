class Module
{
    constructor(m)
    {
        this.Name = m[0][0] === "%" || m[0][0] === "&" ? m[0].substr(1) : m[0];
        this.Type = m[0][0] === "%" ? "Flip-flop" : m[0][0] === "&" ? "Conjunction" : "Typeless";
        this.Destinations = m[1].split(", ");
        this.ConnectedSources = []; // connected sources and their state
        this.FlipFlop = false; // only applicable to Flip-flop modules
    }

    ReceivePulse(source, signal)
    {
        switch (this.Type)
        {
            case "Flip-flop":
            {
                if (signal === "low")
                {
                    this.FlipFlop = !this.FlipFlop;
                    let outSignal = this.FlipFlop ? "High" : "Low";
                    this.SendPulse(outSignal);
                }
                break;
            }
            case "Conjunction":
            {
                this.ConnectedSources.filter(i => i[0] === source)[1] = signal;

                let anyLowPulsesInConnectedSources = false;
                for (let cs = 0; cs < this.ConnectedSources.length; cs++)
                {
                    if (this.ConnectedSources[cs][1] === "Low") { anyLowPulsesInConnectedSources = true; }
                }
                
                let outSignal = anyLowPulsesInConnectedSources ? "High" : "Low" ;

                break;
            }
            case "Typeless":
            {
                console.log("Error: no Type found");
            }
        }
    }

    SendPulse(outSignal)
    {
        // A list of 'pulses' to be processed in the next cycle
        let outPulses = [];

        for (let d = 0; d < this.Destinations.length; d++)
        {
            outPulses.push([this.Name, outSignal, this.Destinations[d]]);
        }

        return outPulses;
    }
}

module.exports = Module;