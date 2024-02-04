import { getPathCoordinates } from "./getPathCoordinates";
import { GridMap } from "./grid-map";

/**
 * 获取可用的邻居节点
 *
 * @param pointsInsideAllConvexPolygons - 在所有凸多边形内部的点的集合
 * @param blocked - 已经经过的点的集合
 * @param visibleGridsList - 可见的网格列表
 * @param grid - 网格地图
 * @param [x, y] - 当前格子的坐标
 * @returns 可用的邻居节点数组
 */
export function getAvailableNeighbors(
    //    pointsInsideAllConvexPolygons: Set<number>,
    blocked: Set<number>,
    visibleGridsList: Iterable<[number, number]>[][],
    grid: GridMap,
    [x, y]: [number, number],
): [number, number][] {
    /*每一步可选的格子,从当前格子能够直线到达的格子中筛选,条件有,下一个格子不能是已经经过的格子,当前格子到下一个格子的路径不包含已经经过的格子,而且下一个格子也不在事先算好的凸多边形内部的格子.*/
    const res = new Array<[number, number]>();
    for (const [nx, ny] of visibleGridsList[x][y]) {
        if (
            grid.isFree(nx, ny) &&
            !blocked.has(nx * grid.row + ny) &&
            //提前筛选，删掉在凸多边形内部的格子，
            //    !pointsInsideAllConvexPolygons.has(nx * grid.row + ny) &&
            getPathCoordinates([x, y], [nx, ny])
                //不包括自己把自己挡住
                .filter(([ni, nj]) => !(ni == x && nj == y))
                /* 路径不能经过被禁止的格子 */
                .every(([ni, nj]) => !blocked.has(ni * grid.row + nj))
        ) {
            res.push([nx, ny]);
        }
    }
    return res;
    //.filter(
    //   (item) => grid.isFree(item[0], item[1]), // &&
    // canStraightReach([item[0], item[1]], [x, y], grid) &&
    // !blocked.has(item[0] * grid.row + item[1]),
    //  );
}
