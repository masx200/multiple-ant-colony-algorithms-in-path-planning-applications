import { combinations } from "combinatorial-generators";

import { ArrayShuffle } from "../functions/ArrayShuffle";
import { cycle_route_to_segments } from "../functions/cycle_route_to_segments";
import { getOrCreateMapOfMapFun } from "../functions/getOrCreateMapOfMapFun";
import { getUniqueStringOfCircularRoute } from "../functions/getUniqueStringOfCircularRoute";
import { haverepetitions } from "../functions/haverepetitions";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { assert_true } from "../test/assert_true";
import { node_coordinates_to_intersect_routes_unique } from "./node_coordinates_to_intersect_routes_unique";
import { robustsegmentintersect } from "./robust-segment-intersect";

export function is_intersection_partial_with_cycle_route({
    cycle_route,
    max_of_segments,
    node_coordinates,
}: {
    cycle_route: number[];

    node_coordinates: NodeCoordinates;
    max_of_segments: number;
}): boolean {
    const map = getOrCreateMapOfMapFun(
        node_coordinates_to_intersect_routes_unique,
        node_coordinates,
    );
    const unique_string = getUniqueStringOfCircularRoute(cycle_route);
    if (map.has(unique_string)) {
        const cached = map.get(unique_string);
        if (cached) {
            return true;
        }
    }
    const count_of_nodes = node_coordinates.length;
    assert_true(count_of_nodes > 1);
    assert_true(cycle_route.length >=2);
    const cyclesegments = ArrayShuffle(
        cycle_route_to_segments(cycle_route),
    ).slice(0, max_of_segments);

    for (const [[left1, left2], [right1, right2]] of combinations(
        cyclesegments,
        2,
    )) {
        if (!haverepetitions([left1, right1, left2, right2])) {
            const intersectparameters = [left1, left2, right1, right2].map(
                (node) => node_coordinates[node],
            );
            if (
                robustsegmentintersect(
                    intersectparameters[0],
                    intersectparameters[1],
                    intersectparameters[2],
                    intersectparameters[3],
                )
            ) {
                map.set(unique_string, true);
                return true;
            }
        }
    }

    return false;
}
