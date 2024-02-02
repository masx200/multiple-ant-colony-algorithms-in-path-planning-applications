export interface GreedyWithStartOptions {
    node_coordinates: number[][];
    start: number;
    // round?: boolean;
    // max_cities_of_greedy?: number;
    end: number;
    gridDistanceMatrix: number[][][][];
    visibleGridsListWithOutPointsInsideAllConvexPolygons: Iterable<
        [number, number]
    >[][];
}
