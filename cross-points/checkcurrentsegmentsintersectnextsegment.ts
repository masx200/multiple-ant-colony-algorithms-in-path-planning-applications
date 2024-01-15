import { oneDimensionToTwoDimensions } from "../path-planning/oneDimensionToTwoDimensions";
import { robustsegmentintersect } from "./robust-segment-intersect";
/**
 * 检查当前线段是否与下一个线段相交
 * @param currentsegments 当前线段的坐标数组
 * @param nextsegment 下一个线段的坐标数组
 * @param node_coordinates 节点坐标数组
 * @returns 如果存在相交的线段则返回true，否则返回false
 */
export function checkcurrentsegmentsintersectnextsegment(
    currentsegments: [number, number][],
    nextsegment: [number, number],
    node_coordinates: number[][],
): boolean {
    const n = node_coordinates[0].length;
    return currentsegments.some((segment) => {
        const intersectparameters = [
            segment[0],
            segment[1],
            nextsegment[0],
            nextsegment[1],
        ].map((node) => oneDimensionToTwoDimensions(node, n));
        return robustsegmentintersect(
            intersectparameters[0],
            intersectparameters[1],
            intersectparameters[2],
            intersectparameters[3],
        );
    });
}
