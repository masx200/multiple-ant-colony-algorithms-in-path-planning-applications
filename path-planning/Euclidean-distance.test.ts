import { describe, expect, it } from "vitest";
import { EuclideanDistance } from "./Euclidean-distance";
describe("EuclideanDistance", () => {
    it("should calculate euclidian distance between two points", () => {
        expect(EuclideanDistance(1, 2, 5, 2)).toBe(4);
        expect(EuclideanDistance(1, 2, 3, 4)).toBe(2.8284271247461903);
        expect(EuclideanDistance(1, 1, 5, 3)).toBe(4.47213595499958);
        expect(EuclideanDistance(1, 1, 7, 4)).toBe(6.708203932499369);
        expect(EuclideanDistance(1, 5, 7, 4)).toBe(6.082762530298219);
        expect(EuclideanDistance(1, 7, 5, 3)).toBe(5.656854249492381);
        expect(EuclideanDistance(5, 7, 5, 3)).toBe(4);
        expect(EuclideanDistance(5, 3, 5, 2)).toBe(1);
        expect(EuclideanDistance(5, 2, 5, 1)).toBe(1);
        expect(EuclideanDistance(7, 5, 7, 4)).toBe(1);
        expect(EuclideanDistance(7, 7, 5, 3)).toBe(4.47213595499958);
        expect(EuclideanDistance(7, 3, 5, 2)).toBe(2.23606797749979);
        expect(EuclideanDistance(2, 7, 2, 3)).toBe(4);
        expect(EuclideanDistance(7, 2, 2, 3)).toBe(5.0990195135927845);
        expect(EuclideanDistance(2, 2, 2, 2)).toBe(0);
    });
});
