import { describe, expect, it } from "vitest";
import { Vec } from "./Vec";


describe("Vec", () => {
    it("构造函数", () => {
        let v = new Vec(1, 2);
        expect(v.x).toBe(1);
        expect(v.y).toBe(2);
    });

    it("length()方法", () => {
        let v = new Vec(1, 2);
        expect(v.length()).toBe(Math.sqrt(1 + 4));
    });

    it("siz()方法", () => {
        let v = new Vec(1, 2);
        expect(v.siz()).toBe(1 + 4);
    });

    it("dot()方法", () => {
        let v1 = new Vec(1, 2);
        let v2 = new Vec(2, 3);
        expect(v1.dot(v2)).toBe(2 + 6);
    });

    it("cos()方法", () => {
        let v1 = new Vec(1, 2);
        let v2 = new Vec(2, 3);
        expect(v1.cos(v2)).toBeCloseTo(0.9922778767136677);
    });
});
