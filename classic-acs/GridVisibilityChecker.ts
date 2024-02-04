/**
 * 网格可见性检查器接口
 */
export interface GridVisibilityChecker {
    /**
     * 获取可见网格列表
     * @param a 网格的行数
     * @param b 网格的列数
     * @returns 可见网格的坐标列表
     */
    visibleGridsList: (a: number, b: number) => Iterable<[number, number]>;

    /**
     * 检查网格是否可见
     * @param a 网格的行数
     * @param b 网格的列数
     * @param c 网格的深度
     * @param d 网格的高度
     * @returns 网格是否可见
     */
    visibleGridsMatrix: (a: number, b: number, c: number, d: number) => boolean;
}
