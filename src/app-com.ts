import {
    DefaultOptions,
    default_search_rounds,
    default_search_time_seconds,
} from "./default_Options";
import {
    Ref,
    computed,
    defineComponent,
    onMounted,
    reactive,
    readonly,
    ref,
    watch,
} from "vue";
import {
    get_options_route_number_and_best_length_chart,
    迭代次数和迭代最优路径长度,
} from "./get_options_route_number_and_best_length_chart";

import Data_table from "./Data_table.vue";
import { ECBasicOption } from "echarts/types/dist/shared";
import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "./Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
import LineChart from "./LineChart.vue";
import { MultiPopulationOutput } from "../classic-acs/MultiPopulationOutput";
import { MultiPopulationSchedulerRemote } from "../classic-acs/MultiPopulationSchedulerRemote";
import MultiplePopulationsConfigs from "./multiple-populations-configs.vue";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import Progress_element from "./Progress-element.vue";
import { RunWay } from "./RunWay";
import { Stop_TSP_Worker } from "./Stop_TSP_Worker";
import { TSP_Reset } from "./TSP_Reset";
import { TSP_RunnerRef } from "./TSP_workerRef";
import { TSP_cities_data } from "./TSP_cities_data";
import { TSP_cities_map } from "./TSP_cities_map";
import { assert_number } from "../test/assert_number";
import { createMultipleLinesChartOptions } from "../functions/createMultipleLinesChartOptions";
import { generate_greedy_preview_echarts_options } from "./generate_greedy_preview_echarts_options";
import { get_options_route_of_node_coordinates } from "./get_options_route_of_node_coordinates";
import { run_tsp_by_search_rounds } from "./run_tsp-by-search-rounds";
import { run_tsp_by_search_time } from "./run_tsp_by_search_time";
import { set_distance_round } from "./set_distance_round";
import { useDateOfPopulationCommunication } from "./useDateOfPopulationCommunication";
import { useOptionsOfIterationsAndInformationEntropyChart } from "./useOptionsOfIterationsAndInformationEntropyChart";
import { useOptionsOfRoutesAndRouteLengthChart } from "./useOptionsOfRoutesAndRouteLengthChart";
import { use_data_of_greedy_iteration } from "./use_data_of_greedy_iteration";
import { use_data_of_one_iteration } from "./use_data_of_one_iteration";
// import { use_data_of_one_route } from "./use_data_of_one_route";
import { use_data_of_summary } from "./use_data_of_summary";
import { use_history_of_best } from "./use_history_of_best";
import { use_initialize_tsp_runner } from "./use_initialize_tsp_runner";
import { 迭代次数和相对信息熵 } from "./get_options_iterations_and_information_entropy_chart";
import { 迭代次数和种群相似度 } from "./getOptionsOfIterationsAndPopulationSimilarityChart";
import { 迭代次数和迭代平均路径长度 } from "./get_options_route_number_and_current_length_chart";
import { 迭代次数和迭代最差路径长度 } from "./getOptionsOfRouteNumberAndBestLengthChartOfIndividualPopulations";

export const 迭代次数和全局最优路径长度 = "迭代次数和全局最优路径长度";

export default defineComponent({
    components: {
        MultiplePopulationsConfigs,
        "Data-table": Data_table,
        "Progress-element": Progress_element,
        LineChart,
    },
    setup() {
        const optionsOfIterationAndGlobalBestLength = computed<ECBasicOption>(
            () => {
                const IterationDataOfIndividualPopulations =
                    IterationDataOfIndividualPopulationsRef.value;
                const title_text = 迭代次数和全局最优路径长度;
                const datas: [number, number][][] =
                    IterationDataOfIndividualPopulations.map((a) =>
                        a.map((d, i) => [i + 1, d.global_best_length]),
                    );
                return createMultipleLinesChartOptions({
                    yAxis_min: 0,
                    title_text,
                    datas: datas,
                });
            },
        );
        const count_of_populations = computed(
            () =>
                input_options.number_of_the_second_type_of_population +
                input_options.number_of_populations_of_the_first_category,
        );
        const search_rounds_all = computed({
            get() {
                return Math.floor(
                    searchrounds.value * count_of_populations.value,
                );
            },
            set(v) {
                searchrounds.value = Math.floor(v / count_of_populations.value);
            },
        });
        const {
            similarityOfAllPopulationsHistoryRef,
            similarityOfAllPopulationsTableHeads,
            onReceiveDataOfPopulationCommunication,
        } = useDateOfPopulationCommunication();
        const {
            optionsOfIterationsAndPopulationSimilarityChart,
            options_of_iterations_and_information_entropy_chart,
            onUpdateIterationDataOfIndividualPopulations,
            IterationDataOfIndividualPopulationsRef,
        } = useOptionsOfIterationsAndInformationEntropyChart();
        const {
            optionsOfIterationAndIterationAverageLength:
                optionsOfIterationAndIterationAverageLength,
            optionsOfIterationAndIterationWorstLength,
            // onUpdateRouteDataOfIndividualPopulations,
        } = useOptionsOfRoutesAndRouteLengthChart(
            IterationDataOfIndividualPopulationsRef,
        );
        const selected_value = ref(TSP_cities_data[0]);
        const selected_node_coordinates = ref<NodeCoordinates>();

        const input_options = reactive(structuredClone(DefaultOptions));

        const round_result = computed(() => input_options.distance_round);

        watch(round_result, (round) => {
            set_distance_round(round);
        });
        const show_configurations = ref(true);
        const show_history_routes_of_best = ref(true);
        const show_array_routes_of_best = ref(true);
        const show_chart_of_best = ref(false);
        const show_chart_of_best2 = ref(false);
        const show_chart_of_best_individual = ref(false);
        const show_summary_of_routes = ref(true);
        const show_routes_of_best = ref(true);

        const show_chart_of_latest = ref(false);
        const show_chart_of_latest_similarity = ref(false);
        const show_chart_of_entropy = ref(false);
        const 显示每次迭代的统计 = ref(false);
        const show_summary_of_similarity = ref(true);
        const details_shows_should_hide = [
            show_chart_of_best2,
            show_history_routes_of_best,
            show_array_routes_of_best,
            show_chart_of_latest_similarity,
            show_configurations,
            // 显示每次迭代的统计,
            show_chart_of_entropy,
            show_chart_of_best_individual,
            show_chart_of_latest,
            show_summary_of_similarity,
            show_summary_of_routes,
            show_routes_of_best,
            show_chart_of_best,
        ];
        onMounted(() => {
            watch(is_running, (running) => {
                if (running) {
                    details_shows_should_hide.forEach((a) => (a.value = false));
                } else {
                    details_shows_should_hide.forEach((a) => (a.value = true));
                }
            });
            window.addEventListener("beforeunload", (e) => {
                if (is_running.value) {
                    e.returnValue = "是否要关闭";
                    e.preventDefault();
                }
            });
        });
        onMounted(() => {
            if (Reflect.has(navigator, "wakeLock")) {
                let lock:
                    | {
                          addEventListener: (
                              arg0: string,
                              arg1: () => void,
                          ) => void;
                          release: () => Promise<void>;
                      }
                    | null
                    | undefined;
                watch(is_running, async (running) => {
                    if (running) {
                        if (lock) {
                            return;
                        }
                        const wakeLock = Reflect.get(navigator, "wakeLock");

                        lock = await wakeLock.request("screen");

                        lock?.addEventListener("release", () => {
                            lock = null;
                        });
                    } else {
                        if (lock) {
                            await lock.release();
                            return;
                        }
                    }
                });
            }
        });
        const percentage = ref(0);
        const {
            oneiterationtableheads,
            onReceiveDeltaDataOfOneIteration,
            clearDataOfOneIteration,
            oneiterationtablebody,
        } = use_data_of_one_iteration();

        // const {
        //     dataOfAllIterations,

        //     // onReceiveDeltadataOfAllIterations,
        //     cleardataOfAllIterations,
        // } = use_data_of_one_route();
        const {
            on_receive_Data_Of_total,

            summary_best_TableHeads,
            summary_total_TableHeads,
            summary_best_TableBody,
            summary_total_TableBody,
            global_best_routeHeads,
            global_best_routeBody,
            data_of_best: data_of_best,
            on_receive_Data_Of_Global_Best,
            clear_data_of_best,
        } = use_data_of_summary();
        const {
            clearData: clearDataOfHistoryOfBest,
            TableHeads: TableHeadsOfHistoryOfBest,
            TableBody: TableBodyOfHistoryOfBest,
        } = use_history_of_best(readonly(data_of_best));

        const initializeTSP_runner = use_initialize_tsp_runner();

        const is_running = ref(false);

        const disable_switching = ref(false);
        const searchrounds = ref(default_search_rounds);
        const count_of_ants_ref = computed(() => input_options.count_of_ants);
        const selecteleref = ref<HTMLSelectElement>();

        const options_of_best_route_chart: Ref<ECBasicOption> = ref({});

        const optionsOfIterationAndIterationBestLength: Ref<ECBasicOption> =
            computed(() => {
                return get_options_route_number_and_best_length_chart(
                    IterationDataOfIndividualPopulationsRef.value,
                );
            });
        const submit = async () => {
            const options = await generate_greedy_preview_echarts_options({
                selected_node_coordinates,
                selecteleref,
            });
            options_of_best_route_chart.value = options;
        };
        const indeterminate = ref(false);
        async function submit_select_node_coordinates() {
            if (indeterminate.value === true) {
                return;
            }
            onprogress(100 * Math.random());
            indeterminate.value = true;
            await submit();
            onprogress(0);
            indeterminate.value = false;
        }
        onMounted(async () => {
            reset();
            const element = selecteleref.value;
            if (element) {
                element.selectedIndex = 0;
            }
            // data_change_listener();

            await submit_select_node_coordinates();
        });

        const onGlobal_best_routeChange = (route: number[]) => {
            const node_coordinates = selected_node_coordinates.value;
            if (!node_coordinates) {
                return;
            }

            const options = get_options_route_of_node_coordinates({
                route,
                node_coordinates,
            });
            options_of_best_route_chart.value = options;
        };
        // onMounted(() => {
        //     watch(dataOfAllIterations, () => {
        //         data_change_listener();
        //     });
        // });
        // const data_change_listener = () => {
        //     const options =
        //         get_options_route_number_and_best_length_chart(dataOfAllIterations);
        //     optionsOfIterationAndIterationBestLength.value = options;
        // };

        const onprogress = (p: number) => {
            assert_number(p);
            const value = Math.min(100, Math.max(0, p));
            percentage.value = value;
            if (value === 100 || value === 0) {
                navbar_float.value = false;
            } else {
                navbar_float.value = true;
            }
        };
        const create_and_run_tsp_by_search_rounds = async () => {
            is_running.value = true;
            TSP_RunnerRef.value ||= await create_runner();
            const runner = TSP_RunnerRef.value;
            return run_tsp_by_search_rounds({
                on_update_output_data,
                runner: runner.remote,

                onprogress,
                searchrounds,
                count_of_ants_ref,
                is_running,
            });
        };
        const data_of_greedy_iteration = use_data_of_greedy_iteration();
        const greedy_iteration_table_heads =
            data_of_greedy_iteration.tableheads;
        const greedy_iteration_table_body = data_of_greedy_iteration.tablebody;
        const on_receive_data_of_greedy =
            data_of_greedy_iteration.onreceivedata;

        function on_update_output_data(data: MultiPopulationOutput) {
            onReceiveDataOfPopulationCommunication(data);
            on_receive_data_of_greedy(data.data_of_greedy[0]);
            onGlobal_best_routeChange(data.global_best_route);

            on_receive_Data_Of_total(data);
            on_receive_Data_Of_Global_Best(data);
            onReceiveDeltaDataOfOneIteration(data.delta_data_of_iterations);
            // onReceiveDeltadataOfAllIterations(data.data_of_routes);

            onUpdateIterationDataOfIndividualPopulations(
                data.IterationDataOfIndividualPopulations,
            );
            // onUpdateRouteDataOfIndividualPopulations(
            //     data.RouteDataOfIndividualPopulations
            // );
        }

        function TSP_terminate() {
            data_of_greedy_iteration.clearData();
            clearDataOfHistoryOfBest();
            TSP_Reset([
                // cleardataOfAllIterations,
                clearDataOfOneIteration,
                clear_data_of_best,
            ]);
        }

        const resetold = () => {
            TSP_terminate();
            disable_switching.value = false;
            is_running.value = false;
        };
        const reset = () => {
            percentage.value = 0;
            resetold();
        };

        const disable_stop = computed(() => {
            return !is_running.value;
        });
        const navbar_float = ref(false);
        const can_run = ref(true);
        const stop_handler = () => {
            Stop_TSP_Worker();
            navbar_float.value = false;
            is_running.value = false;
            can_run.value = false;
        };
        const resethandler = () => {
            reset();
            location.reload();
        };
        const search_time_seconds = ref(default_search_time_seconds);

        async function create_runner(): Promise<MultiPopulationSchedulerRemote> {
            const count_of_ants_value = count_of_ants_ref.value;
            const element = selecteleref.value;
            const node_coordinates = TSP_cities_map.get(element?.value || "");

            const alpha_value = alpha_zero.value;
            const max_routes_of_greedy_value = max_routes_of_greedy.value;
            const beta_value = beta_zero.value;
            const distance_round = round_result.value;
            if (
                max_routes_of_greedy_value > 0 &&
                beta_value > 0 &&
                alpha_value > 0 &&
                count_of_ants_value >= 2 &&
                node_coordinates
            ) {
                disable_switching.value = true;
                const count_of_ants = count_of_ants_value;
                assert_number(count_of_ants);
                const runner = await initializeTSP_runner({
                    ...input_options,

                    distance_round,

                    max_routes_of_greedy: max_routes_of_greedy_value,
                    alpha_zero: alpha_value,
                    beta_zero: beta_value,

                    node_coordinates: await node_coordinates(),
                    count_of_ants,
                });

                Greedy_algorithm_to_solve_tsp_with_selected_start_pool.destroy();
                return runner;
            } else {
                throw new Error("incorrect parameters create_runner");
            }
        }
        const create_and_run_tsp_by_search_time = async () => {
            is_running.value = true;
            TSP_RunnerRef.value ||= await create_runner();
            const runner = TSP_RunnerRef.value;
            return run_tsp_by_search_time({
                on_update_output_data,
                runner: runner.remote,

                search_time_seconds,
                is_running,
                onprogress,
            });
        };

        const radio_run_way = ref(RunWay.round);
        const run_way_time = RunWay.time;
        const run_way_round = RunWay.round;
        const alpha_zero = computed(() => input_options.alpha_zero);

        const beta_zero = computed(() => input_options.beta_zero);

        const max_routes_of_greedy = computed(
            () => input_options.max_routes_of_greedy,
        );
        // const 显示每次迭代的统计 = ref(false);
        return {
            显示每次迭代的统计,
            optionsOfIterationAndGlobalBestLength,
            show_chart_of_best2,
            迭代次数和迭代最优路径长度,
            迭代次数和种群相似度,
            迭代次数和迭代平均路径长度,
            selected_value,
            show_history_routes_of_best,
            similarityOfAllPopulationsHistoryRef,
            迭代次数和全局最优路径长度,
            show_array_routes_of_best,
            show_configurations,
            summary_best_TableHeads,
            summary_total_TableHeads,
            summary_best_TableBody,
            summary_total_TableBody,
            input_options,
            show_chart_of_latest,
            show_chart_of_entropy,
            round_result,
            optionsOfIterationsAndPopulationSimilarityChart,
            greedy_iteration_table_heads,
            greedy_iteration_table_body,
            max_routes_of_greedy,
            show_chart_of_best,
            alpha_zero,
            beta_zero,
            can_run,
            show_chart_of_latest_similarity,
            search_rounds_all,
            show_summary_of_similarity,
            similarityOfAllPopulationsTableHeads,
            show_routes_of_best,
            show_summary_of_routes,
            options_of_best_route_chart,
            navbar_float,
            show_chart_of_best_individual,
            run_way_round,
            // 显示每次迭代的统计,
            run_way_time,
            radio_run_way,
            create_and_run_tsp_by_search_time,
            search_time_seconds,
            indeterminate,
            TableHeadsOfHistoryOfBest,
            TableBodyOfHistoryOfBest,
            disable_stop,
            stop_handler,
            global_best_routeBody,
            global_best_routeHeads,

            is_running,
            options_of_iterations_and_information_entropy_chart,
            resethandler: resethandler,
            optionsOfIterationAndIterationWorstLength,
            oneiterationtableheads,
            oneiterationtablebody,
            count_of_ants_ref,

            disable_switching,

            create_and_run_tsp_by_search_rounds,
            searchrounds,
            TSP_cities_data,
            submit_select_node_coordinates,
            selecteleref,

            percentage,
            optionsOfIterationAndIterationAverageLength:
                optionsOfIterationAndIterationAverageLength,
            optionsOfIterationAndIterationBestLength,
            迭代次数和迭代最差路径长度,
            迭代次数和相对信息熵,
        };
    },
});
