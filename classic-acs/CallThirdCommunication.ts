import { extractCommonRoute } from "../common/extractCommonRoute";
import {
    WayPopulationsCommunicate,
    WorkerRemoteAndInfo,
} from "./MultiPopulationSchedulerCreate";

//执行第三种交流策略
export async function CallThirdCommunication(
    HistoryOfTheWayPopulationsCommunicate: WayPopulationsCommunicate[],
    remoteWorkers: WorkerRemoteAndInfo[],
    lengths: number[],
) {
    HistoryOfTheWayPopulationsCommunicate.push("奖励最差种群");

    const sorted = remoteWorkers
        .map((w, i) => ({
            remote: w,
            length: lengths[i],
        }))
        .sort((a, b) => a.length - b.length);
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    if (first.length !== last.length) {
        const routes = await first.remote.getCollectionOfBetterRoutes();
        const commonRoute = extractCommonRoute(routes);

        await last.remote.rewardCommonRoutes(commonRoute);
    }
}
