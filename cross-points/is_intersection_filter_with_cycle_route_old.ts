import { combinations } from "combinatorial-generators";

import { robustsegmentintersect } from "../cross-points/robust-segment-intersect";
import { haverepetitions } from "../functions/haverepetitions";
import { assert_true } from "../test/assert_true";
import { not_cycle_route_to_segments } from "../functions/not_cycle_route_to_segments";
import { oneDimensionToTwoDimensions } from "../path-planning/oneDimensionToTwoDimensions";

/**
 * 检查是否存在交叉过滤中的不循环路径
 * @param {number[]} cycle_route - 循环路由
 * @param {number[][]} node_coordinates - 节点坐标
 * @returns {boolean} - 是否存在交叉过滤中的循环路由
 */
export function is_intersection_filter_with_cycle_route_old({
    cycle_route,
    node_coordinates,
}: {
    cycle_route: number[];

    node_coordinates: number[][];
}): boolean {
    const count_of_nodes = node_coordinates.length;
    assert_true(count_of_nodes > 1);
    assert_true(cycle_route.length >= 2);
    const cyclesegments = not_cycle_route_to_segments(cycle_route);
    const n = node_coordinates[0].length;
    for (const [[left1, left2], [right1, right2]] of combinations(
        cyclesegments,
        2,
    )) {
        if (!haverepetitions([left1, right1, left2, right2])) {
            const intersectparameters = [left1, left2, right1, right2].map(
                (node) => oneDimensionToTwoDimensions(node, n),
            );
            if (
                robustsegmentintersect(
                    intersectparameters[0],
                    intersectparameters[1],
                    intersectparameters[2],
                    intersectparameters[3],
                )
            ) {
                return true;
            }
        }
    }

    return false;
}
