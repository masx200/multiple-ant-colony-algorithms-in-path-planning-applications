import { combinations } from "combinatorial-generators";

import { ArrayShuffle } from "../functions/ArrayShuffle";
import { getOrCreateMapOfMapFun } from "../functions/getOrCreateMapOfMapFun";
import { getUniqueStringOfCircularRoute } from "../functions/getUniqueStringOfCircularRoute";
import { haverepetitions } from "../functions/haverepetitions";
import { assert_true } from "../test/assert_true";
import { node_coordinates_to_intersect_routes_unique } from "./node_coordinates_to_intersect_routes_unique";
import { robustsegmentintersect } from "./robust-segment-intersect";
import { oneDimensionToTwoDimensions } from "../path-planning/oneDimensionToTwoDimensions";
import { not_cycle_route_to_segments } from "../functions/not_cycle_route_to_segments";
/**
 * 判断给定的不循环路径是否存在与部分路径相交的点
 * @param {Object} options - 函数参数对象
 * @param {number[]} options.cycle_route - 循环路径
 * @param {number} options.max_of_segments - 最大段数
 * @param {number[][]} options.node_coordinates - 节点坐标数组
 * @returns {boolean} - 是否存在相交点
 */
export function is_intersection_partial_with_cycle_route({
    cycle_route,
    max_of_segments,
    node_coordinates,
}: {
    cycle_route: number[];

    node_coordinates: number[][];
    max_of_segments: number;
}): boolean {
    const n = node_coordinates[0].length;
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
    assert_true(cycle_route.length >= 2);
    const cyclesegments = ArrayShuffle(
        not_cycle_route_to_segments(cycle_route),
    ).slice(0, max_of_segments);

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
                map.set(unique_string, true);
                return true;
            }
        }
    }

    return false;
}
