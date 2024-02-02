import { assert_true } from "../test/assert_true";
import { GetDistanceBySerialNumber } from "./GetDistanceBySerialNumber";
import { GetPheromone } from "./GetPheromone";

/**
 * 计算状态转换概率
 * @param {Object} options - 参数对象
 * @param {GetPheromone} options.getpheromone - 获取pheromone的方法
 * @param {number} options.nextnode - 下一个节点的编号
 * @param {number} options.currentnode - 当前节点的编号
 * @param {number} options.alpha - alpha参数
 * @param {GetDistanceBySerialNumber} options.getdistancebyserialnumber - 根据序列号获取距离的方法
 * @param {number} options.beta - beta参数
 * @returns {number} - 状态转换概率
 */
export function calc_state_transition_probabilities({
    end,
    getpheromone,
    nextnode,
    currentnode,
    alpha,
    getdistancebyserialnumber,
    beta,
}: {
    getpheromone: GetPheromone;
    nextnode: number;
    currentnode: number;
    alpha: number;
    end: number;
    getdistancebyserialnumber: GetDistanceBySerialNumber;
    beta: number;
}): number {
    const pheromone = getpheromone(nextnode, currentnode);
    assert_true(!Number.isNaN(pheromone), "pheromone should not be NaN");
    const 启发式信息 =
        1 /
        (getdistancebyserialnumber(nextnode, currentnode) +
            getdistancebyserialnumber(nextnode, end));
    const weight =
        Math.pow(pheromone, alpha) *
        Math.pow(
            //启发式信息为:1/(当前节点到下一个节点的距离+下一个节点到终点的距离)
            启发式信息,
            beta,
        );

    assert_true(!Number.isNaN(weight), "weight should not be NaN");

    return Math.max(0, weight);
}
