import { canStraightReachCache } from "./canStraightReachCache";
import { canStraightReachOld } from "./canStraightReachOld";
import { GridMap } from "./grid-map";
/**
 * 判断从起始点能否通过一条直线到达终点
 *
 * @param start 起始点坐标
 * @param end 终点坐标
 * @param grid 地图数据
 * @returns 布尔值，表示是否能够到达终点
 */
export function CachedCanStraightReach(
    start: [number, number],
    end: [number, number],
    grid: GridMap,
): boolean {
    const cache_key = JSON.stringify([start, end]);
    let map = canStraightReachCache.get(grid.data) ?? new Map();

    canStraightReachCache.set(grid.data, map);
    const value = map.get(cache_key);
    if (typeof value != "undefined") {
        // console.log("cache hit", start, end, grid);
        return value;
    }
    const result = canStraightReachOld(start, end, grid);
    map.set(cache_key, result);
    const cache_key_reverse = JSON.stringify([end, start]);
    map.set(cache_key_reverse, result);
    return result;
}
