import { sumBy } from "lodash-es";
import { getBestRoute_Of_Series_routes_and_lengths } from "./getBestRoute_Of_Series_routes_and_lengths";
import { LocalOptimizationRoutesOptions } from "./LocalOptimizationRouteOptions";
import { local_optimization_route } from "./local_optimization_route";

export async function local_optimization_routes({
    routes_and_lengths,
    ...options
}: LocalOptimizationRoutesOptions): Promise<{
    route: number[];
    length: number;
    time_ms: number;
}> {
    const results = routes_and_lengths.map(({ route, length }) => {
        return local_optimization_route({ route, length, ...options });
    });

    const time_ms = sumBy(results, (v) => v.time_ms);
    const { route, length } =
        getBestRoute_Of_Series_routes_and_lengths(results);
    return { route, length, time_ms: time_ms };
}