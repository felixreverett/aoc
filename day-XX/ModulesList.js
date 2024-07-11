class ModulesList
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


    ExportStateHash()
    {

    }
}

module.exports = ModulesList;