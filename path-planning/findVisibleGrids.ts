import { canReach } from "./canReach";
import { GridMap } from "./grid-map";

export function findVisibleGrids(
    starti: number,
    startj: number,
    grid: GridMap
): [number, number][] {
    const result: [number, number][] = [];
    const visited: boolean[][] = Array(grid.column)
        .fill(0)
        .map(() => Array(grid.row).fill(false));
    const stack: [number, number][] = [[starti, startj]];

    while (stack.length > 0) {
        const [i, j] = stack.pop() as [number, number];
        if (
            i < 0 ||
            i >= grid.row ||
            j < 0 ||
            j >= grid.column ||
            grid.isObstacle(i, j) ||
            visited[i][j]
        ) {
            continue;
        }
        visited[i][j] = true;
        if (canReach([starti, startj], [i, j], grid)) {
            result.push([i, j]);
        }
        if (i - 1 >= 0 && !visited[i - 1][j] && !grid.isObstacle(i - 1, j)) {
            stack.push([i - 1, j]);
        }
        if (
            i + 1 < grid.row &&
            !visited[i + 1][j] &&
            !grid.isObstacle(i + 1, j)
        ) {
            stack.push([i + 1, j]);
        }
        if (j - 1 >= 0 && !visited[i][j - 1] && !grid.isObstacle(i, j - 1)) {
            stack.push([i, j - 1]);
        }
        if (
            j + 1 < grid.column &&
            !visited[i][j + 1] &&
            !grid.isObstacle(i, j + 1)
        ) {
            stack.push([i, j + 1]);
        }
    }
    return result;
}
