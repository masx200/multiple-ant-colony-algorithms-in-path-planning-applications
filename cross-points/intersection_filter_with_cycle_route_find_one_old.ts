import { assert_true } from "../test/assert_true";
import { cycle_route_to_segments } from "../functions/cycle_route_to_segments";
import { haverepetitions } from "../functions/haverepetitions";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { combinations } from "combinatorial-generators";
import { robustsegmentintersect } from "./robust-segment-intersect";
import { cycle_reorganize } from "../functions/cycle_reorganize";

import { pickRandomOne } from "../functions/pickRandomOne";

export function intersection_filter_with_cycle_route_find_one_old({
    cycle_route,
    node_coordinates,
}: {
    cycle_route: number[];

    node_coordinates: NodeCoordinates;
}): [[number, number], [number, number]] | false {
    const count_of_nodes = node_coordinates.length;
    assert_true(count_of_nodes > 1);
    assert_true(cycle_route.length === node_coordinates.length);
    const oldRoute = cycle_route;
    const start = pickRandomOne(oldRoute);

    const cloned = cycle_reorganize(oldRoute, start);
    const cyclesegments = cycle_route_to_segments(cloned);

    for (const [[left1, left2], [right1, right2]] of combinations(
        cyclesegments,
        2
    )) {
        if (!haverepetitions([left1, right1, left2, right2])) {
            const intersectparameters = [left1, left2, right1, right2].map(
                (node) => node_coordinates[node]
            );
            if (
                robustsegmentintersect(
                    intersectparameters[0],
                    intersectparameters[1],
                    intersectparameters[2],
                    intersectparameters[3]
                )
            ) {
                return [
                    [left1, left2],
                    [right1, right2],
                ];
            }
        }
    }
    return false;
}
