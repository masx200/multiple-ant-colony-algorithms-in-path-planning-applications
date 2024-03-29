import { zip } from "lodash-es";

import { similarityOfMultipleRoutes } from "../similarity/similarityOfMultipleRoutes";
import { CommunicationStrategy } from "../src/CommunicationStrategy";
import { DefaultOptions } from "../src/default_Options";
import { TSP_Worker_Remote } from "../src/TSP_Worker_Remote";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { initializeRemoteWorkers } from "./initializeRemoteWorkers";
import { MultiPopulationOutput } from "./MultiPopulationOutput";
import { MultiPopulationScheduler } from "./MultiPopulationScheduler";
import { ProbabilityOfPerformingTheFirstCommunication } from "./ProbabilityOfPerformingTheFirstCommunication";
import { COMMON_DataOfOneIteration, COMMON_TSP_Output } from "./tsp-interface";
import { CallThirdCommunication } from "./CallThirdCommunication";
import { CallSecondCommunication } from "./CallSecondCommunication";
import { CallFirstCommunication } from "./CallFirstCommunication";
/**
 * 工作远程和信息类型
 */
export type WorkerRemoteAndInfo = TSP_Worker_Remote["remote"] & {
    ClassOfPopulation: string; // 人口分类
    id_Of_Population: number; // 人口ID
};
export type WayPopulationsCommunicate =
    | "奖励最差种群"
    | "增加多样性"
    | "提高收敛速度";
const 在几个交流周期内全局最优解没有变化 = 1;
/**
 * 创建多人口调度器
 * @param input - TSP运行器选项
 * @returns - 多人口调度器的Promise
 */
export async function MultiPopulationSchedulerCreate(
    input: TSPRunnerOptions,
): Promise<MultiPopulationScheduler> {
    const options = Object.assign(structuredClone(DefaultOptions), input);
    const {
        number_of_populations_of_the_first_category,

        number_of_the_second_type_of_population,

        population_communication_iterate_cycle,
    } = options;
    const HistoryOfTheWayPopulationsCommunicate: WayPopulationsCommunicate[] =
        [];
    const HistoryOfPopulationsAllUpdateBestRoute: boolean[] = [];
    const remoteWorkers: WorkerRemoteAndInfo[] = await initializeRemoteWorkers(
        number_of_populations_of_the_first_category,
        options,
        number_of_the_second_type_of_population,
    );

    let current_iterations = 0;
    async function runIterations(iterations: number) {
        if (iterations === 1) return await runOneIteration();
        const splitted_iterations: number[] = [];

        const rest_iterations_period =
            current_iterations %
                (population_communication_iterate_cycle *
                    remoteWorkers.length) ===
            0
                ? 0
                : Math.floor(
                      (population_communication_iterate_cycle *
                          remoteWorkers.length -
                          (current_iterations %
                              (population_communication_iterate_cycle *
                                  remoteWorkers.length))) /
                          remoteWorkers.length,
                  );
        if (rest_iterations_period > 0) {
            splitted_iterations.push(
                Math.min(rest_iterations_period, iterations),
            );

            iterations -= Math.min(rest_iterations_period, iterations);
        }
        while (iterations > population_communication_iterate_cycle) {
            iterations -= population_communication_iterate_cycle;
            splitted_iterations.push(population_communication_iterate_cycle);
        }
        if (iterations > 0) splitted_iterations.push(iterations);

        for (const iteration of splitted_iterations) {
            await Promise.all(
                remoteWorkers.map((remote) => {
                    return remote.runIterations(iteration);
                }),
            );

            const routesAndLengths = await Promise.all(
                remoteWorkers.map(async (remote) => {
                    return {
                        length: await remote.getBestLength(),
                        route: await remote.getBestRoute(),
                    };
                }),
            );
            const totaltimemsall = await Promise.all(
                remoteWorkers.map((remote) => remote.getTotalTimeMs()),
            );
            const current_search_countsall = await Promise.all(
                remoteWorkers.map((remote) => remote.getCurrentSearchCount()),
            );
            const latestIterateBestRoutesInPeriod = (
                await Promise.all(
                    remoteWorkers.map((remote) =>
                        remote.getLatestIterateBestRoutesInPeriod(
                            population_communication_iterate_cycle,
                        ),
                    ),
                )
            ).flat();
            routesAndLengths.forEach(({ route, length: route_length }) => {
                onRouteCreated(route, route_length);
            });

            total_time_ms = totaltimemsall.reduce((p, c) => p + c, 0);

            current_search_count = current_search_countsall.reduce(
                (p, c) => p + c,
                0,
            );
            current_iterations += remoteWorkers.length * iteration;
            await DetermineWhetherToPerformMultiPopulationCommunication(
                routesAndLengths,
                latestIterateBestRoutesInPeriod,
            );
        }
    }
    const global_best: {
        length: number;
        route: number[];
    } = { length: Infinity, route: [] };

    async function DetermineWhetherToPerformMultiPopulationCommunication(
        routesAndLengths: { length: number; route: number[] }[],
        latestIterateBestRoutesInPeriod: number[][],
    ) {
        if (remoteWorkers.length > 1) {
            if (
                current_iterations %
                    (population_communication_iterate_cycle *
                        remoteWorkers.length) ===
                0
            ) {
                await PerformCommunicationBetweenPopulations(
                    routesAndLengths,
                    latestIterateBestRoutesInPeriod,
                );
                const PeriodOfUpdateAllOptimalRoutes = 10;

                if (
                    current_iterations %
                        (population_communication_iterate_cycle *
                            remoteWorkers.length *
                            PeriodOfUpdateAllOptimalRoutes) ===
                    0
                ) {
                    HistoryOfPopulationsAllUpdateBestRoute.push(true);
                    await Promise.all(
                        remoteWorkers.map((remote) =>
                            remote.updateBestRoute(
                                getBestRoute(),
                                getBestLength(),
                            ),
                        ),
                    );
                } else {
                    HistoryOfPopulationsAllUpdateBestRoute.push(false);
                }
            }
        }
    }

    function getBestRoute() {
        return global_best.route;
    }
    function set_global_best(route: number[], length: number) {
        if (length < global_best.length) {
            const formatted_route = Array.from(route);

            global_best.length = length;
            global_best.route = formatted_route;
            time_of_best_ms = total_time_ms;
            search_count_of_best = current_search_count + 1;
        }
    }
    function onRouteCreated(route: number[], length: number) {
        if (length < getBestLength()) {
            set_global_best(route, length);
        }
    }

    function getBestLength() {
        return global_best.length;
    }
    let total_time_ms = 0;
    async function runOneIteration() {
        await Promise.all(
            remoteWorkers.map((remote) => {
                return remote.runOneIteration();
            }),
        );

        const routesAndLengths = await Promise.all(
            remoteWorkers.map(async (remote) => {
                return {
                    length: await remote.getBestLength(),
                    route: await remote.getBestRoute(),
                };
            }),
        );
        const totaltimemsall = await Promise.all(
            remoteWorkers.map((remote) => remote.getTotalTimeMs()),
        );
        const current_search_countsall = await Promise.all(
            remoteWorkers.map((remote) => remote.getCurrentSearchCount()),
        );
        const latestIterateBestRoutesInPeriod = (
            await Promise.all(
                remoteWorkers.map((remote) =>
                    remote.getLatestIterateBestRoutesInPeriod(
                        population_communication_iterate_cycle,
                    ),
                ),
            )
        ).flat();
        routesAndLengths.forEach(({ route, length: route_length }) => {
            onRouteCreated(route, route_length);
        });

        total_time_ms = totaltimemsall.reduce((p, c) => p + c, 0);

        current_search_count = current_search_countsall.reduce(
            (p, c) => p + c,
            0,
        );
        current_iterations += remoteWorkers.length;

        await DetermineWhetherToPerformMultiPopulationCommunication(
            routesAndLengths,
            latestIterateBestRoutesInPeriod,
        );
    }
    let time_of_best_ms = 0;
    let current_search_count = 0;
    let search_count_of_best = 0;

    // let best_length_of_history_route_data = Infinity;
    async function getOutputDataAndConsumeIterationAndRouteData(): Promise<MultiPopulationOutput> {
        const dataOfChildren = await Promise.all(
            remoteWorkers.map((remote) =>
                remote.getOutputDataAndConsumeIterationAndRouteData(),
            ),
        );
        // const RouteDataOfIndividualPopulations = dataOfChildren.map(
        //     (data) => data.data_of_routes
        // );
        // const data_of_routes: COMMON_TSP_Output["data_of_routes"] = (
        //     zip(...RouteDataOfIndividualPopulations)
        //         .flat()
        //         .filter(Boolean) as COMMON_dataOfAllIterations[]
        // ).map((data) => {
        //     data = structuredClone(data);
        //     best_length_of_history_route_data = Math.min(
        //         data.global_best_length,
        //         best_length_of_history_route_data
        //     );
        //     data.global_best_length = best_length_of_history_route_data;
        //     return data;
        // });
        const IterationDataOfIndividualPopulations = dataOfChildren.map(
            (data, index) =>
                data.delta_data_of_iterations.map((di) => {
                    di.ClassOfPopulation =
                        remoteWorkers[index].ClassOfPopulation;
                    di.id_Of_Population = remoteWorkers[index].id_Of_Population;
                    return di;
                }),
        );
        const delta_data_of_iterations: COMMON_TSP_Output["delta_data_of_iterations"] =
            zip(...IterationDataOfIndividualPopulations)
                .flat()
                .filter(Boolean) as COMMON_DataOfOneIteration[];

        const result: MultiPopulationOutput = {
            HistoryOfPopulationsAllUpdateBestRoute,
            HistoryOfTheWayPopulationsCommunicate,
            similarityOfAllPopulationsHistory,
            data_of_greedy: dataOfChildren
                .map((data) => data.data_of_greedy)
                .flat(),
            current_iterations,
            // data_of_routes,
            delta_data_of_iterations,
            current_search_count,
            global_best_length: getBestLength(),
            global_best_route: getBestRoute(),
            total_time_ms,
            time_of_best_ms,
            search_count_of_best,
            IterationDataOfIndividualPopulations,
            time_of_initialization,
            // RouteDataOfIndividualPopulations,
        };

        return result;
    }
    const similarityOfAllPopulationsHistory: number[] = [];

    const { count_of_ants } = options;
    const { Multi_Population_Similarity_evaluation_coefficient } = options;
    async function PerformCommunicationBetweenPopulations(
        routesAndLengths: {
            length: number;
            route: number[];
        }[],
        latestIterateBestRoutesInPeriod: number[][],
    ): Promise<void> {
        if (remoteWorkers.length > 1) {
            const lengths = routesAndLengths.map((a) => a.length);
            const bestRoute = getBestRoute();
            const similarityOfAllPopulations = similarityOfMultipleRoutes(
                latestIterateBestRoutesInPeriod,
                bestRoute,
            );
            similarityOfAllPopulationsHistory.push(similarityOfAllPopulations);
            const similarity = similarityOfAllPopulations;

            const probabilityOfPerformingTheFirstCommunication =
                ProbabilityOfPerformingTheFirstCommunication(
                    similarity,
                    Multi_Population_Similarity_evaluation_coefficient,
                );
            const p0 = Math.random();

            if (options.CommunicationStrategy === CommunicationStrategy.First) {
                return await CallFirstCommunication(
                    HistoryOfTheWayPopulationsCommunicate,
                    remoteWorkers,
                    lengths,
                    similarityOfAllPopulations,
                );
            } else if (
                options.CommunicationStrategy === CommunicationStrategy.Second
            ) {
                return await CallSecondCommunication(
                    HistoryOfTheWayPopulationsCommunicate,
                    remoteWorkers,
                    lengths,
                    getBestRoute,
                    getBestLength,
                );
            } else if (
                options.CommunicationStrategy === CommunicationStrategy.Third
            ) {
                await CallThirdCommunication(
                    HistoryOfTheWayPopulationsCommunicate,
                    remoteWorkers,
                    lengths,
                );
            } else {
                if (
                    p0 < probabilityOfPerformingTheFirstCommunication &&
                    current_search_count - search_count_of_best >
                        在几个交流周期内全局最优解没有变化 *
                            population_communication_iterate_cycle *
                            remoteWorkers.length *
                            count_of_ants
                ) {
                    await CallFirstCommunication(
                        HistoryOfTheWayPopulationsCommunicate,
                        remoteWorkers,
                        lengths,
                        similarityOfAllPopulations,
                    );
                } else if (p0 > probabilityOfPerformingTheFirstCommunication) {
                    await CallSecondCommunication(
                        HistoryOfTheWayPopulationsCommunicate,
                        remoteWorkers,
                        lengths,
                        getBestRoute,
                        getBestLength,
                    );
                } else {
                    await CallThirdCommunication(
                        HistoryOfTheWayPopulationsCommunicate,
                        remoteWorkers,
                        lengths,
                    );
                }
            }
        }
    }

    const result: MultiPopulationScheduler = {
        getCountOfIterations(): number {
            return current_iterations;
        },
        getCurrentSearchCount(): number {
            return current_search_count;
        },
        getTotalTimeMs(): number {
            return total_time_ms;
        },
        runIterations,
        runOneIteration,
        getBestLength: getBestLength,
        getBestRoute: getBestRoute,
        getOutputDataAndConsumeIterationAndRouteData,
        getSearchCountOfBest(): number {
            return search_count_of_best;
        },
        getTimeOfBest(): number {
            return time_of_best_ms;
        },
        get_time_of_initialization() {
            return time_of_initialization;
        },
    };
    const time_of_initialization = (
        await Promise.all(
            remoteWorkers.map((r) => r.get_time_of_initialization()),
        )
    ).reduce((a, b) => a + b, 0);
    return result;
}
