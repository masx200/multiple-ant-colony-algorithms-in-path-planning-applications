import { Queue } from "@datastructures-js/queue";
import { getAngleRangeOfPointAndSquare1 } from "./getAngleRangeOfPointAndSquare1";
import { GridMap } from "./grid-map";
import { RangeModule } from "./RangeModule";
import { Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment } from "./Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment";

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
export function findVisibleGridsCircle(
    starti: number,
    startj: number,
    grid: GridMap,
): [number, number][] {
    // 如果起始位置是障碍物，则返回空数组
    if (grid.isObstacle(starti, startj)) return [];
    const result: [number, number][] = [];
    /* 队列保存可通行的角度 */
    const queue = new Queue<number>();
    // queue.push((-Math.PI / 4) * 3);
    // queue.push((Math.PI / 4) * 3);
    // queue.enqueue(Math.PI);
    // queue.push(0);
    // queue.push(-Math.PI / 2);
    // queue.push(Math.PI / 2);
    // queue.push(-Math.PI / 4);
    // queue.push(Math.PI / 4);
    /* 添加8个方向的初始可用角度 */
    for (let angle = -Math.PI; angle < Math.PI; angle += Math.PI / 4) {
        queue.push(angle);
        // console.log(angle);
    }
    const EPSILON = Number.EPSILON;
    const angleRanges = new RangeModule(-Math.PI, Math.PI, EPSILON);
    angleRanges.addRange(-Math.PI, Math.PI);
    // 记录访问过的网格，避免重复访问
    const visited: boolean[][] = Array(grid.data.length)
        .fill(0)
        .map(() => Array(grid.data[0].length).fill(false));
    visited[starti][startj] = true;
    // 当最小堆不为空时，循环查找
    while (queue.size() > 0) {
        // 从最小堆中取出一个坐标
        const size = queue.size();

        const blockedAngleRanges: [number, number][] = [];
        // debugger;
        for (let index = 0; index < size; index++) {
            const current_angle = queue.pop() as number; //, number];
            // const current_angle = (angle_min + angel_max) / 2;
            // 范围判断,如果范围错误就跳过
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
            //每次走一格
            let dx = Math.cos(current_angle) / max_dx_dy;
            // 1;
            let dy = Math.sin(current_angle) / max_dx_dy;
            //  1;
            // debugger;
            while (
                !(y_current < 0 || y_current >= grid.data[0].length) &&
                !(x_current < 0 || x_current >= grid.data.length) &&
                grid.isFree(x_current, y_current)
            ) {
                // if (x < 0 || x >= grid.data.length) break;
                // if (y < 0 || y >= grid.data[0].length) break;

                if (!visited[x_current][y_current]) {
                    visited[x_current][y_current] = true;
                    // 如果相邻点之间的横坐标差为1且纵坐标差为1
                    if (
                        Math.abs(-lastx + x_current) == 1 &&
                        Math.abs(y_current - lasty) == 1
                    ) {
                        // 如果横坐标为x1的纵坐标位置和横坐标为x2的纵坐标位置都是障碍物，则返回false
                        if (
                            grid.isObstacle(lastx, y_current) &&
                            grid.isObstacle(x_current, lasty)
                        )
                            break;

                        //需要判断如果有一个障碍物时,格子的四条边会不会与路线产生交点,如果有交点,则无法通过.
                        if (
                            Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment(
                                lastx,
                                lasty,
                                x_current,
                                y_current,
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
                        !(starti == x_current && startj == y_current) //&&
                        // canStraightReach([starti, startj], [x, y], grid)
                    ) {
                        result.push([x_current, y_current]);
                    }
                }

                //按照当前角度的射线方向移动一个格子
                xfloat += dx;
                yfloat += dy;
                lastx = x_current;
                lasty = y_current;
                x_current = Math.round(xfloat);
                y_current = Math.round(yfloat);
                // debugger;
            }
            const AllBlockedAngleRange = [
                getAngleRangeOfPointAndSquare1(
                    starti,
                    startj,
                    x_current,
                    y_current,
                ),
                [current_angle - EPSILON, current_angle + EPSILON],
            ] as const;
            // blockedAngleRanges.push([
            //     current_angle - EPSILON,
            //     current_angle + EPSILON,
            // ]);

            for (const blockedAngleRange of AllBlockedAngleRange) {
                if (blockedAngleRange[1] > blockedAngleRange[0])
                    blockedAngleRanges.push([
                        blockedAngleRange[0],
                        blockedAngleRange[1],
                    ]);
                else {
                    //角度范围跨过Math.PI
                    blockedAngleRanges.push([blockedAngleRange[0], Math.PI]);
                    blockedAngleRanges.push([-Math.PI, blockedAngleRange[1]]);
                }
            }
            // const blockedAngleRange = getAngleRangeOfPointAndSquare1(
            //     starti,
            //     startj,
            //     x_current,
            //     y_current,
            // );

            // 初始化距离数组，距离从近到远，初始值设置为无穷大

            // 使用最小堆来存储网格坐标，按照距离的远近进行排序

            // 将起始位置添加到最小堆中

            // 记录访问过的网格，避免重复访问

            // 当最小堆不为空时，循环查找

            // 从最小堆中取出一个坐标

            // 范围判断,如果范围错误就跳过

            // 如果该位置已被访问过，则跳过

            // 如果该位置是空闲的，且不是起始位置，且可以直接到达，则将其加入结果数组
        }
        for (const angles of blockedAngleRanges) {
            angleRanges.removeRange(angles[0], angles[1]);
        }
        for (const angles of angleRanges.getAvailableRanges()) {
            queue.push((angles[0] + angles[1]) / 2);
        }
        //4个方向(上,右，左,下)遍历，不能斜方向

        // 上下左右四个方向进行遍历
        // 如果当前位置的x坐标大于0，并且它的左边网格没有被访问过，且左边的网格是自由的（即没有被占据），则将左边的网格加入到最小堆中

        // 如果当前位置的x坐标小于网格的总行数减1，并且它的右边网格没有被访问过，且右边的网格是自由的（即没有被占据），则将右边的网格加入到最小堆中

        // 如果当前位置的y坐标大于0，并且它的上边网格没有被访问过，且上边的网格是自由的（即没有被占据），则将上边的网格加入到最小堆中

        // 如果当前位置的y坐标小于网格的总列数减1，并且它的下边网格没有被访问过，且下边的网格是自由的（即没有被占据），则将下边的网格加入到最小堆中
    }

    // 返回结果数组，即所有符合条件的网格坐标
    return result;
}
