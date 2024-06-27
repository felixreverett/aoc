class Part
{
    constructor(/* integers */ x, m, a, s)
    {
       this.X = parseInt(x);
       this.M = parseInt(m);
       this.A = parseInt(a);
       this.S = parseInt(s);
       this.IsAccepted = null; // True or False
    }
}

module.exports = Part;