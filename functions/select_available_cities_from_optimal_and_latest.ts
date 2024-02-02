import { assert_true } from "../test/assert_true";

/**
 * 从最优可用节点中选择可用的城市
 * @param {Object} options - 参数对象
 * @param {Set<number>} options.available_nodes - 可用节点的集合
 * @param {Function} options.get_neighbors_from_optimal_routes_and_latest_routes - 获取当前城市邻居的城市集合函数
 * @param {number} options.current_city - 当前城市
 * @param {number} options.max_cities_of_state_transition - 状态转换的最大城市数量
 * @returns {number[] | Set<number>} - 返回选择的城市集合
 */
export function select_available_cities_from_optimal_and_latest({
    available_nodes,
    get_neighbors_from_optimal_routes_and_latest_routes,
    current_city,
    max_cities_of_state_transition,
}: {
    available_nodes: Set<number>;
    get_neighbors_from_optimal_routes_and_latest_routes: (
        current_city: number,
    ) => number[];
    current_city: number;
    max_cities_of_state_transition: number;
}): number[] | Set<number> {
    assert_true(available_nodes.size > 0);
    const maximum = Math.min(
        max_cities_of_state_transition,
        available_nodes.size,
    );
    const cloned_available = new Set(available_nodes);
    const source = new Set<number>();
    for (const city of get_neighbors_from_optimal_routes_and_latest_routes(
        current_city,
    )) {
        if (source.size <= maximum && available_nodes.has(city)) {
            source.add(city);
            cloned_available.delete(city);
        }
    }

    const length_to_add = maximum - source.size;
    if (length_to_add > 0) {
        if (cloned_available.size > length_to_add) {
            const rest_nodes = Array.from(cloned_available);

            const start = Math.max(
                0,
                Math.floor(Math.random() * rest_nodes.length) - length_to_add,
            );
            assert_true(start >= 0);
            const selected = rest_nodes.slice(start, start + length_to_add);
            assert_true(selected.length === length_to_add);
            selected.forEach((node) => {
                source.add(node);
            });
        } else {
            cloned_available.forEach((node) => {
                source.add(node);
            });
        }
    }
    const result = Array.from(source);

    assert_true(result.length <= available_nodes.size);
    assert_true(result.length <= max_cities_of_state_transition);
    assert_true(result.length > 0);
    return result;
}
