import { computed, ComputedRef, ref } from "vue";

import { DataOfBestChange } from "../functions/DataOfBestChange";
import { DataOfTotal } from "../functions/DataOfTotal";
/**
 * 使用数据的摘要
 * @param renderBestRoute 渲染最优路径的函数
 * @returns 包含各种数据的引用和函数的对象
 */
export function use_data_of_summary(
    renderBestRoute: (route: Array<number>) => Array<[number, number]>,
) {
    function on_receive_Data_Of_Global_Best(data: DataOfBestChange) {
        data_of_best.value = data;
    }

    function clear_data_of_best() {
        data_of_best.value = undefined;
    }
    const summary_best_TableHeads = [
        "全局最优长度",
        "最优解的耗时秒",
        "最优解路径序号",
    ];
    const summary_total_TableHeads = [
        "总共迭代耗时秒",
        "总计路径数量",
        "总计迭代次数",
        "初始化耗时秒",
    ];
    const global_best_routeHeads = ["全局最优路径"];
    const global_best_routeBody: ComputedRef<[string][]> = computed(() => {
        const result = data_of_best.value;
        return result
            ? [[JSON.stringify(renderBestRoute(result.global_best_route))]]
            : [];
    });
    const summary_best_TableBody: ComputedRef<[number, number, number][]> =
        computed(() => {
            const result = data_of_best.value;
            return result
                ? [
                      [
                          result.global_best_length,
                          result.time_of_best_ms / 1000,
                          result.search_count_of_best,
                      ],
                  ]
                : [];
        });
    const summary_total_TableBody: ComputedRef<
        [number, number, number, number][]
    > = computed(() => {
        const result = data_of_total.value;
        return result
            ? [
                  [
                      result.total_time_ms / 1000,

                      result.current_search_count,
                      result.current_iterations,
                      result.time_of_initialization / 1000,
                  ],
              ]
            : [];
    });
    const data_of_best = ref<DataOfBestChange>();
    const data_of_total = ref<DataOfTotal>();
    function on_receive_Data_Of_total(data: DataOfTotal) {
        data_of_total.value = data;
    }

    return {
        on_receive_Data_Of_total,
        data_of_total,
        summary_best_TableHeads,
        summary_total_TableHeads,
        summary_best_TableBody,
        summary_total_TableBody,
        global_best_routeHeads,
        global_best_routeBody,
        data_of_best: data_of_best,
        on_receive_Data_Of_Global_Best,
        clear_data_of_best,
    };
}
