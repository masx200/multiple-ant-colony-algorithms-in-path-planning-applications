import { combinations } from "combinatorial-generators";

import { haverepetitions } from "../functions/haverepetitions";
import { assert_true } from "../test/assert_true";
import { robustsegmentintersect } from "./robust-segment-intersect";
import { not_cycle_route_to_segments } from "../functions/not_cycle_route_to_segments";
import { oneDimensionToTwoDimensions } from "../path-planning/oneDimensionToTwoDimensions";

/**
 * 计算给定的不循环路径和给定的节点坐标之间的交点，并返回交点的坐标。
 *   @param node_coordinates - 节点坐标
 * @param {number[]} cycle_route - 自行车道循环路径的节点顺序
 * @returns {[[number, number], [number, number]] | false} - 返回交点的坐标信息，如果没有交点则返回false
 */
export function intersection_filter_with_cycle_route_find_one_old({
    cycle_route,
    node_coordinates,
}: {
    cycle_route: number[];

    node_coordinates: number[][];
}): [[number, number], [number, number]] | false {
    const count_of_nodes = node_coordinates.length;
    assert_true(count_of_nodes > 1);
    assert_true(cycle_route.length >= 2);
    const oldRoute = cycle_route;
    const n = node_coordinates[0].length;
    const cloned = Array.from(oldRoute);
    const cyclesegments = not_cycle_route_to_segments(cloned);

    for (const [[left1, left2], [right1, right2]] of combinations(
        cyclesegments,
        2,
    )) {
        if (!haverepetitions([left1, right1, left2, right2])) {
            const intersectparameters = [left1, left2, right1, right2].map(
                (node) => oneDimensionToTwoDimensions(node, n), // 将一维节点转换为二维坐标
            );
            if (
                robustsegmentintersect(
                    intersectparameters[0],
                    intersectparameters[1],
                    intersectparameters[2],
                    intersectparameters[3],
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
