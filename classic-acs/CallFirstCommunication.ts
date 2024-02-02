import {
    WayPopulationsCommunicate,
    WorkerRemoteAndInfo,
} from "./MultiPopulationSchedulerCreate";

//执行第一种交流策略
export async function CallFirstCommunication(
    HistoryOfTheWayPopulationsCommunicate: WayPopulationsCommunicate[],
    remoteWorkers: WorkerRemoteAndInfo[],
    lengths: number[],
    similarityOfAllPopulations: number,
) {
    HistoryOfTheWayPopulationsCommunicate.push("增加多样性");
    const randomHalf = remoteWorkers
        .map((w, i) => ({
            remote: w,
            length: lengths[i],
        }))
        .sort(() => Math.random() - 0.5)
        .slice(Math.floor(remoteWorkers.length / 2));
    await Promise.all(
        randomHalf.map(({ remote }) =>
            remote.smoothPheromones(similarityOfAllPopulations),
        ),
    );
}
