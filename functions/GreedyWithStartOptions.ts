/**
 * Greedy算法的配置选项。
 * @param visibleGridsMatrix 可见网格的三维数组。
 * @param node_coordinates 城市坐标的二维数组。
 * @param start 起始城市。
 * @param end 终点城市。
 * @param gridDistanceMatrix 网格距离的四维数组。
 * @param visibleGridsListWithOutPointsInsideAllConvexPolygons 不包含在凸多边形内部的点的可见网格列表。
 */
export interface GreedyWithStartOptions {
    visibleGridsList: (a: number, b: number) => Iterable<[number, number]>;
    visibleGridsMatrix: (a: number, b: number, c: number, d: number) => boolean;
    node_coordinates: number[][];
    start: number;
    // round?: boolean;
    // max_cities_of_greedy?: number;
    end: number;
    // getGridDistance: (a: [number, number], b: [number, number]) => number;
    // visibleGridsList: Iterable<[number, number]>[][];

    getGridDistance: (a: [number, number], b: [number, number]) => number;
}
