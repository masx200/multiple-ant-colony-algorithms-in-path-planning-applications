import { getPathCoordinates } from "./getPathCoordinates";
import { GridMap } from "./grid-map";

/**
 * 判断从起始点能否通过一条直线到达终点
 *
 * @param start 起始点坐标
 * @param end 终点坐标
 * @param grid 地图数据
 * @returns 布尔值，表示是否能够到达终点
 */
export function canStraightReach(
    start: [number, number],
    end: [number, number],
    grid: GridMap,
): boolean {
    const [startCol, startRow] = start;
    const [endCol, endRow] = end;

    // 获取地图的列和行
    const mapColumn = grid.column,
        mapRow = grid.row;

    // 判断起始点和终点是否在地图范围内
    // 判断起始点和终点是否在地图范围内
    if (
        // 起始行号小于0或大于等于地图行数或起始列号小于0或大于等于地图列数
        startRow < 0 ||
        startRow >= mapRow ||
        startCol < 0 ||
        startCol >= mapColumn
    ) {
        return false;
    }

    if (endRow < 0 || endRow >= mapRow || endCol < 0 || endCol >= mapColumn) {
        return false;
    }

    // 判断起始点是否是终点
    // 判断起始点是否是终点
    if (startRow === endRow && startCol === endCol) {
        return true;
    }
    const pcd = getPathCoordinates(start, end);
    if (grid.isObstacle(startCol, startRow)) return false;
    if (grid.isObstacle(endCol, endRow)) return false;

    // 检查路径是否在网格内
    // 检查路径是否在网格内
    for (let i = 0; i + 1 < pcd.length; i++) {
        const [x1, y1] = pcd[i];
        const [x2, y2] = pcd[i + 1];

        // 如果相邻点之间的横坐标差为1且纵坐标差为1
        if (Math.abs(x1 - x2) == 1 && Math.abs(y1 - y2) == 1) {
            // 如果横坐标为x1的纵坐标位置和横坐标为x2的纵坐标位置都是障碍物，则返回false
            if (grid.isObstacle(x1, y2) && grid.isObstacle(x2, y1))
                return false;
        }
    }

    // 如果路径上所有点的值都为0，则返回true，否则返回false
    if (
        pcd.every(([x, y]) => {
            return grid.data[x][y] === 0;
        })
    ) {
        return true;
    }

    return false;
}
