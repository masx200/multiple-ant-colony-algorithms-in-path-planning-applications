import { expect, it, describe } from "vitest";
import { removeSubarrayRepeatElements } from "./removeSubarrayRepeatElements";

describe('removeSubarrayRepeatElements', () => {
    it('should remove duplicate elements in the subarray', () => {
        const arr = [[1, 2], [3, 4], [1, 2], [5, 6]];
        const expected = [[1, 2], [5, 6]];
        expect(removeSubarrayRepeatElements(arr)).toEqual(expected);
    });

    it('should return an empty array if the input array is empty', () => {
        const arr: number[][] = [];
        const expected: number[][] = [];
        expect(removeSubarrayRepeatElements(arr)).toEqual(expected);
    });

    it('should return the same array if there are no duplicate elements', () => {
        const arr = [[1, 2], [3, 4], [5, 6]];
        const expected = [[1, 2], [3, 4], [5, 6]];
        expect(removeSubarrayRepeatElements(arr)).toEqual(expected);
    });

    it('should remove duplicate elements in the subarray with negative numbers', () => {
        const arr = [[-1, 2], [-3, 4], [-1, 2], [-5, 6]];
        const expected = [[-1, 2], [-5, 6]];
        expect(removeSubarrayRepeatElements(arr)).toEqual(expected);
    });

    it('should remove duplicate elements in the subarray with decimal numbers', () => {
        const arr = [[1.5, 2.5], [3.5, 4.5], [1.5, 2.5], [3.5, 4.5], [1.5, 2.5], [5.5, 6.5]];
        const expected = [[1.5, 2.5], [5.5, 6.5]];
        expect(removeSubarrayRepeatElements(arr)).toEqual(expected);
    });
});
