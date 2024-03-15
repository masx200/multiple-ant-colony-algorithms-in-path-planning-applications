import { visibleGridsMatrixCallBack } from "../path-planning/visibleGridsMatrixCallBack";
/**
 * Options for local optimization routes.
 */
export interface LocalOptimizationRoutesOptions {
    /**
     * Routes and their lengths.
     */
    routes_and_lengths: { route: number[]; length: number }[];

    /**
     * Number of nodes.
     */
    count_of_nodes: number;

    /**
     * Maximum number of segments for cross points.
     */
    max_segments_of_cross_point: number;

    /**
     * Round the distance.
     */
    distance_round: boolean;

    /**
     * Maximum number of results for K-opt.
     */
    // max_results_of_k_opt: number;

    /**
     * Node coordinates.
     */
    node_coordinates: number[][];

    /**
     * Maximum number of results for K-exchange.
     */
    // max_results_of_k_exchange: number;

    /**
     * Maximum number of results for 2-opt.
     */
    max_results_of_2_opt: number;

    /**
     * Check if a straight line can reach.
     */
    canStraightReach: visibleGridsMatrixCallBack;

    /**
     * Get the distance between two points.
     */
    getGridDistance: (a: [number, number], b: [number, number]) => number;
}
