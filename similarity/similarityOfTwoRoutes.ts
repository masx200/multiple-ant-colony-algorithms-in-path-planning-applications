import { cycle_route_to_segments } from "../functions/cycle_route_to_segments";
import { assert_true } from "../test/assert_true";


export function similarityOfTwoRoutes(
    route1: number[][],
    route2: number[][],
): number {
    assert_true(route1.length > 0);
    assert_true(route1.length === route2.length);
    const A: number[][] = Array(route1.length)
        .fill(0)
        .map(() => Array(route1.length).fill(0));
    const n = route1.length;

    cycle_route_to_segments(route1).forEach(([x, y]) => {
        A[x][y] = 1;
        A[y][x] = 1;
    });
    return (
        cycle_route_to_segments(route2).reduce((p, [x, y]): number => {
            return p + Number(A[x][y] === 1);
        }, 0) / n
    );
}
