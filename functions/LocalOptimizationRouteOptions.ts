import { visibleGridsMatrixCallBack } from "../path-planning/visibleGridsMatrixCallBack";

export interface LocalOptimizationRouteOptions {
    count_of_nodes: number;
    max_segments_of_cross_point: number;
    distance_round: boolean;
    route: number[];
    // max_results_of_k_opt: number;
    node_coordinates: number[][];
    length: number;
    // max_results_of_k_exchange: number;
    // max_results_of_2_opt: number;
    canStraightReach: visibleGridsMatrixCallBack;
    getGridDistance: (a: [number, number], b: [number, number]) => number;
}
