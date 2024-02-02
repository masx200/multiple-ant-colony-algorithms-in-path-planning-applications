import { extractCommonRoute } from "../common/extractCommonRoute";
import {
    WayPopulationsCommunicate,
    WorkerRemoteAndInfo,
} from "./MultiPopulationSchedulerCreate";

//执行第二种交流策略
export async function CallSecondCommunication(
    HistoryOfTheWayPopulationsCommunicate: WayPopulationsCommunicate[],
    remoteWorkers: WorkerRemoteAndInfo[],
    lengths: number[],
    getBestRoute: () => number[],
    getBestLength: () => number,
) {
    HistoryOfTheWayPopulationsCommunicate.push("提高收敛速度");
    const backHalf = remoteWorkers
        .map((w, i) => ({
            remote: w,
            length: lengths[i],
        }))
        .sort((a, b) => a.length - b.length)
        .slice(Math.floor(remoteWorkers.length / 2));
    const routes = (
        await Promise.all(
            remoteWorkers.map((remote) => remote.getCollectionOfBetterRoutes()),
        )
    ).flat();
    const commonRoute = extractCommonRoute(routes);

    await Promise.all(
        backHalf
            .map(({ remote }) => remote)
            .map((remote) =>
                remote.updateBestRoute(getBestRoute(), getBestLength()),
            ),
    );

    await Promise.all(
        backHalf.map(({ remote }) => remote.rewardCommonRoutes(commonRoute)),
    );
}
