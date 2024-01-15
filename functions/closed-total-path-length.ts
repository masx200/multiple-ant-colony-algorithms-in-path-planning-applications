import { sum } from "lodash-es";

import { assert_number } from "../test/assert_number";
import { not_cycle_route_to_segments } from "./not_cycle_route_to_segments";

/**
 * 计算路径的总长度
 *
 * @param path - 路径数组
 * @param getdistancebyIndex - 根据两个索引计算距离的函数
 * @param round - 是否四舍五入，默认为 false
 * @returns 总长度
 */
export function closed_total_path_length({
    path,
    getdistancebyIndex,
    round = false,
}: {
    path: number[];
    getdistancebyIndex: (left: number, right: number) => number;
    round?: boolean;
}): number {
    const route = Array.from(path);
    return sum(
        not_cycle_route_to_segments(route).map(function ([left, right]) {
            const distance = getdistancebyIndex(left, right);
            assert_number(distance);
            if (round) {
                return Math.round(distance);
            } else {
                return distance;
            }
        }),
    );
}
