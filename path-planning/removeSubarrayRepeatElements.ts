
/**
 * 下面是一个在 TypeScript 中实现的函数，它接收一个数组作为输入，检查其中是否存在重复数字并根据条件删除子数组。
 * 注意：此函数会直接修改结果数组，这意味着原始数组中的连续重复元素将会被删除。此外，当遇到重复项时，它会删除从重复项首次出现的位置到第二次出现位置之间的所有元素，而不是只删除重复项本身。若只需要删除重复项，请对上述逻辑进行适当调整。
 * @param arr
 * @returns
 */
export function removeSubarrayRepeatElements(arr: number[][]): number[][] {
    // 创建一个 Map 用于存储已遇到的数字及其索引
    const numMap = new Map<string, number>();

    // 新建一个结果数组，用于存放处理后的元素
    const result: number[][] = [];

    // 遍历输入数组
    for (let i = 0; i < arr.length; i++) {
        const currentNum = arr[i];

        // 如果当前数字已经存在于 map 中，则找到其第一次出现的位置
        if (numMap.has(JSON.stringify(currentNum))) {
            const firstIndex = numMap.get(JSON.stringify((currentNum)))!;

            // 删除从首次出现位置到当前位置（不包含当前位置）的所有元素
            result.splice(firstIndex + 1, i - firstIndex - 1);
            // numMap.delete(JSON.stringify(currentNum)); // 移除已处理的数字
        } else {
            // 否则，将当前数字及其索引添加到 map 和结果数组中
            numMap.set(JSON.stringify(currentNum), i);
            result.push(currentNum);
        }
    }

    return result;
}


