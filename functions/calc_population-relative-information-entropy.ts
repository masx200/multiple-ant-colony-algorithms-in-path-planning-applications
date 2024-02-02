import { sum, uniq } from "lodash-es";

import { assert_true } from "../test/assert_true";
import { getUniqueStringOfCircularRoute } from "./getUniqueStringOfCircularRoute";

/**
 * 计算种群相对信息熵
 * @param routes 种群的路径数组
 * @returns 相对信息熵的结果
 */
export function calc_population_relative_information_entropy(
    routes: Array<number[]>,
) {
    // 判断路径数组的长度是否大于等于2
    if (!(routes.length >= 2)) {
        throw new Error("incorrect routes");
    }
    // 判断每个路径的长度是否大于等于2
    if (!(routes[0].length >= 2)) {
        throw new Error("incorrect routes");
    }
    const routesnumber = routes.length; // 路径数组的长度
    // const nodesnumber = routes[0].length; // 每个路径的长度
    // 判断每个路径的长度是否都等于节点数量
    // if (!routes.every((route) => route.length === nodesnumber)) {
    //     throw new Error("incorrect routes");
    // }
    const unique_strings = routes.map((r) => getUniqueStringOfCircularRoute(r)); // 获取路径数组中每个路径的唯一字符串表示
    const notrepeatroutes = uniq(unique_strings); // 去除重复的唯一字符串
    const fitnessvalues = notrepeatroutes.map((route) =>
        unique_strings.reduce(
            (previous, current) => previous + Number(route === current),
            0,
        ),
    ); // 计算每个唯一字符串的适应度值
    const sumfitnessvalues = sum(fitnessvalues); // 计算所有唯一字符串的适应度值之和
    const fitnessweight = fitnessvalues.map((v) => v / sumfitnessvalues); // 计算每个唯一字符串的权重
    const result = Math.min(
        1,
        -sum(fitnessweight.map((fitness) => fitness * Math.log(fitness))) /
            Math.log(routesnumber),
    ); // 计算相对信息熵的结果
    if (Number.isNaN(result)) {
        throw new Error("Accident ");
    }
    assert_true(result <= 1); // 判断结果是否小于等于1
    return result; // 返回相对信息熵的结果
}
