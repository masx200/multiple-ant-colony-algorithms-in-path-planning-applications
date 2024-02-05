import { Ref } from "vue";

import { MultiPopulationOutput } from "../classic-acs/MultiPopulationOutput";
import { assert_number } from "../test/assert_number";
import {
    default_count_of_ants,
    default_search_rounds,
} from "./default_Options";
import { tsp_runner_run_async } from "./tsp_runner_run_async";
import { RunnerRemote } from "./RunnerRemote";

/**
 * 通过搜索轮数运行TSP算法
 * @param runner 运行器
 * @param on_update_output_data 更新输出数据的回调函数
 * @param onprogress 进度回调函数
 * @param searchrounds 搜索轮数的引用
 * @param count_of_ants_ref 蚂蚁数量的引用
 * @param is_running 是否正在运行的引用
 * @returns 返回一个Promise对象
 */
export async function run_tsp_by_search_rounds({
    runner,
    on_update_output_data,
    onprogress,
    searchrounds,
    count_of_ants_ref,
    is_running,
}: {
    on_update_output_data(data: MultiPopulationOutput): void;
    runner: RunnerRemote;

    onprogress: (percentage: number) => void;
    searchrounds: Ref<number>;
    count_of_ants_ref: Ref<number>;
    is_running: Ref<boolean>;
}): Promise<void> {
    const iterations_of_search = searchrounds.value;
    const count_of_ants_value = count_of_ants_ref.value;
    if (iterations_of_search > 0 && count_of_ants_value >= 2) {
        const count_of_ants = count_of_ants_value;
        assert_number(count_of_ants);
        assert_number(iterations_of_search);
        is_running.value = true;
        await tsp_runner_run_async({
            on_update_output_data,
            runner: runner,
            iterations_of_search,
            onprogress,
        });
        is_running.value = false;
    } else {
        searchrounds.value = default_search_rounds;
        count_of_ants_ref.value = default_count_of_ants;
        is_running.value = false;
    }
}
