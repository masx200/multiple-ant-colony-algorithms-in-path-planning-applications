const modules = import.meta.glob("./*/*.json");
export default Object.fromEntries(
    Object.entries(modules).map(([key, value]) => {
        const name = key

            .replace(".json", "")

            .slice(key.lastIndexOf("/") + 1);

        return [
            name,
            async () => {
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
const nametodimention = new Map<string, number>(
    Object.keys(modules).map((name) => {
        const dimension = Number(name.split("/").at(-2));
        // assertnumber(dimension);
        const nameformat = name
            .slice(0, name.lastIndexOf("."))
            .slice(name.lastIndexOf("/") + 1);
        return [nameformat, dimension];
    }),
);
export { nametodimention };
const startAndEndsmodules = import.meta.glob("./*/*.ts");

export const startAndEnds = Object.fromEntries(
    Object.entries(startAndEndsmodules).map(([key, value]) => {
        const name = key

            .replace(".ts", "")

            .slice(key.lastIndexOf("/") + 1);

        return [
            name,
            async () => {
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
console.log(startAndEnds);
