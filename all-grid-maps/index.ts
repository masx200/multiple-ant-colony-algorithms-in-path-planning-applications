const modules = import.meta.glob("./*.json");
export default Object.fromEntries(
    Object.entries(modules).map(([key, value]) => {
        const name = key.slice(2).replace(".json", "").replace(".jpg", "");
        return [
            name,
            async () => {
                //@ts-ignore
                const { default: data } = await value();
                return {
                    map: data,
                    scale: data.length * data[0].length,
                    name: name,
                };
            },
        ];
    }),
);
