export function HeuristicInformation(
    current: [number, number],
    next: [number, number],
    destination: [number, number],
    distanceMatrix: number[][][][]
) {
    return (
        1 /
        (distanceMatrix[next[0]][next[1]][destination[0]][destination[1]] +
            distanceMatrix[current[0]][current[1]][next[0]][next[1]])
    );
}
