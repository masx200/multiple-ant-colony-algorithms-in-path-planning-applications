import { combinations } from "combinatorial-generators";
import { ArrayShuffle } from "../functions/ArrayShuffle";
import { not_cycle_route_to_segments } from "../functions/not_cycle_route_to_segments";
import { assert_true } from "../test/assert_true";
import { oneDimensionToTwoDimensions } from "../path-planning/oneDimensionToTwoDimensions";
import { robustsegmentintersect } from "./robust-segment-intersect";
import { haverepetitions } from "../functions/haverepetitions";

/**
 * 在给定的节点坐标中找到一个与不循环路径相交的交点
 * @param max_of_segments - 最大段数
 * @param cycle_route - 循环路径
 * @param node_coordinates - 节点坐标
 * @returns 交点的段数或false
 */
export function find_one_intersection_partial_with_cycle_route({
    max_of_segments,
    cycle_route,
    node_coordinates,
}: {
    cycle_route: number[];

    node_coordinates: number[][];
    max_of_segments: number;
}): [[number, number], [number, number]] | false {
    const count_of_nodes = node_coordinates.length;
    assert_true(count_of_nodes > 1); // 节点数量必须大于1
    assert_true(cycle_route.length >= 2); // 循环路径长度必须大于等于2
    const oldRoute = cycle_route;
    // const start = pickRandomOne(oldRoute); // 随机选择一个起始点
    const n = node_coordinates[0].length;
    const cloned = Array.from(oldRoute); // cycle_reorganize(oldRoute, start); // 根据起始点重新组织循环路径
    const cyclesegments = ArrayShuffle(
        not_cycle_route_to_segments(cloned),
    ).slice(0, max_of_segments); // 从非循环路径中随机选择一些段数，并打乱顺序
    for (const [[left1, left2], [right1, right2]] of combinations(
        cyclesegments,
        2,
    )) {
        if (!haverepetitions([left1, right1, left2, right2])) {
            // 如果两个段数没有重复的节点
            const intersectparameters = [left1, left2, right1, right2].map(
                (node) => oneDimensionToTwoDimensions(node, n), // 将一维节点转换为二维坐标
            );
            if (
                robustsegmentintersect(
                    // 判断两个线段是否相交
                    intersectparameters[0],
                    intersectparameters[1],
                    intersectparameters[2],
                    intersectparameters[3],
                )
            ) {
                return [
                    [left1, left2],
                    [right1, right2],
                ]; // 返回相交的两个段数
            }
        }
    }
    return false; // 没有找到相交的交点
}
