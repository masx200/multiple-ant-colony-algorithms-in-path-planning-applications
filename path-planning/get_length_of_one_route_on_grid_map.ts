/**
 * 获取网格地图上一条路径的长度
 *
 * @param route - 路径的坐标点数组
 * @param DistanceMatrix - 网格地图的距离矩阵
 * @returns 该路径的长度，如果路径为空或只有一个点，则返回无穷大
 *这个函数用于计算网格地图上一条路径的长度。函数接受两个参数，一个是路径的坐标数组route，另一个是距离矩阵DistanceMatrix。函数通过遍历路径中的每个坐标对，使用距离矩阵来计算两个相邻坐标之间的距离，并将距离累加到长度变量length上。最后返回路径的长度。如果路径为空或只有一个坐标对，则返回无穷大值。


 当调用get_length_of_one_route_on_grid_map函数时，需要传入两个参数：route和DistanceMatrix。

route参数是一个由坐标点组成的数组，表示一个路径。路径是由一系列坐标点构成的，每个坐标点由横坐标和纵坐标组成，格式为 [number, number]。路径中的第一个点和最后一个点可以是相同的。

DistanceMatrix参数是一个四维数组，表示一个网格地图的距离矩阵。该矩阵的每个元素表示两个相邻节点之间的距离。具体而言，DistanceMatrix[i][j][k][l]表示横坐标为 i，纵坐标为 j 的节点与横坐标为 k，纵坐标为 l 的节点之间的距离。

函数首先判断路径的长度，如果路径为空（即 route 数组长度为 0），则返回无穷大。如果路径只有一个点（即 route 数组长度为 1），则同样返回无穷大。

接下来，函数使用一个循环遍历路径中的每个点，计算相邻两个点之间的距离并累加到 length 变量中。具体而言，对于路径中的第 i 个点和第 i+1 个点，从 DistanceMatrix 中获取它们的横坐标和纵坐标，然后获取它们的距离并加到 length 上。

最后，函数返回计算得到的路径的长度。

 * 获取网格地图上一条路径的长度
 *
 
 * 这个函数用于计算网格地图上一条路径的长度。函数接受两个参数，一个是路径的坐标数组route，另一个是距离矩阵DistanceMatrix。
 * 函数通过遍历路径中的每个坐标对，使用距离矩阵来计算两个相邻坐标之间的距离，并将距离累加到长度变量length上。
 * 最后返回路径的长度。如果路径为空或只有一个坐标对，则返回无穷大值。
 *
 * 当调用get_length_of_one_route_on_grid_map函数时，需要传入两个参数：route和DistanceMatrix。
 *
 * route参数是一个由坐标点组成的数组，表示一个路径。路径是由一系列坐标点构成的，每个坐标点由横坐标和纵坐标组成，格式为 [number, number]。
 * 路径中的第一个点和最后一个点可以是相同的。
 *
 * DistanceMatrix参数是一个四维数组，表示一个网格地图的距离矩阵。该矩阵的每个元素表示两个相邻节点之间的距离。
 * 具体而言，DistanceMatrix[i][j][k][l]表示横坐标为 i，纵坐标为 j 的节点与横坐标为 k，纵坐标为 l 的节点之间的距离。
 *
 * 函数首先判断路径的长度，如果路径为空（即 route 数组长度为 0），则返回无穷大。
 * 如果路径只有一个点（即 route 数组长度为 1），则同样返回无穷大。
 *
 * 接下来，函数使用一个循环遍历路径中的每个点，计算相邻两个点之间的距离并累加到 length 变量中。
 * 具体而言，对于路径中的第 i 个点和第 i+1 个点，从 DistanceMatrix 中获取它们的横坐标和纵坐标，
 * 然后获取它们的距离并加到 length 上。
 *
 * 最后，函数返回计算得到的路径的长度。
 */
export function get_length_of_one_route_on_grid_map(
    route: [number, number][],
    DistanceMatrix: number[][][][],
): number {
    // 如果路径为空，返回无穷大
    if (route.length === 0) return Infinity;
    // 如果路径只有一个点，返回无穷大
    if (route.length === 1) return Infinity;

    // 初始化长度变量为0
    let length = 0;

    // 遍历路径中的每个点，计算相邻两点之间的距离并累加到length变量中
    for (let i = 0; i < route.length - 1; i++) {
        // 使用距离矩阵获取相邻两点的距离，并累加到length变量中
        length +=
            DistanceMatrix[route[i][0]][route[i][1]][route[i + 1][0]][
                route[i + 1][1]
            ];
    }

    // 返回路径的长度
    return length;
}
