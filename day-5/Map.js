class Map
{
    constructor(mapSrc, mapDest)
    {
        this.mapSrc = mapSrc;
        this.mapDest = mapDest;
        this.mapData = [];
    }

    AddData(data)
    {
        this.mapData.push(data);
    }
}

module.exports = Map;