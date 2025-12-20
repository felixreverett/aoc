class InstructionB
{
    constructor(distance, direction)
    {
       this.distance = distance;
       this.direction = this.FindDirection(parseInt(direction));
    }

    FindDirection(direction)
    {
        switch (direction)
        {
            case 0: return "R";
            case 1: return "D";
            case 2: return "L";
            case 3: return "U";
            default: return null;
        }
    }
}

module.exports = InstructionB;