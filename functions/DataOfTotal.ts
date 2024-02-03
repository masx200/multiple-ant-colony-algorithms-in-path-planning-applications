/**
 * 数据类型：总数据
 */
export type DataOfTotal = {
    /**
     * 总共消耗的时间（毫秒）
     */
    total_time_ms: number;
    /**
     * 当前搜索次数
     */
    current_search_count: number;

    /**
     * 当前迭代次数
     */
    current_iterations: number;
    time_of_initialization: number;
};
