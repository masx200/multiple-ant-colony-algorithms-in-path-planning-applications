import { getPathCoordinates } from "./getPathCoordinates";
import { GridMap } from "./grid-map";
/**
 * 判断从起始点能否到达终点
 *
 * @param start 起始点坐标
 * @param end 终点坐标
 * @param grid 地图数据
 * @returns 布尔值，表示是否能够到达终点
 */
export function canReach(
    start: [number, number],
    end: [number, number],
    grid: GridMap
): boolean {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;

    const [mapColumn, mapRow] = [grid.column, grid.row];

    // 判断起始点和终点是否在地图范围内
    if (
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
    if (startRow === endRow && startCol === endCol) {
        return true;
    }
    const pcd = getPathCoordinates(start, end);
    // 检查路径是否在网格内
    if (
        pcd.every(([x, y]) => {
            return grid.data[x][y] === 0;
        })
    ) {
        return true;
    }
    return false;
}
