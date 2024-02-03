import { Remote, wrap } from "comlink";

/**
 * 创建一个使用 comlink 库的 Worker 实例
 * @param createWorker 创建 Worker 实例的函数
 * @param error_listener Worker 发生错误时的回调函数
 * @returns 包含远程调用接口和 Worker 实例的对象
 */
export function create_Worker_comlink<API>(
    createWorker: () => Worker,
    error_listener: (this: Worker, ev: ErrorEvent) => void,
): { remote: Remote<API>; worker: Worker } & { terminate: () => void } {
    // 创建 Worker 实例
    const endpoint = createWorker();
    // 包装 Worker 实例为远程调用接口
    const remote = wrap<API>(endpoint);
    // 添加错误事件监听器
    endpoint.addEventListener("error", error_listener);
    // 创建包含远程调用接口和 Worker 实例的对象
    const result = {
        remote,
        worker: endpoint,
        // 终止 Worker 实例并移除错误事件监听器
        terminate: () => {
            endpoint.terminate();
            endpoint.removeEventListener("error", error_listener);
        },
    };

    return result;
}
