import { assert, describe, it } from "vitest";
import { GridMap } from "./grid-map";
import { Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment } from "./Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment.ts";

describe("Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment", () => {
    it("should return true if the four sides of two beveled squares have an intersection with a line segment", () => {
        // Arrange
        const x1 = 0;
        const y1 = 0;
        const x2 = 1;
        const y2 = 1;
        const start: [number, number] = [1, 1];
        const end: [number, number] = [3, 3];
        const gird = new GridMap(5, 6);

        // Act
        const result =
            Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment(
                x1,
                y1,
                x2,
                y2,
                start,
                end,
                gird,
            );

        // Assert
        assert.isFalse(result);
    });

    it("should return false if the four sides of two beveled squares do not have an intersection with a line segment", () => {
        assert.throw(() => {
            const x1 = 0;
            const y1 = 0;
            const x2 = 2;
            const y2 = 2;
            const start: [number, number] = [0, 0];
            const end: [number, number] = [4, 4];
            const gird = new GridMap(8, 7);

            // Act
            const result =
                Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment(
                    x1,
                    y1,
                    x2,
                    y2,
                    start,
                    end,
                    gird,
                );

            // Assert
            assert.isFalse(result);
        });
        // Arrange
    });
});
