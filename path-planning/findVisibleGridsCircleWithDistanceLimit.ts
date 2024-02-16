import { Queue } from "@datastructures-js/queue";

import { CachedCanStraightReach } from "./canStraightReach";
import { formatSmallArcsAngleRange } from "./formatSmallArcsAngleRange";
import { getAngleOfVector } from "./getAngleOfVector";
import { getAngleRangeOfPointAndSquare1 } from "./getAngleRangeOfPointAndSquare1";
import { GridMap } from "./grid-map";
import { RangeModule } from "./RangeModule";
import { Vector } from "./Vector";
import { Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment } from "./Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment";
// import { getGridDistance } from "./getGridDistance";

/**
 * 查找所有可见的网格
 *
 * 使用圆周角度搜索,和范围模块,距离从近到远,添加角度的范围模块,遇到障碍物就禁止被遮挡的角度,如果所有角度都禁止了,就停止搜索
 *
 * @param starti 起始行索引
 * @param startj 起始列索引
 * @param grid 网格地图
 * @returns 包含所有可见网格的数组
 *
 * 查找从给定起始位置（starti, startj）出发，在一个二维网格地图（grid）中所有可见的网格。它使用了圆周角度搜索算法，以及范围模块来判断哪些角度被障碍物遮挡。

函数首先检查起始位置是否为障碍物，如果是则返回空数组。然后初始化结果数组（result）、队列（queue）、角度范围模块（angleRanges）和访问过的位置记录（visited）。接下来进入循环，当队列不为空时，从队列中取出一个坐标，并根据当前角度计算射线方向。在射线上进行移动并检查每个格子是否为空闲、是否已访问过，符合条件的格子将被加入到结果数组中。同时，更新被障碍物遮挡的角度范围，并将未被遮挡的角度范围重新加入队列。最后，返回包含所有可见网格坐标的数组。
 */
export function findVisibleGridsCircleWithDistanceLimit(
    [starti, startj]: [number, number],
    grid: GridMap,
    distancelimit: number,
    getGridDistance: ([x1, y1]: [
        number,
        number,
    ], [x2, y2]: [
        number,
        number,
    ]) => number,
): [number, number][] {
    const start = [starti, startj] as [number, number];

    if (grid.isObstacle(starti, startj)) return [];
    const result: [number, number][] = [];

    const queue = new Queue<number>();

    for (let angle = -Math.PI; angle < Math.PI; angle += Math.PI / 4) {
        queue.push(angle);
    }

    const EPSILON = Math.PI / 1000000;
    const angleRanges = new RangeModule(-Math.PI, Math.PI, EPSILON);
    angleRanges.addRange(-Math.PI, Math.PI);

    const visited: boolean[][] = Array(grid.data.length)
        .fill(0)
        .map(() => Array(grid.data[0].length).fill(false));
    visited[starti][startj] = true;

    while (queue.size() > 0) {
        const size = queue.size();

        const blockedAngleRanges: [number, number][] = [];

        for (let index = 0; index < size; index++) {
            const current_angle = queue.pop() as number;

            let xfloat = starti;
            let yfloat = startj;
            let x_current = starti;
            let y_current = startj;
            let lastx = x_current;
            let lasty = y_current;
            const max_dx_dy = Math.max(
                Math.abs(Math.cos(current_angle)),
                Math.abs(Math.sin(current_angle)),
            );

            let dx = Math.cos(current_angle) / max_dx_dy;

            let dy = Math.sin(current_angle) / max_dx_dy;

            while (
                !(y_current < 0 || y_current >= grid.data[0].length) &&
                !(x_current < 0 || x_current >= grid.data.length) &&
                grid.isFree(x_current, y_current) &&
                getGridDistance([x_current, y_current], start) <= distancelimit
            ) {
                if (!visited[x_current][y_current]) {
                    visited[x_current][y_current] = true;

                    if (
                        Math.abs(-lastx + x_current) == 1 &&
                        Math.abs(y_current - lasty) == 1
                    ) {
                        if (
                            grid.isObstacle(lastx, y_current) &&
                            grid.isObstacle(x_current, lasty)
                        ) {
                            break;
                        }

                        if (
                            Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment(
                                [lastx, lasty],
                                [x_current, y_current],
                                [starti, startj],
                                [x_current, y_current],
                                grid,
                            )
                        ) {
                            break;
                        }
                    }

                    if (
                        grid.isFree(x_current, y_current) &&
                        !(starti == x_current && startj == y_current)
                    ) {
                        result.push([x_current, y_current]);
                    }
                }

                xfloat += dx;
                yfloat += dy;
                lastx = x_current;
                lasty = y_current;
                x_current = Math.round(xfloat);
                y_current = Math.round(yfloat);
            }
            const current_vector = new Vector(xfloat, yfloat).subtract(
                new Vector(starti, startj),
            );
            const normal = current_vector.normal().unit();
            const AllBlockedAngleRange: [number, number][] = [
                ...getAngleRangeOfPointAndSquare1(
                    [starti, startj],
                    [x_current, y_current],
                ),
                ...formatSmallArcsAngleRange([
                    getAngleOfVector(
                        current_vector
                            .multiply(
                                (current_vector.length() - 0.5) /
                                    current_vector.length(),
                            )
                            .add(normal.divide(2).multiply(0.95)),
                    ),
                    getAngleOfVector(
                        current_vector
                            .multiply(
                                (current_vector.length() - 0.5) /
                                    current_vector.length(),
                            )
                            .add(normal.divide(-2).multiply(0.95)),
                    ),
                ]),
            ];

            for (const blockedAngleRange of AllBlockedAngleRange) {
                blockedAngleRanges.push([
                    blockedAngleRange[0],
                    blockedAngleRange[1],
                ]);
            }
        }

        for (const angles of blockedAngleRanges) {
            angleRanges.removeRange(angles[0], angles[1]);
        }
        for (const angles of angleRanges.getAvailableRanges()) {
            queue.push(angles[0] + ((angles[1] - angles[0]) / 4) * 1);
            queue.push(angles[0] + ((angles[1] - angles[0]) / 4) * 2);
            queue.push(angles[0] + ((angles[1] - angles[0]) / 4) * 3);
        }
    }

    const extendedResults = Array<[number, number]>();

    for (const [i, j] of result) {
        if (CachedCanStraightReach(start, [i, j], grid)) {
            extendedResults.push([i, j]);
        }
    }
    for (const [i, j] of result) {
        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                const [ii, jj] = [i + k, j + l];

                if (
                    ii >= 0 &&
                    ii < grid.column &&
                    jj >= 0 &&
                    jj < grid.row &&
                    grid.isFree(ii, jj) &&
                    !visited[ii][jj] &&
                    getGridDistance(start, [ii, jj]) <= distancelimit
                ) {
                    visited[ii][jj] = true;
                    if (
                        CachedCanStraightReach([starti, startj], [ii, jj], grid)
                    ) {
                        extendedResults.push([ii, jj]);
                    }
                }
            }
        }
    }
    return extendedResults.filter((item) => grid.isFree(item[0], item[1]));
}
