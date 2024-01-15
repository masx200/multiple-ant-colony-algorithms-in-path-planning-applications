import { getOrCreateMapOfMapFun } from "../functions/getOrCreateMapOfMapFun";
import { getUniqueStringOfCircularRoute } from "../functions/getUniqueStringOfCircularRoute";
import { is_intersection_filter_with_cycle_route_old } from "./is_intersection_filter_with_cycle_route_old";
import { node_coordinates_to_intersect_routes_unique } from "./node_coordinates_to_intersect_routes_unique";

export function cacheble_is_intersection_filter_with_cycle_route({
    cycle_route,
    node_coordinates,
}: {
    cycle_route: number[];

    node_coordinates: number[][];
}): boolean {
    const map = getOrCreateMapOfMapFun(
        node_coordinates_to_intersect_routes_unique,
        node_coordinates,
    );
    const unique_string = getUniqueStringOfCircularRoute(cycle_route);
    if (map.has(unique_string)) {
        const cached = map.get(unique_string);
        if (!cached) {
            return false;
        } else {
            return true;
        }
    }
    const result = is_intersection_filter_with_cycle_route_old({
        cycle_route,
        node_coordinates,
    });
    map.set(unique_string, result);

    return result;
}
