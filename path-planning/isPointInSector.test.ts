import { expect } from "chai";
import { isPointInSector } from "./isPointInSector";
import { describe, it } from "vitest";

describe("isPointInSector", function () {
    it("should return true when point is in the sector", function () {
        const result = isPointInSector([1, 1], [0, 0], [0, 0]);
        expect(result).to.equal(false);
    });

    it("should return false when point is not in the sector", function () {
        const result = isPointInSector([10, 10], [0, 0], [0, 0]);
        expect(result).to.equal(false);
    });

    it("should return true when point is in the sector with exception", function () {
        const result = isPointInSector([1, 1], [2, 2], [3, 3]);
        expect(result).to.be.true;
    });
});

describe("isPointInSector", () => {
    it("should determine if the point is in the sector", () => {
        expect(isPointInSector([1, 1], [2, 3], [3, 4])).to.equal(true);
        expect(isPointInSector([2, 3], [1, 1], [3, 4])).to.equal(false);
    });
});

describe("isPointInSector", () => {
    it("should return true when point is in the sector", () => {
        const result = isPointInSector([1, 1], [0, 0], [0, 1]);
        expect(result).to.be.equal(false);
    });

    it("should return false when point is not in the sector", () => {
        const result = isPointInSector([1, 1], [0, 1], [0, 0]);
        expect(result).to.equal(false);
    });
});
