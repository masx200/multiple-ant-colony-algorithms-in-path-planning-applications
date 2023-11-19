import { expect } from "chai";
import { describe, it } from "vitest";
import { HeuristicInformation } from "./Heuristic-information.ts";


describe("HeuristicInformation", function () {
    const current: [number, number] = [1, 2];
    const next: [number, number] = [3, 4];
    const destination: [number, number] = [5, 6];
    const distanceMatrix = createDistanceMatrix();

    it("should return a number", function () {
        const result = HeuristicInformation(
            current,
            next,
            destination,
            distanceMatrix
        );
        expect(result).to.be.a("number");
    });

    it("should return a number close to the expected result", function () {
        const result = HeuristicInformation(
            current,
            next,
            destination,
            distanceMatrix
        );
        expect(result).to.be.closeTo(0.0005767012687427913, 0.0001);
    });
});

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
                                    .map(() => k++) as number[]
                        )
                )
        );
    // console.log(JSON.stringify(res));
    // console.log(res[1][2][3][4], res[3][4][5][6]);
    return res;
}
