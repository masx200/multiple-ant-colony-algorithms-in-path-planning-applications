import { expect } from "chai";
import { describe, it } from "vitest";

import { HeuristicInformation } from "./Heuristic-information.ts";

describe("HeuristicInformation", function () {
    it("should return a number close to the expected result", function () {
        const { getGridDistance, current, next, destination } =
            create_test_instance();
        const result = HeuristicInformation(
            current,
            next,
            destination,
            getGridDistance,
        );
        expect(result).to.be.closeTo(0.0005767012687427913, 0.0001);
    });
});

function create_test_instance() {
    const current: [number, number] = [1, 2];
    const next: [number, number] = [3, 4];
    const destination: [number, number] = [5, 6];
    const distanceMatrix = createDistanceMatrix();
    function getGridDistance(a: [number, number], b: [number, number]): number {
        return distanceMatrix[a[0]][a[1]][b[0]][b[1]];
    }
    return { current, next, destination, getGridDistance };
}

function createDistanceMatrix() {
    let k = 1;
    const column = 7,
        row = 7;
    const res: number[][][][] = Array(column)
        .fill(0)
        .map(() =>
            Array(row)
                .fill(0)
                .map(() =>
                    Array(column)
                        .fill(0)
                        .map(
                            () =>
                                Array(row)
                                    .fill(0)
                                    .map(() => k++) as number[],
                        ),
                ),
        );
    // console.log(JSON.stringify(res));
    // console.log(res[1][2][3][4], res[3][4][5][6]);
    return res;
}
