import { beforeEach, describe, expect, it } from "vitest";
import { Vector } from "./Vector";


describe("Vec", () => {
    it("构造函数", () => {
        let v = new Vector(1, 2);
        expect(v.x).toBe(1);
        expect(v.y).toBe(2);
    });

    it("length()方法", () => {
        let v = new Vector(1, 2);
        expect(v.length()).toBe(Math.sqrt(1 + 4));
    });

    it("siz()方法", () => {
        let v = new Vector(1, 2);
        expect(v.siz()).toBe(1 + 4);
    });

    it("dot()方法", () => {
        let v1 = new Vector(1, 2);
        let v2 = new Vector(2, 3);
        expect(v1.dot(v2)).toBe(2 + 6);
    });

    it("cos()方法", () => {
        let v1 = new Vector(1, 2);
        let v2 = new Vector(2, 3);
        expect(v1.cos(v2)).toBeCloseTo(0.9922778767136677);
    });
});

describe("Vec", () => {
    let vec: Vector;

    beforeEach(() => {
        vec = new Vector(3, 4);
    });

    describe("#constructor()", () => {
        it("should set the x and y properties correctly", () => {
            expect(vec.x).toBe(3);
            expect(vec.y).toBe(4);
        });
    });

    describe("#length()", () => {
        it("should calculate the vector length correctly", () => {
            expect(vec.length()).toBeCloseTo(Math.sqrt(25));
        });
    });

    describe("#siz()", () => {
        it("should calculate the distance to the origin squared correctly", () => {
            expect(vec.siz()).toBe(25);
        });
    });

    describe("#dot()", () => {
        let otherVec: Vector;

        beforeEach(() => {
            otherVec = new Vector(1, 2);
        });

        it("should calculate the dot product correctly", () => {
            expect(vec.dot(otherVec)).toBe(11);
        });
    });

    describe("#cos()", () => {
        let otherVec: Vector;

        beforeEach(() => {
            otherVec = new Vector(1, 2);
        });

        it("should calculate the cosine of the angle between two vectors correctly", () => {
            expect(vec.cos(otherVec)).toBeCloseTo(0.9807852804032304);
        });
    });
});
