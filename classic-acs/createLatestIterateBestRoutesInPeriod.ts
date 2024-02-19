import { maxBy } from "lodash-es";

/**
 * 创建一个函数，用于获取一段时间内最佳路径的迭代结果
 * @returns {Object} 包含获取最新迭代最佳路径和更新迭代最佳路径的函数的对象
 */
export function createLatestIterateBestRoutesInPeriod() {
    /**
     * 更新迭代最佳路径的函数
     * @param {Array} routes_and_lengths_of_one_iteration 一个迭代中的路径和长度数组
     */
    function onUpdateIterateBestRoutesInPeriod(
        routes_and_lengths_of_one_iteration: {
            route: number[];
            length: number;
            time_ms: number;
        }[],
    ) {
        /**
         * 获取当前迭代的最佳路径
         */
        const iterate_best_route = maxBy(
            routes_and_lengths_of_one_iteration,
            (a) => a.length,
        )?.route;
        if (iterate_best_route) {
            latestIterateBestRoutesInPeriod.push(iterate_best_route);
        }
    }

    /**
     * 存储最新迭代最佳路径的数组
     */
    let latestIterateBestRoutesInPeriod: number[][] = [];

    /**
     * 获取一段时间内最佳路径的迭代结果
     * @param {number} period 时间周期
     * @returns {Array} 最佳路径的迭代结果数组
     */
    function getLatestIterateBestRoutesInPeriod(period: number) {
        const result = latestIterateBestRoutesInPeriod.slice(-period);
        if (latestIterateBestRoutesInPeriod.length > period) {
            latestIterateBestRoutesInPeriod = latestIterateBestRoutesInPeriod
                .slice(-period);
        }

        return result;
    }

    return {
        getLatestIterateBestRoutesInPeriod,
        onUpdateIterateBestRoutesInPeriod,
    };
}
