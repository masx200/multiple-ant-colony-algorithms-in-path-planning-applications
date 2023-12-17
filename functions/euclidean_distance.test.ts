import { describe, expect, it } from "vitest";
import { euclidean_distance } from "./euclidean_distance";

describe("euclidean_distance", () => {
    it("should calculate the Euclidean distance between two points", () => {
        // Arrange
        const leftpair: [number, number] = [1, 2];
        const rightpair: [number, number] = [3, 4];
        const expected = 2.8284271247461903;

        // Act
        const result = euclidean_distance(leftpair, rightpair);

        // Assert
        expect(result).toBeCloseTo(expected);
    });

    it("should calculate the Euclidean distance between two points with rounding", () => {
        // Arrange
        const leftpair: [number, number] = [1, 2];
        const rightpair: [number, number] = [3, 4];
        const expected = 3;

        // Act
        const result = euclidean_distance(leftpair, rightpair, true);

        // Assert
        expect(result).toBe(expected);
    });
});
