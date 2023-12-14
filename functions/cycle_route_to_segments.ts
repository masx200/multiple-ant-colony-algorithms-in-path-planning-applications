/**
 * 将循环路径转换为段数组
 * @param route 循环路径
 * @returns 段数组
 */
export function cycle_route_to_segments<T>(route: T[]): [T, T][] {
    return route.map((value, index, array) => {
        const nextindex: number = index === array.length - 1 ? 0 : index + 1;
        return [value, array[nextindex]];
    });
}
