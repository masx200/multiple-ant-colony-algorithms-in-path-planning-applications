import { generateUniqueStringOfArray } from "./generateUniqueStringOfArray";

export function getUniqueStringOfCircularRoute(route: number[]): string {
    return generateUniqueStringOfArray(Array.from(route));
}
