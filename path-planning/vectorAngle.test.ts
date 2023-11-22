import { assert } from "chai";
import { vectorAngle } from "./vectorAngle";
import { describe, it } from "vitest";

describe("vectorAngle", () => {
    it("should return the angle in radians between the two vectors [1, 0] and [0, 1]", () => {
        assert.closeTo(vectorAngle([1, 0], [0, 1]), Math.PI / 2, 1e-10);
    });

    it("should return the angle in radians between the two vectors [1, 0] and [-1, 0]", () => {
        assert.closeTo(vectorAngle([1, 0], [-1, 0]), 0, 1e-10);
    });

    it("should return the angle in radians between the two vectors [0, 1] and [1, 1]", () => {
        assert.closeTo(vectorAngle([0, 1], [1, 1]), -Math.PI / 4, 1e-10);
    });

    it("should return the angle in radians between the two vectors [1, 2] and [4, 5]", () => {
        assert.closeTo(
            vectorAngle([1, 2], [4, 5]),
            -0.21109333322274684,
            1e-10,
        );
    });

    it("should return the angle in radians between the two vectors [1, -2] and [4, 5]", () => {
        assert.closeTo(vectorAngle([1, -2], [4, 5]), 2.0032041023654346, 1e-10);
    });

    it("should return the angle in radians between the two vectors [1, -2] and [-4, 5]", () => {
        assert.closeTo(
            vectorAngle([1, -2], [-4, 5]),
            -2.9304993203670464,
            1e-10,
        );
    });

    it("should return the angle in radians between the two vectors [1, -2] and [-4, -5]", () => {
        assert.closeTo(
            vectorAngle([1, -2], [-4, -5]),
            -1.1383885512243588,
            1e-10,
        );
    });
});
