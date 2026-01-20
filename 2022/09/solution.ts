import * as fs from 'fs';
import * as path from 'path';

function PartOne(path: string): { solution: number; duration: string} {
    
    const start = performance.now();

    let input = fs.readFileSync(path, "utf-8")
        .replace(/\r/gm, "")
        .split("\n")
        .map(i => {
            const j = i.split(" ");
            return [j[0], parseInt(j[1])];
        });

    
    let headPosition = [0, 0];
    let tailPosition = headPosition;

    let visitedPositions = new Set<string>();

    for (let i = 0; i < input.length; i++) {
        const {direction, magnitude} = input[i];
        const vector = (direction: string) => ({
            'R': [0, 1],
            'U': [-1, 0],
            'L': [0, -1],
        }[direction] || [1,0]);
        for (let j = 1; j <= magnitude; j++) {
            headPosition[0] += vector[0];
            headPosition[1] += vector[1];
            const rowDifference = headPosition[0] - tailPosition[0]
            const colDifference = headPosition[1] - tailPosition[1]
            if (rowDifference > 1) {
                tailPosition[0] += vector[0];
                tailPostion[1] = headPosition[1];
            } else if (colDifference > 1) {
                tailPosition[1] += vector[1];
                tailPosition[0] = headPosition[0];
            }
            const key = `${tailPosition[0]},${tailPosition[1]}`;
            visitedPositions.add(key);
        }
    }

    console.log(input);
    // do something here

    let solution = 0
    const duration = (performance.now() - start).toFixed(4) + 'ms'

    return { solution: solution, duration: duration}
}

function main(): void {
    const filePath = path.join(__dirname, "sample-input.txt");

    const {solution, duration} = PartOne(filePath);
    console.log(`Part 1 Solution: ${solution}\nTime Part 1: ${duration}`);
    //PartTwo();
}

main();