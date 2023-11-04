export function assert_number(con: any): asserts con is number {
    if (typeof con !== "number") {
        throw Error("assert error number:" + con);
    }
    if (Number.isNaN(con)) {
        throw Error("assert error number:" + con);
    }
}
