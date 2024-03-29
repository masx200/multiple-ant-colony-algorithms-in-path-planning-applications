/**
 * 获取最佳路线和长度
 * @param routes_and_lengths 路线和长度的数组
 * @returns 最佳路线和长度的对象
 */
export function getBestRoute_Of_Series_routes_and_lengths(
    routes_and_lengths: {
        route: number[];
        length: number;
    }[],
): {
    route: number[];
    length: number;
} {
    if (!(routes_and_lengths.length > 0)) {
        throw new Error("routes_and_lengths empty!");
    }
    const iterate_best_lengthandroute = routes_and_lengths.reduce(
        (previous, current) => {
            return previous.length < current.length ? previous : current;
        },
        routes_and_lengths[0],
    );

    return iterate_best_lengthandroute;
}
