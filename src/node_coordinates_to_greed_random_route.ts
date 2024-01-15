export const node_coordinates_to_greed_random_route = new WeakMap<
    number[][],
    Promise<{
        route: number[];
        length: number;
    }>
>();
