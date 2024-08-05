class MapB
{
    constructor(mapSource, mapDestination, mapInput)
    {
        this.MapSource = mapSource;
        this.MapDestination = mapDestination;
        this.Maps = this.GenerateMaps(mapInput);

        console.log(`Map source: ${mapSource} | Map destination: ${mapDestination}`);
        console.log(this.Maps);
    }

    GenerateMaps(mapInput)
    {
        mapInput.sort((a,b) => a[1] - b[1]);
        return mapInput;
    }
}

module.exports = MapB;