// 引入模块
const modules = import.meta.glob("./*/*.json");

// 将模块转换为对象
export default Object.fromEntries(
    Object.entries(modules).map(([key, value]) => {
        // 获取模块名称
        const name = key.replace(".json", "").slice(key.lastIndexOf("/") + 1);

        // 返回模块的异步函数
        return [
            name,
            async () => {
                // 强制忽略类型检查
                //@ts-ignore
                const { default: data } = await value();
                return {
                    map: data,
                    scale: data.length * data[0].length,
                };
            },
        ];
    }),
);

// 创建模块名称到维度的映射
const nametodimention = new Map<string, number>(
    Object.keys(modules).map((name) => {
        // 获取模块的维度
        const dimension = Number(name.split("/").at(-2));
        // assertnumber(dimension);
        // 获取模块的名称
        const nameformat = name
            .slice(0, name.lastIndexOf("."))
            .slice(name.lastIndexOf("/") + 1);
        return [nameformat, dimension];
    }),
);

// 导出模块名称到维度的映射
export { nametodimention };

// 引入模块
const startAndEndsmodules = import.meta.glob("./*/*.ts");

// 将模块转换为对象
export const startAndEnds = Object.fromEntries(
    Object.entries(startAndEndsmodules).map(([key, value]) => {
        // 获取模块名称
        const name = key.replace(".ts", "").slice(key.lastIndexOf("/") + 1);

        // 返回模块的异步函数
        return [
            name,
            async () => {
                // 强制忽略类型检查
                //@ts-ignore
                const { default: data } = await value();
                return {
                    // map: data,
                    start: data.start,
                    end: data.end,
                };
            },
        ];
    }),
);

// console.log(startAndEnds);
