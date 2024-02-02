/**
 * 循环重新组织给定的数组
 * @param route - 给定的数组
 * @param startwith - 以该元素作为起点
 * @returns 组织后的数组
 * @throws 如果起点或给定的数组不正确，则抛出错误
 */
export function cycle_reorganize(route: number[], startwith: number): number[] {
    if (!route.includes(startwith)) {
        throw new Error("incorrect startwith or route");
    }
    const firstindexinright = route.findIndex((v) => v === startwith);
    if (firstindexinright < 0) {
        throw new Error("incorrect startwith or route");
    }
    const result = route
        .slice(firstindexinright)
        .concat(route.slice(0, firstindexinright));
    return result;
}
