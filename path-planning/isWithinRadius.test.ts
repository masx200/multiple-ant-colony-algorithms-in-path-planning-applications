import chai from "chai";
import { describe, it } from "vitest";
import { isWithinRadius } from "./isWithinRadius";
import { Point } from "./Point";

describe("isWithinRadius 函数测试", () => {
    it("正常情况下的测试 - 在半径内的点", () => {
        let p1 = new Point(1, 1);
        let radiusSquared = 4;
        chai.assert.isTrue(isWithinRadius(p1, radiusSquared));
    });

    it("正常情况下的测试 - 在半径外的点", () => {
        let p1 = new Point(2, 2);
        let radiusSquared = 1;
        chai.assert.isFalse(isWithinRadius(p1, radiusSquared));
    });
    it("正常情况下的测试 - 在半径内的点", () => {
        let p1 = new Point(1, 1);
        let radiusSquared = 2;
        chai.assert.isTrue(isWithinRadius(p1, radiusSquared));
    });

    it("正常情况下的测试 - 在半径外的点", () => {
        let p1 = new Point(2, 2);
        let radiusSquared = 8;
        chai.assert.isFalse(isWithinRadius(p1, radiusSquared));
    });
});
