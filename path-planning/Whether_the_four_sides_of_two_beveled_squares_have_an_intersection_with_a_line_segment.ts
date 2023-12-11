import { assert } from "vitest";
import { robustsegmentintersect } from "../cross-points/robust-segment-intersect";

export function Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment(
    x1: number,
    y1: number,

    x2: number,
    y2: number,
    start: [number, number],
    end: [number, number],
) {
    assert.isTrue(Math.abs(x1 - x2) == 1 && Math.abs(y1 - y2) == 1);
    return [
        [x1, y2],
        [x2, y1],
    ].some(([x, y]) => {
        const four_edges = [
            [
                [x - 0.5, y - 0.5],
                [x + 0.5, y - 0.5],
            ],
            [
                [x + 0.5, y - 0.5],
                [x + 0.5, y + 0.5],
            ],
            [
                [x + 0.5, y + 0.5],
                [x - 0.5, y + 0.5],
            ],
            [
                [x - 0.5, y + 0.5],
                [x - 0.5, y - 0.5],
            ],
        ] as const;
        return four_edges.some(([point1, point2]) => {
            return robustsegmentintersect(
                [point1[0], point1[1]],
                [point2[0], point2[1]],
                start,
                end,
            );
        });
    });
}
