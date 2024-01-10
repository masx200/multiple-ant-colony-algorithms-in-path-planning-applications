// 引入vitest库中的assert模块，用于断言测试

import { assert } from "chai";

import { robustsegmentintersect } from "../cross-points/robust-segment-intersect";
import { cycle_route_to_segments } from "../functions/cycle_route_to_segments";
import { GridMap } from "./grid-map";

// 引入自定义模块robust-segment-intersect，这个模块应该包含了一个函数robustsegmentintersect，用于计算两条线段是否相交

// 定义一个名为Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment的函数，这个函数接收8个参数，其中前四个参数代表两条线段的两个端点，后四个参数代表一个线段的起点和终点
export function Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment(
    [
        x1, // 第一个线段的起点x坐标
        y1,
    ]: [number, number], // 第一个线段的起点y坐标
    [
        x2, // 第一个线段的终点x坐标
        y2,
    ]: [number, number], // 第一个线段的终点y坐标
    start: [number, number], // 第二个线段的起点坐标，以数组形式表示
    end: [number, number], // 第二个线段的终点坐标，以数组形式表示
    gird: GridMap,
) {
    // 使用assert断言，x1到x2的距离和y1到y2的距离必须相等，即这两条线段是垂直的
    assert(Math.abs(x1 - x2) == 1 && Math.abs(y1 - y2) == 1);
    // 返回一个数组，数组的元素是一个子数组，子数组中的元素又是一个数组，这个结构表示一个点的坐标
    return [
        [x1, y2], // 第一个点，对应于x1和y2坐标
        [x2, y1], // 第二个点，对应于x2和y1坐标
        // 使用数组的some方法，遍历这个二维数组，检查是否存在一个点位于第二个线段上（或者与第二个线段相交）
    ].some(([x, y]) => {
        if (gird.isFree(x, y)) return false;
        // 定义一个四边形的四个顶点坐标，这个四边形是以当前点为中心，边长为1的正方形，顶点坐标通过当前点的坐标和正方形的方向计算得出
        const four_edges = [
            [x - 0.5, y + 0.475],
            [x - 0.475, y + 0.5],
            [x + 0.475, y + 0.5],
            [x + 0.5, y + 0.475],
            [x + 0.5, y - 0.475],
            [x + 0.475, y - 0.5],
            [x - 0.475, y - 0.5],
            [x - 0.5, y - 0.475],
        ] as Array<[number, number]>; // 将数组标记为只读，防止后续更改这个数组的内容
        const segments = cycle_route_to_segments(four_edges);
        // 使用数组的some方法，遍历这个四边形的四个边，检查是否存在一条边与第二个线段相交
        return segments.some(([point1, point2]) => {
            // 使用自定义函数robustsegmentintersect，检查一条边是否与第二个线段相交，如果相交返回true，否则返回false
            return robustsegmentintersect(
                [point1[0], point1[1]], // 第一条边的起点坐标
                [point2[0], point2[1]], // 第一条边的终点坐标
                start, // 第二条边的起点坐标
                end, // 第二条边的终点坐标
            );
        });
    });
}
