import { assert_true } from "../test/assert_true";
import { similarityOfTwoRoutes } from "./similarityOfTwoRoutes";


export function similarityOfMultipleRoutes(
    routes: number[][][],
    bestRoute: number[][],
): number {
    assert_true(routes.every((r) => r.length === bestRoute.length));
    return (
        routes.reduce(
            (p, route) => p + similarityOfTwoRoutes(route, bestRoute),
            0,
        ) / routes.length
    );
}
