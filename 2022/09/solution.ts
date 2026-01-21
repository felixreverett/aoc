import * as fs from 'fs';
import * as path from 'path';

function PartOne(path: string): { solution: number; duration: string} {
    
    const start = performance.now();

    let input = fs.readFileSync(path, "utf-8")
        .replace(/\r/gm, "")
        .split("\n")
        .map(i => {
            const j = i.split(" ");
            return [j[0], parseInt(j[1])] as [string, number];
        });

    let headPosition = [0, 0];
    let tailPosition = [0, 0];

    let visitedPositions = new Set<string>();
    visitedPositions.add(`0,0`);

    for (let i = 0; i < input.length; i++) {

        const [direction, magnitude] = input[i];

        let vector: [number, number];

        switch (direction) {
            case 'R':
                vector = [0, 1];
                break;
            case 'U':
                vector = [-1, 0];
                break;
            case 'L':
                vector = [0, -1];
                break;
            case 'D':
            default:
                vector = [1, 0];
                break;
        }

        for (let j = 1; j <= magnitude; j++) {
            headPosition[0] += vector[0];
            headPosition[1] += vector[1];

            const rowDifference = Math.abs(headPosition[0] - tailPosition[0]);
            const colDifference = Math.abs(headPosition[1] - tailPosition[1]);

            if (rowDifference > 1) {
                tailPosition[0] += vector[0];
                tailPosition[1] = headPosition[1];
            } else if (colDifference > 1) {
                tailPosition[1] += vector[1];
                tailPosition[0] = headPosition[0];
            }
            const key = `${tailPosition[0]},${tailPosition[1]}`;
            visitedPositions.add(key);
        }
    }

    const duration = (performance.now() - start).toFixed(4) + 'ms'

    return { solution: visitedPositions.size, duration: duration}
}

function main(): void {
    const filePath = path.join(__dirname, "input.txt");

    const {solution, duration} = PartOne(filePath);
    console.log(`Part 1 Solution: ${solution}\nTime Part 1: ${duration}`);
    //PartTwo();
}

main();