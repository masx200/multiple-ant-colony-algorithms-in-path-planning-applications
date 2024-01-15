import { sum } from "lodash-es";

import { assert_number } from "../test/assert_number";
import { not_cycle_route_to_segments } from "./not_cycle_route_to_segments";
import { generateUniqueArrayOfCircularPath } from "./generateUniqueArrayOfCircularPath";

export function closed_total_path_length({
    path,
    getdistancebyindex,
    round = false,
}: {
    path: number[];
    getdistancebyindex: (left: number, right: number) => number;
    round?: boolean;
}): number {
    const route = generateUniqueArrayOfCircularPath(path);
    return sum(
        not_cycle_route_to_segments(route).map(function ([left, right]) {
            const distance = getdistancebyindex(left, right);
            assert_number(distance);
            if (round) {
                return Math.round(distance);
            } else {
                return distance;
            }
        }),
    );
}
