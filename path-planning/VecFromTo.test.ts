import { assert } from "chai";
import { describe, it } from "vitest";
import { Point } from "./Point";
import { VecFromTo } from "./VecFromTo";


describe("VecFromTo测试用例", () => {
    it("测试从点A到点B的向量", () => {
        let from = new Point(0, 0);
        let to = new Point(1, 2);
        let vec = VecFromTo(from, to);
        assert.equal(vec.x, 1);
        assert.equal(vec.y, 2);
    });

    it("测试从点A到点B的向量，点A和点B相同", () => {
        let from = new Point(0, 0);
        let to = new Point(0, 0);
        let vec = VecFromTo(from, to);
        assert.equal(vec.x, 0);
        assert.equal(vec.y, 0);
    });
});
