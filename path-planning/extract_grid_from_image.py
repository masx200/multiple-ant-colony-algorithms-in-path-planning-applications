from PIL import Image
import numpy as np


def extract_grid_from_image(
    image_path: str, grid_size_x: int, grid_size_y: int, offset_x: int, offset_y: int
):
    """
        这段代码定义了一个名为 extract_grid 的函数，该函数用于将输入的图像（以路径的形式提供）分割成一个由黑白像素组成的二维网格。参数 grid_size_x 和 grid_size_y 分别表示网格中每个单元格的宽度和高度。offset_x 和 offset_y 是用于调整网格相对于图像原点位置的偏移量。

    首先，通过导入PIL库中的Image模块和numpy库，实现图像读取和处理操作。接下来，根据给定的图像路径打开图像，并将其转换为灰度模式。

    然后，获取图像的宽度和高度，并创建一个与之对应的二维数组 grid 来存储栅格地图。初始化时，所有元素都设置为0。

    接着，使用两个嵌套循环遍历每个可能的栅格。对于每个栅格，我们计算它的左上角坐标 (j, i) 及其右下角坐标 (j + grid_size_x, i + grid_size_y)。如果这个矩形区域完全位于图像内部，则计算此区域内像素的平均亮度。如果平均亮度大于阈值128，我们将相应的栅格标记为障碍物（值为1），否则视为可通行区域（值为0）。

    最后，在返回结果之前，将二维数组 grid 的行和列进行交换。这样可以确保输出矩阵的坐标顺序符合预期。

    """
    # 检查偏移量是否在网格大小内
    offset_x = offset_x % grid_size_x
    offset_y = offset_y % grid_size_y
    # 打开图像并转换为灰度模式
    img = Image.open(image_path).convert("L")

    # 获取图像的宽度和高度
    width, height = img.size

    # 创建二维数组来存储栅格地图
    grid = np.zeros((height // grid_size_y, width // grid_size_x), dtype=int)

    # 遍历每个栅格并检查其值
    for i in range(0 - offset_y, height + offset_y, grid_size_y):
        for j in range(0 - offset_x, width + offset_x, grid_size_x):
            # 检查这个方格是否在图像内
            if (
                i + grid_size_y <= height
                and j + grid_size_x <= width
                and i >= 0
                and j >= 0
            ):
                # 如果这个区域的平均亮度大于某个阈值，那么我们认为这是一个障碍物
                if (
                    np.mean(
                        img.crop(
                            (
                                j,
                                i,
                                j + grid_size_x,
                                i + grid_size_y,
                            )
                        ).getdata()
                    )
                    > 128
                ):
                    grid[i // grid_size_y, j // grid_size_x] = 1
                else:
                    grid[i // grid_size_y, j // grid_size_x] = 0

    # 交换行和列的坐标
    return grid.swapaxes(1, 0)
