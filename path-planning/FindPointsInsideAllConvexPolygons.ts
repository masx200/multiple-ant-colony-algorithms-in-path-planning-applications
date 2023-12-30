import { uniqBy } from "lodash-es";
import { GridMap } from "./grid-map";
import { oneDimensionToTwoDimensions } from "./oneDimensionToTwoDimensions";
import { twoDimensionsToOneDimension } from "./twoDimensionsToOneDimension";


/**
 * 计算所有点被所有凸多边形包围的内部点
 *算法类似于岛屿问题
 *  为了解决有偏差的问题,正向搜索和方向搜索的结果合并一下
 * @param grid 网格地图
 * @param visibleGridsMatrix 可见网格矩阵
 * @returns 被所有凸多边形包围的点的坐标数组
 */
export function FindPointsInsideAllConvexPolygons(
    grid: GridMap,
    visibleGridsMatrix: boolean[][][][],
): Iterable<[number, number]> {
    const n = grid.data[0].length;

    return new Set(
        uniqBy(
            [
                ...FindPointsInsideAllConvexPolygonsLeftTop(
                    grid,
                    visibleGridsMatrix,
                ),
                ...FindPointsInsideAllConvexPolygonsRightButton(
                    grid,
                    visibleGridsMatrix,
                ),
                ...FindPointsInsideAllConvexPolygonsLeftButton(
                    grid,
                    visibleGridsMatrix,
                ),
                ...FindPointsInsideAllConvexPolygonsRightTop(
                    grid,
                    visibleGridsMatrix,
                ),
            ],
            ([i, j]) => {
                return twoDimensionsToOneDimension(i, j, n);
            },
        ),
    );
}
/**
 * 计算所有点被所有凸多边形包围的内部点
 *
 * 算法类似于岛屿问题
 * 正向搜索

 * @param grid 网格地图
 * @param visibleGridsMatrix 可见网格矩阵
 * @returns 被所有凸多边形包围的点的坐标数组
 */
export function FindPointsInsideAllConvexPolygonsLeftTop(
    grid: GridMap,
    visibleGridsMatrix: boolean[][][][],
): Iterable<[number, number]> {
    // console.log(grid);
    // 定义四个方向向量
    const dirs = [
        [-1, 0], // 向左
        [0, 1], // 向上
        [1, 0], // 向右
        [0, -1], // 向下
    ];

    // 获取网格的宽度和高度
    const m = grid.data.length;
    const n = grid.data[0].length;

    // 创建一个二维数组来记录哪些格子已经访问过
    const visited: boolean[][] = Array(grid.data.length)
        .fill(0)
        .map(() => Array(grid.data[0].length).fill(false));

    // 创建一个空数组来存储所有的结果点
    const ans: [number, number][] = [];

    // 遍历每一个格子
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 如果当前格子是空的，并且还没有被访问过
            if (grid.data[i][j] === 0 && !visited[i][j]) {
                // debugger;
                // 将当前格子压入栈中
                const stack: [number, number][] = [];

                // 创建一个集合来存储当前凸包中的点
                const pointsInConvexPolygonsToBeSearch = new Set<number>();
                const AllPointsInConvexPolygons = new Set<number>();

                stack.push([i, j]);

                // 标记当前格子已经被访问过
                // visited[i][j] = true;

                // 将当前格子添加到凸包中
                pointsInConvexPolygonsToBeSearch.add(
                    twoDimensionsToOneDimension(i, j, n),
                );
                AllPointsInConvexPolygons.add(
                    twoDimensionsToOneDimension(i, j, n),
                );
                //如果一个点失败了,那么应该放回去重新搜索,因为一个点可以重新匹配
                const failedPoints: [number, number][] = [];
                // 当栈不为空时，继续执行循环
                while (stack.length) {
                    // debugger;
                    // 弹出栈顶的格子
                    const [curI, curJ] = stack.pop() as [number, number];
                    // console.log(curI, curJ);
                    // 如果当前格子已经被访问过，或者它是障碍物，则跳过它
                    if (visited[curI][curJ] || grid.data[curI][curJ] === 1) {
                        continue;
                    }

                    // 标记当前格子已经被访问过
                    visited[curI][curJ] = true;

                    // 创建一个集合来存储需要删除的点
                    const toBeDeleted = new Set<number>();

                    // 计数器，用来计算当前凸包中有多少个点与当前格子相邻
                    const size = pointsInConvexPolygonsToBeSearch.size;
                    let count = 0;
                    // 遍历当前凸包中的每一个点
                    for (const point of pointsInConvexPolygonsToBeSearch) {
                        // 解析点的字符串表示，得到它的坐标
                        const pointArr = oneDimensionToTwoDimensions(
                            point,
                            n,
                        ) as [number, number];

                        // 检查当前点是否满足凸性条件
                        if (
                            dirs.every((dir) => {
                                const x = pointArr[0] + dir[0];
                                const y = pointArr[1] + dir[1];
                                return (
                                    x >= 0 &&
                                    x < m &&
                                    y >= 0 &&
                                    y < n &&
                                    grid.isFree(x, y) &&
                                    AllPointsInConvexPolygons.has(
                                        twoDimensionsToOneDimension(x, y, n),
                                    )
                                );
                            })
                        ) {
                            toBeDeleted.add(point);
                            ans.push(pointArr);
                        }
                    }
                    for (const point of pointsInConvexPolygonsToBeSearch) {
                        const pointArr = oneDimensionToTwoDimensions(
                            point,
                            n,
                        ) as [number, number];

                        // 如果这个点与当前格子相邻，并且它们之间没有障碍物
                        if (
                            (pointArr[0] === curI &&
                                pointArr[1] === curJ &&
                                grid.isFree(pointArr[0], pointArr[1])) ||
                            visibleGridsMatrix[pointArr[0]][pointArr[1]][curI][
                                curJ
                            ]
                        ) {
                            count++;
                        } else {
                            break;
                        }
                    }
                    // console.log({ count, size });
                    // 删除所有需要删除的点
                    for (const point of toBeDeleted) {
                        pointsInConvexPolygonsToBeSearch.delete(point);
                    }

                    // 如果当前凸包中的点数量没有发生变化，则跳过当前格子

                    if (count !== size) {
                        failedPoints.push([curI, curJ]);

                        continue;
                    } else {
                        pointsInConvexPolygonsToBeSearch.add(
                            twoDimensionsToOneDimension(curI, curJ, n),
                        );
                        AllPointsInConvexPolygons.add(
                            twoDimensionsToOneDimension(curI, curJ, n),
                        );
                    }
                    // 遍历当前凸包中的每一个点
                    for (const point of pointsInConvexPolygonsToBeSearch) {
                        // 解析点的字符串表示，得到它的坐标
                        const pointArr = oneDimensionToTwoDimensions(
                            point,
                            n,
                        ) as [number, number];

                        // 检查当前点是否满足凸性条件
                        if (
                            dirs.every((dir) => {
                                const x = pointArr[0] + dir[0];
                                const y = pointArr[1] + dir[1];
                                return (
                                    x >= 0 &&
                                    x < m &&
                                    y >= 0 &&
                                    y < n &&
                                    grid.isFree(x, y) &&
                                    AllPointsInConvexPolygons.has(
                                        twoDimensionsToOneDimension(x, y, n),
                                    )
                                );
                            })
                        ) {
                            toBeDeleted.add(point);
                            ans.push(pointArr);
                        }
                    }
                    // 删除所有需要删除的点
                    for (const point of toBeDeleted) {
                        pointsInConvexPolygonsToBeSearch.delete(point);
                    }
                    // 遍历当前格子的四个方向
                    dirs.forEach((dir) => {
                        const x = curI + dir[0];
                        const y = curJ + dir[1];
                        // 如果当前方向上的格子是空的，并且还没有被访问过
                        if (
                            x >= 0 &&
                            x < m &&
                            y >= 0 &&
                            y < n &&
                            grid.data[x][y] === 0 &&
                            !visited[x][y]
                        ) {
                            stack.push([x, y]);
                            // visited[x][y] = true;
                        }
                    });
                    //    debugger;
                }
                // console.log({
                //     AllPointsInConvexPolygons,
                //     pointsInConvexPolygonsToBeSearch,
                // });
                //如果一个点失败了,那么应该放回去重新搜索,因为一个点可以重新匹配
                failedPoints.forEach((point) => {
                    visited[point[0]][point[1]] = false;
                });
                //  debugger;
            }
        }
    }
    return new Set(ans);
}
/**
 * 计算所有点被所有凸多边形包围的内部点
 *算法类似于岛屿问题
 *反向搜索
 * @param grid 网格地图
 * @param visibleGridsMatrix 可见网格矩阵
 * @returns 被所有凸多边形包围的点的坐标数组
 */
export function FindPointsInsideAllConvexPolygonsRightButton(
    grid: GridMap,
    visibleGridsMatrix: boolean[][][][],
): Iterable<[number, number]> {
    // console.log(grid);
    // 定义四个方向向量
    const dirs = [
        [-1, 0], // 向左
        [0, 1], // 向上
        [1, 0], // 向右
        [0, -1], // 向下
    ];

    // 获取网格的宽度和高度
    const m = grid.data.length;
    const n = grid.data[0].length;

    // 创建一个二维数组来记录哪些格子已经访问过
    const visited: boolean[][] = Array(grid.data.length)
        .fill(0)
        .map(() => Array(grid.data[0].length).fill(false));

    // 创建一个空数组来存储所有的结果点
    const ans: [number, number][] = [];

    // 遍历每一个格子
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            // 如果当前格子是空的，并且还没有被访问过
            if (grid.data[i][j] === 0 && !visited[i][j]) {
                // debugger;
                // 将当前格子压入栈中
                const stack: [number, number][] = [];

                // 创建一个集合来存储当前凸包中的点
                const pointsInConvexPolygonsToBeSearch = new Set<number>();
                const AllPointsInConvexPolygons = new Set<number>();

                stack.push([i, j]);

                // 标记当前格子已经被访问过
                // visited[i][j] = true;

                // 将当前格子添加到凸包中
                pointsInConvexPolygonsToBeSearch.add(
                    twoDimensionsToOneDimension(i, j, n),
                );
                AllPointsInConvexPolygons.add(
                    twoDimensionsToOneDimension(i, j, n),
                );
                //如果一个点失败了,那么应该放回去重新搜索,因为一个点可以重新匹配
                const failedPoints: [number, number][] = [];
                // 当栈不为空时，继续执行循环
                while (stack.length) {
                    // debugger;
                    // 弹出栈顶的格子
                    const [curI, curJ] = stack.pop() as [number, number];
                    // console.log(curI, curJ);
                    // 如果当前格子已经被访问过，或者它是障碍物，则跳过它
                    if (visited[curI][curJ] || grid.data[curI][curJ] === 1) {
                        continue;
                    }

                    // 标记当前格子已经被访问过
                    visited[curI][curJ] = true;

                    // 创建一个集合来存储需要删除的点
                    const toBeDeleted = new Set<number>();

                    // 计数器，用来计算当前凸包中有多少个点与当前格子相邻
                    const size = pointsInConvexPolygonsToBeSearch.size;
                    let count = 0;
                    // 遍历当前凸包中的每一个点
                    for (const point of pointsInConvexPolygonsToBeSearch) {
                        // 解析点的字符串表示，得到它的坐标
                        const pointArr = oneDimensionToTwoDimensions(
                            point,
                            n,
                        ) as [number, number];

                        // 检查当前点是否满足凸性条件
                        if (
                            dirs.every((dir) => {
                                const x = pointArr[0] + dir[0];
                                const y = pointArr[1] + dir[1];
                                return (
                                    x >= 0 &&
                                    x < m &&
                                    y >= 0 &&
                                    y < n &&
                                    grid.isFree(x, y) &&
                                    AllPointsInConvexPolygons.has(
                                        twoDimensionsToOneDimension(x, y, n),
                                    )
                                );
                            })
                        ) {
                            toBeDeleted.add(point);
                            ans.push(pointArr);
                        }
                    }
                    for (const point of pointsInConvexPolygonsToBeSearch) {
                        const pointArr = oneDimensionToTwoDimensions(
                            point,
                            n,
                        ) as [number, number];

                        // 如果这个点与当前格子相邻，并且它们之间没有障碍物
                        if (
                            (pointArr[0] === curI &&
                                pointArr[1] === curJ &&
                                grid.isFree(pointArr[0], pointArr[1])) ||
                            visibleGridsMatrix[pointArr[0]][pointArr[1]][curI][
                                curJ
                            ]
                        ) {
                            count++;
                        } else {
                            break;
                        }
                    }
                    // console.log({ count, size });
                    // 删除所有需要删除的点
                    for (const point of toBeDeleted) {
                        pointsInConvexPolygonsToBeSearch.delete(point);
                    }

                    // 如果当前凸包中的点数量没有发生变化，则跳过当前格子

                    if (count !== size) {
                        failedPoints.push([curI, curJ]);

                        continue;
                    } else {
                        pointsInConvexPolygonsToBeSearch.add(
                            twoDimensionsToOneDimension(curI, curJ, n),
                        );
                        AllPointsInConvexPolygons.add(
                            twoDimensionsToOneDimension(curI, curJ, n),
                        );
                    }
                    // 遍历当前凸包中的每一个点
                    for (const point of pointsInConvexPolygonsToBeSearch) {
                        // 解析点的字符串表示，得到它的坐标
                        const pointArr = oneDimensionToTwoDimensions(
                            point,
                            n,
                        ) as [number, number];

                        // 检查当前点是否满足凸性条件
                        if (
                            dirs.every((dir) => {
                                const x = pointArr[0] + dir[0];
                                const y = pointArr[1] + dir[1];
                                return (
                                    x >= 0 &&
                                    x < m &&
                                    y >= 0 &&
                                    y < n &&
                                    grid.isFree(x, y) &&
                                    AllPointsInConvexPolygons.has(
                                        twoDimensionsToOneDimension(x, y, n),
                                    )
                                );
                            })
                        ) {
                            toBeDeleted.add(point);
                            ans.push(pointArr);
                        }
                    }
                    // 删除所有需要删除的点
                    for (const point of toBeDeleted) {
                        pointsInConvexPolygonsToBeSearch.delete(point);
                    }
                    // 遍历当前格子的四个方向
                    dirs.forEach((dir) => {
                        const x = curI + dir[0];
                        const y = curJ + dir[1];
                        // 如果当前方向上的格子是空的，并且还没有被访问过
                        if (
                            x >= 0 &&
                            x < m &&
                            y >= 0 &&
                            y < n &&
                            grid.data[x][y] === 0 &&
                            !visited[x][y]
                        ) {
                            stack.push([x, y]);
                            // visited[x][y] = true;
                        }
                    });
                    //    debugger;
                }
                // console.log({
                //     AllPointsInConvexPolygons,
                //     pointsInConvexPolygonsToBeSearch,
                // });
                //如果一个点失败了,那么应该放回去重新搜索,因为一个点可以重新匹配
                failedPoints.forEach((point) => {
                    visited[point[0]][point[1]] = false;
                });
                //  debugger;
            }
        }
    }
    return new Set(ans);
}
export function FindPointsInsideAllConvexPolygonsLeftButton(
    grid: GridMap,
    visibleGridsMatrix: boolean[][][][],
): Iterable<[number, number]> {
    // console.log(grid);
    // 定义四个方向向量
    const dirs = [
        [-1, 0], // 向左
        [0, 1], // 向上
        [1, 0], // 向右
        [0, -1], // 向下
    ];

    // 获取网格的宽度和高度
    const m = grid.data.length;
    const n = grid.data[0].length;

    // 创建一个二维数组来记录哪些格子已经访问过
    const visited: boolean[][] = Array(grid.data.length)
        .fill(0)
        .map(() => Array(grid.data[0].length).fill(false));

    // 创建一个空数组来存储所有的结果点
    const ans: [number, number][] = [];

    // 遍历每一个格子
    for (let i = m - 1; i >= 0; i--) {
        for (let j = 0; j < n; j++) {
            // 如果当前格子是空的，并且还没有被访问过
            if (grid.data[i][j] === 0 && !visited[i][j]) {
                // debugger;
                // 将当前格子压入栈中
                const stack: [number, number][] = [];

                // 创建一个集合来存储当前凸包中的点
                const pointsInConvexPolygonsToBeSearch = new Set<number>();
                const AllPointsInConvexPolygons = new Set<number>();

                stack.push([i, j]);

                // 标记当前格子已经被访问过
                // visited[i][j] = true;

                // 将当前格子添加到凸包中
                pointsInConvexPolygonsToBeSearch.add(
                    twoDimensionsToOneDimension(i, j, n),
                );
                AllPointsInConvexPolygons.add(
                    twoDimensionsToOneDimension(i, j, n),
                );
                //如果一个点失败了,那么应该放回去重新搜索,因为一个点可以重新匹配
                const failedPoints: [number, number][] = [];
                // 当栈不为空时，继续执行循环
                while (stack.length) {
                    // debugger;
                    // 弹出栈顶的格子
                    const [curI, curJ] = stack.pop() as [number, number];
                    // console.log(curI, curJ);
                    // 如果当前格子已经被访问过，或者它是障碍物，则跳过它
                    if (visited[curI][curJ] || grid.data[curI][curJ] === 1) {
                        continue;
                    }

                    // 标记当前格子已经被访问过
                    visited[curI][curJ] = true;

                    // 创建一个集合来存储需要删除的点
                    const toBeDeleted = new Set<number>();

                    // 计数器，用来计算当前凸包中有多少个点与当前格子相邻
                    const size = pointsInConvexPolygonsToBeSearch.size;
                    let count = 0;
                    // 遍历当前凸包中的每一个点
                    for (const point of pointsInConvexPolygonsToBeSearch) {
                        // 解析点的字符串表示，得到它的坐标
                        const pointArr = oneDimensionToTwoDimensions(
                            point,
                            n,
                        ) as [number, number];

                        // 检查当前点是否满足凸性条件
                        if (
                            dirs.every((dir) => {
                                const x = pointArr[0] + dir[0];
                                const y = pointArr[1] + dir[1];
                                return (
                                    x >= 0 &&
                                    x < m &&
                                    y >= 0 &&
                                    y < n &&
                                    grid.isFree(x, y) &&
                                    AllPointsInConvexPolygons.has(
                                        twoDimensionsToOneDimension(x, y, n),
                                    )
                                );
                            })
                        ) {
                            toBeDeleted.add(point);
                            ans.push(pointArr);
                        }
                    }
                    for (const point of pointsInConvexPolygonsToBeSearch) {
                        const pointArr = oneDimensionToTwoDimensions(
                            point,
                            n,
                        ) as [number, number];

                        // 如果这个点与当前格子相邻，并且它们之间没有障碍物
                        if (
                            (pointArr[0] === curI &&
                                pointArr[1] === curJ &&
                                grid.isFree(pointArr[0], pointArr[1])) ||
                            visibleGridsMatrix[pointArr[0]][pointArr[1]][curI][
                                curJ
                            ]
                        ) {
                            count++;
                        } else {
                            break;
                        }
                    }
                    // console.log({ count, size });
                    // 删除所有需要删除的点
                    for (const point of toBeDeleted) {
                        pointsInConvexPolygonsToBeSearch.delete(point);
                    }

                    // 如果当前凸包中的点数量没有发生变化，则跳过当前格子

                    if (count !== size) {
                        failedPoints.push([curI, curJ]);

                        continue;
                    } else {
                        pointsInConvexPolygonsToBeSearch.add(
                            twoDimensionsToOneDimension(curI, curJ, n),
                        );
                        AllPointsInConvexPolygons.add(
                            twoDimensionsToOneDimension(curI, curJ, n),
                        );
                    }
                    // 遍历当前凸包中的每一个点
                    for (const point of pointsInConvexPolygonsToBeSearch) {
                        // 解析点的字符串表示，得到它的坐标
                        const pointArr = oneDimensionToTwoDimensions(
                            point,
                            n,
                        ) as [number, number];

                        // 检查当前点是否满足凸性条件
                        if (
                            dirs.every((dir) => {
                                const x = pointArr[0] + dir[0];
                                const y = pointArr[1] + dir[1];
                                return (
                                    x >= 0 &&
                                    x < m &&
                                    y >= 0 &&
                                    y < n &&
                                    grid.isFree(x, y) &&
                                    AllPointsInConvexPolygons.has(
                                        twoDimensionsToOneDimension(x, y, n),
                                    )
                                );
                            })
                        ) {
                            toBeDeleted.add(point);
                            ans.push(pointArr);
                        }
                    }
                    // 删除所有需要删除的点
                    for (const point of toBeDeleted) {
                        pointsInConvexPolygonsToBeSearch.delete(point);
                    }
                    // 遍历当前格子的四个方向
                    dirs.forEach((dir) => {
                        const x = curI + dir[0];
                        const y = curJ + dir[1];
                        // 如果当前方向上的格子是空的，并且还没有被访问过
                        if (
                            x >= 0 &&
                            x < m &&
                            y >= 0 &&
                            y < n &&
                            grid.data[x][y] === 0 &&
                            !visited[x][y]
                        ) {
                            stack.push([x, y]);
                            // visited[x][y] = true;
                        }
                    });
                    //    debugger;
                }
                // console.log({
                //     AllPointsInConvexPolygons,
                //     pointsInConvexPolygonsToBeSearch,
                // });
                //如果一个点失败了,那么应该放回去重新搜索,因为一个点可以重新匹配
                failedPoints.forEach((point) => {
                    visited[point[0]][point[1]] = false;
                });
                //  debugger;
            }
        }
    }
    return new Set(ans);
}
/**
 * 计算所有点被所有凸多边形包围的内部点
 *算法类似于岛屿问题
 *反向搜索
 * @param grid 网格地图
 * @param visibleGridsMatrix 可见网格矩阵
 * @returns 被所有凸多边形包围的点的坐标数组
 */
export function FindPointsInsideAllConvexPolygonsRightTop(
    grid: GridMap,
    visibleGridsMatrix: boolean[][][][],
): Iterable<[number, number]> {
    // console.log(grid);
    // 定义四个方向向量
    const dirs = [
        [-1, 0], // 向左
        [0, 1], // 向上
        [1, 0], // 向右
        [0, -1], // 向下
    ];

    // 获取网格的宽度和高度
    const m = grid.data.length;
    const n = grid.data[0].length;

    // 创建一个二维数组来记录哪些格子已经访问过
    const visited: boolean[][] = Array(grid.data.length)
        .fill(0)
        .map(() => Array(grid.data[0].length).fill(false));

    // 创建一个空数组来存储所有的结果点
    const ans: [number, number][] = [];

    // 遍历每一个格子
    for (let i = 0; i < m; i++) {
        for (let j = n - 1; j >= 0; j--) {
            // 如果当前格子是空的，并且还没有被访问过
            if (grid.data[i][j] === 0 && !visited[i][j]) {
                // debugger;
                // 将当前格子压入栈中
                const stack: [number, number][] = [];

                // 创建一个集合来存储当前凸包中的点
                const pointsInConvexPolygonsToBeSearch = new Set<number>();
                const AllPointsInConvexPolygons = new Set<number>();

                stack.push([i, j]);

                // 标记当前格子已经被访问过
                // visited[i][j] = true;

                // 将当前格子添加到凸包中
                pointsInConvexPolygonsToBeSearch.add(
                    twoDimensionsToOneDimension(i, j, n),
                );
                AllPointsInConvexPolygons.add(
                    twoDimensionsToOneDimension(i, j, n),
                );
                //如果一个点失败了,那么应该放回去重新搜索,因为一个点可以重新匹配
                const failedPoints: [number, number][] = [];
                // 当栈不为空时，继续执行循环
                while (stack.length) {
                    // debugger;
                    // 弹出栈顶的格子
                    const [curI, curJ] = stack.pop() as [number, number];
                    // console.log(curI, curJ);
                    // 如果当前格子已经被访问过，或者它是障碍物，则跳过它
                    if (visited[curI][curJ] || grid.data[curI][curJ] === 1) {
                        continue;
                    }

                    // 标记当前格子已经被访问过
                    visited[curI][curJ] = true;

                    // 创建一个集合来存储需要删除的点
                    const toBeDeleted = new Set<number>();

                    // 计数器，用来计算当前凸包中有多少个点与当前格子相邻
                    const size = pointsInConvexPolygonsToBeSearch.size;
                    let count = 0;
                    // 遍历当前凸包中的每一个点
                    for (const point of pointsInConvexPolygonsToBeSearch) {
                        // 解析点的字符串表示，得到它的坐标
                        const pointArr = oneDimensionToTwoDimensions(
                            point,
                            n,
                        ) as [number, number];

                        // 检查当前点是否满足凸性条件
                        if (
                            dirs.every((dir) => {
                                const x = pointArr[0] + dir[0];
                                const y = pointArr[1] + dir[1];
                                return (
                                    x >= 0 &&
                                    x < m &&
                                    y >= 0 &&
                                    y < n &&
                                    grid.isFree(x, y) &&
                                    AllPointsInConvexPolygons.has(
                                        twoDimensionsToOneDimension(x, y, n),
                                    )
                                );
                            })
                        ) {
                            toBeDeleted.add(point);
                            ans.push(pointArr);
                        }
                    }
                    for (const point of pointsInConvexPolygonsToBeSearch) {
                        const pointArr = oneDimensionToTwoDimensions(
                            point,
                            n,
                        ) as [number, number];

                        // 如果这个点与当前格子相邻，并且它们之间没有障碍物
                        if (
                            (pointArr[0] === curI &&
                                pointArr[1] === curJ &&
                                grid.isFree(pointArr[0], pointArr[1])) ||
                            visibleGridsMatrix[pointArr[0]][pointArr[1]][curI][
                                curJ
                            ]
                        ) {
                            count++;
                        } else {
                            break;
                        }
                    }
                    // console.log({ count, size });
                    // 删除所有需要删除的点
                    for (const point of toBeDeleted) {
                        pointsInConvexPolygonsToBeSearch.delete(point);
                    }

                    // 如果当前凸包中的点数量没有发生变化，则跳过当前格子

                    if (count !== size) {
                        failedPoints.push([curI, curJ]);

                        continue;
                    } else {
                        pointsInConvexPolygonsToBeSearch.add(
                            twoDimensionsToOneDimension(curI, curJ, n),
                        );
                        AllPointsInConvexPolygons.add(
                            twoDimensionsToOneDimension(curI, curJ, n),
                        );
                    }
                    // 遍历当前凸包中的每一个点
                    for (const point of pointsInConvexPolygonsToBeSearch) {
                        // 解析点的字符串表示，得到它的坐标
                        const pointArr = oneDimensionToTwoDimensions(
                            point,
                            n,
                        ) as [number, number];

                        // 检查当前点是否满足凸性条件
                        if (
                            dirs.every((dir) => {
                                const x = pointArr[0] + dir[0];
                                const y = pointArr[1] + dir[1];
                                return (
                                    x >= 0 &&
                                    x < m &&
                                    y >= 0 &&
                                    y < n &&
                                    grid.isFree(x, y) &&
                                    AllPointsInConvexPolygons.has(
                                        twoDimensionsToOneDimension(x, y, n),
                                    )
                                );
                            })
                        ) {
                            toBeDeleted.add(point);
                            ans.push(pointArr);
                        }
                    }
                    // 删除所有需要删除的点
                    for (const point of toBeDeleted) {
                        pointsInConvexPolygonsToBeSearch.delete(point);
                    }
                    // 遍历当前格子的四个方向
                    dirs.forEach((dir) => {
                        const x = curI + dir[0];
                        const y = curJ + dir[1];
                        // 如果当前方向上的格子是空的，并且还没有被访问过
                        if (
                            x >= 0 &&
                            x < m &&
                            y >= 0 &&
                            y < n &&
                            grid.data[x][y] === 0 &&
                            !visited[x][y]
                        ) {
                            stack.push([x, y]);
                            // visited[x][y] = true;
                        }
                    });
                    //    debugger;
                }
                // console.log({
                //     AllPointsInConvexPolygons,
                //     pointsInConvexPolygonsToBeSearch,
                // });
                //如果一个点失败了,那么应该放回去重新搜索,因为一个点可以重新匹配
                failedPoints.forEach((point) => {
                    visited[point[0]][point[1]] = false;
                });
                //  debugger;
            }
        }
    }
    return new Set(ans);
}
