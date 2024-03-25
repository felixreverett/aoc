class Pattern
{
    constructor(patternData)
    {
       this.patternData = patternData;
       this.rowLength = patternData[0].length;
       this.colLength = patternData.length;
    }
}

module.exports = Pattern;