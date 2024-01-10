import { assert } from "chai";
import { describe, it } from "vitest";

import { containedByFanArea } from "./containedByFanArea";
import { Point } from "./Point";

describe("containedByFanArea函数测试", () => {
    it("测试用例1", () => {
        let o = new Point(0, 0);
        let p = new Point(2, 0);
        let q = new Point(0, 2);
        let x = new Point(1, 1);
        let y = new Point(2, 2);
        let z = new Point(-1, 1);

        assert.equal(containedByFanArea(o, p, q, x), true);
        assert.equal(containedByFanArea(o, p, q, y), true);
        assert.equal(containedByFanArea(o, p, q, z), false);
        assert.equal(containedByFanArea(o, p, q, o), true);
        assert.equal(containedByFanArea(o, p, q, p), true);
        assert.equal(containedByFanArea(o, p, q, q), true);
    });
    it("测试用例1", () => {
        let o = new Point(0, 0);
        let p = new Point(1, 1);
        let q = new Point(-1, 1);
        let ij = new Point(0, 1);

        let result = containedByFanArea(o, p, q, ij);
        assert.equal(result, true);
    });

    it("测试用例2", () => {
        let o = new Point(0, 0);
        let p = new Point(1, 1);
        let q = new Point(-1, 1);
        let ij = new Point(0, -1);

        let result = containedByFanArea(o, p, q, ij);
        assert.equal(result, false);
    });

    it("异常测试", () => {
        let o = new Point(0, 0);
        let p = new Point(1, 1);
        let q = new Point(-1, 1);
        let ij = new Point(0, 0);

        let result = containedByFanArea(o, p, q, ij);

        assert.equal(result, true);
    });

    it("测试用例1", () => {
        let o = new Point(0, 0);
        let p = new Point(1, 1);
        let q = new Point(1, 0);
        let ij = new Point(0, 1);

        let result = containedByFanArea(o, p, q, ij);
        assert.equal(result, true);
    });
    it("测试用例1", () => {
        let o = new Point(0, 0);
        let p = new Point(1, 1);
        let q = new Point(1, 0);
        let ij = new Point(2, 1);

        let result = containedByFanArea(o, p, q, ij);
        assert.equal(result, false);
    });
    it("测试用例1", () => {
        let o = new Point(0, 0);
        let p = new Point(1, 1);
        let q = new Point(1, 0);
        let ij = new Point(-2, -1);

        let result = containedByFanArea(o, p, q, ij);
        assert.equal(result, true);
    });
});
