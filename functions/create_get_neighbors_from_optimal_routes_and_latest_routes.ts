import "core-js/stable/array/at";

import { uniq } from "lodash-es";

import { assert_Integer } from "../test/assert_Integer";

/**
 * 创建一个函数，用于从最优路线和最新路线中获取邻居城市。
 * @param latest_and_optimal_routes 最新和最优路线数组，每个元素包含一个路线数组和路线长度。
 * @returns 返回一个对象，包含一个用于获取邻居城市的函数和一个用于清空缓存的函数。
 */
export function create_get_neighbors_from_optimal_routes_and_latest_routes(
    latest_and_optimal_routes: {
        route: number[];
        length: number;
    }[],
): { get: (city: number) => number[]; clear(): void } {
    const cache = new Map<number, number[]>();
    /**
     * 从最优路线和最新路线中获取邻居城市。
     * @param city 城市编号。
     * @returns 返回邻居城市数组。
     */
    function get_neighbors_from_optimal_routes_and_latest_routes(
        city: number,
    ): number[] {
        assert_Integer(city, "city should be an integer,but received:" + city);
        const cached = cache.get(city);
        if (cached) {
            return cached;
        }
        const result = uniq(
            latest_and_optimal_routes
                .map(({ route }) => {
                    const index = route.findIndex((v) => v === city);

                    if (index < 0) {
                        throw Error("Incorrect_route_found of city");
                    }

                    return [
                        route.at((index - 1 + route.length) % route.length),
                        route.at((index + 1 + route.length) % route.length),
                    ].filter((n) => typeof n === "number") as number[];
                })
                .flat(),
        );
        cache.set(city, result);
        return result;
    }
    return {
        get: get_neighbors_from_optimal_routes_and_latest_routes,
        clear() {
            cache.clear();
        },
    };
}
