import { GridMap } from "./grid-map";

export function PointsInsideAllConvexPolygons(
    grid: GridMap,
    visibleGridsMatrix: boolean[][][][],
): [number, number][] {
    const dirs = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];
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

                const pointsInConvexPolygons = new Set<string>();
                stack.push([i, j]);

                visited[i][j] = true;
                pointsInConvexPolygons.add(JSON.stringify([i, j]));
                while (stack.length) {
                    const [curI, curJ] = stack.pop() as [number, number];

                    if (visited[curI][curJ] || grid.data[curI][curJ] === 1) {
                        continue;
                    }
                    visited[curI][curJ] = true;

                    const toBeDeleted = new Set<string>();
                    let size = pointsInConvexPolygons.size;
                    let count = 0;
                    for (const point of pointsInConvexPolygons) {
                        const pointArr = JSON.parse(point) as [number, number];

                        if (
                            visibleGridsMatrix[pointArr[0]][pointArr[1]][curI][
                                curJ
                            ]
                        ) {
                            count++;
                        }

                        if (
                            dirs.every((dir) => {
                                const x = pointArr[0] + dir[0];
                                const y = pointArr[1] + dir[1];
                                return (
                                    x >= 0 &&
                                    x < m &&
                                    y >= 0 &&
                                    y < n &&
                                    grid.isFree(x, y)
                                );
                            })
                        ) {
                            toBeDeleted.add(point);
                            ans.push(pointArr);
                        }
                    }

                    for (const point of toBeDeleted) {
                        pointsInConvexPolygons.delete(point);
                    }
                    if (count !== size) {
                        continue;
                    }
                    dirs.forEach((dir) => {
                        const x = curI + dir[0];
                        const y = curJ + dir[1];
                        if (
                            x >= 0 &&
                            x < m &&
                            y >= 0 &&
                            y < n &&
                            grid.data[x][y] === 0 &&
                            !visited[x][y]
                        ) {
                            stack.push([x, y]);
                            visited[x][y] = true;
                        }
                    });
                }
            }
        }
    }
    return ans;
}
