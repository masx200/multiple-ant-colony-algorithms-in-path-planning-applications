import { calc_state_transition_probabilities } from "./calc_state_transition_probabilities";
import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";
import { pickRandomOne } from "./pickRandomOne";
import { SharedOptions } from "./SharedOptions";

/**
 * 从给定的选项中选择下一个节点的轮盘赌法
 * @param options - 选择下一个节点的选项
 * @returns {number} - 选择的下一个节点的编号
 */
export function picknextnodeRoulette(
    options: PickNextNodeRouletteOptions & {
        get_convergence_coefficient: () => number;
    } & SharedOptions,
): number {
    const {
        end,
        alpha_zero, // 轮盘赌法的alpha参数
        beta_zero, // 轮盘赌法的beta参数
        getpheromone, // 获取pheromone值的函数
        getdistancebyserialnumber, // 根据序列号获取距离的函数
        currentnode, // 当前节点
        availablenextnodes, // 可用的下一个节点列表
    } = options;
    if (availablenextnodes.length === 0) {
        throw Error(
            "invalid availablenextnodes:" + JSON.stringify(availablenextnodes),
        );
    }
    const beta = beta_zero;
    const alpha = alpha_zero;
    const result = pickRandomOne(
        availablenextnodes,
        availablenextnodes.map((nextnode) => {
            const weight = calc_state_transition_probabilities({
                ...options,
                getpheromone,
                nextnode,
                currentnode,
                alpha,
                getdistancebyserialnumber,
                beta,
                end,
            });

            return weight;
        }),
    );
    return result;
}
