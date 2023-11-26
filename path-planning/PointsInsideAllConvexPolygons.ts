import { GridMap } from "./grid-map";

export function PointsInsideAllConvexPolygons(
    grid: GridMap,
    visibleGridsMatrix: boolean[][][][],
): [number, number][] {
    const m = grid.data.length;
    const n = grid.data[0].length;
    const visited: boolean[][] = Array(grid.data.length)
        .fill(0)
        .map(() => Array(grid.data[0].length).fill(false));
    const ans: [number, number][] = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid.data[i][j] === 0 && !visited[i][j]) {
                const stack: [number, number][] = [];

                stack.push([i, j]);

                visited[i][j] = true;
                while (stack.length) {
                    const [curI, curJ] = stack.pop() as [number, number];
                    //  area++;
                    if (visited[curI][curJ]) {
                        continue;
                    }
                    [
                        [-1, 0],
                        [0, 1],
                        [1, 0],
                        [0, -1],
                    ].forEach((dir) => {
                        const x = curI + dir[0];
                        const y = curJ + dir[1];
                        if (
                            x >= 0 &&
                            x < m &&
                            y >= 0 &&
                            y < n &&
                            grid.data[x][y] === 0
                        ) {
                            stack.push([x, y]);
                            visited[i][j] = true;
                        }
                    });
                }
                //  ans = Math.max(ans, area);
            }
        }
    }
    return ans;
}
