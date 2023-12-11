import { Queue } from "@datastructures-js/queue";
import { getAngleRangeOfPointAndSquare1 } from "./getAngleRangeOfPointAndSquare1";
import { GridMap } from "./grid-map";
import { RangeModule } from "./RangeModule";

/**
 * 查找所有可见的网格
 *
 * 使用圆周角度搜索,和范围模块,距离从近到远,添加角度的范围模块,遇到障碍物就禁止被遮挡的角度,如果所有角度都禁止了,就停止搜索
 *
 * @param starti 起始行索引
 * @param startj 起始列索引
 * @param grid 网格地图
 * @returns 包含所有可见网格的数组
 */
export function findVisibleGridsCircle(
    starti: number,
    startj: number,
    grid: GridMap,
): [number, number][] {
    // 如果起始位置是障碍物，则返回空数组
    if (grid.isObstacle(starti, startj)) return [];
    const result: [number, number][] = [];
    const queue = new Queue<[number, number]>();
    queue.enqueue([-Math.PI, Math.PI]);
    const angleRanges = new RangeModule(-Math.PI, Math.PI, Number.EPSILON);
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
        for (let index = 0; index < size; index++) {
            const [angle_min, angel_max] = queue.pop() as [number, number];
            const current_angle = (angle_min + angel_max) / 2;
            // 范围判断,如果范围错误就跳过
            let xfloat = starti;
            let yfloat = startj;
            let x = starti;
            let y = startj;
            let lastx = x;
            let lasty = y;
            let dx =
                Math.cos(current_angle) /
                Math.max(Math.cos(current_angle), Math.sin(current_angle));
            1;
            let dy =
                Math.sin(current_angle) /
                Math.max(Math.cos(current_angle), Math.sin(current_angle));
            1;
            while (grid.isFree(x, y)) {
                if (x < 0 || x >= grid.data.length) break;
                if (y < 0 || y >= grid.data[0].length) break;

                if (visited[x][y]) continue;
                visited[x][y] = true;
                // 如果相邻点之间的横坐标差为1且纵坐标差为1
                if (Math.abs(-lastx + x) == 1 && Math.abs(y - lasty) == 1) {
                    // 如果横坐标为x1的纵坐标位置和横坐标为x2的纵坐标位置都是障碍物，则返回false
                    if (grid.isObstacle(lastx, y) && grid.isObstacle(x, lasty))
                        break;
                }
                if (
                    grid.isFree(x, y) &&
                    !(starti == x && startj == y) //&&
                    // canStraightReach([starti, startj], [x, y], grid)
                ) {
                    result.push([x, y]);
                }
                //按照当前角度的射线方向移动一个格子
                xfloat += dx;
                yfloat += dy;
                lastx = x;
                lasty = y;
                x = Math.round(xfloat);
                y = Math.round(yfloat);
            }

            blockedAngleRanges.push(
                getAngleRangeOfPointAndSquare1(starti, startj, x, y),
            );
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
            queue.push(angles);
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
