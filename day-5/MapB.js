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
        mapInput.sort((a,b) => b[0] - a[0]);
        return mapInput;
    }
}

module.exports = MapB;