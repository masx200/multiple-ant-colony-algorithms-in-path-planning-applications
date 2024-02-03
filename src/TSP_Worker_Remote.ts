import { ProxyMethods, RemoteObject } from "comlink";

import { TSP_Worker_API } from "./TSP_Worker_API";
/**
 * TSP_Worker_Remote类型定义
 */
export type TSP_Worker_Remote = {
    worker: Worker; // Worker对象
    terminate: () => void; // 用于终止worker的函数
    remote: RemoteObject<TSP_Worker_API> & ProxyMethods; // 远程对象，同时具有TSP_Worker_API和ProxyMethods的属性和方法
};
