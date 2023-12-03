from PIL import Image
import numpy as np


def extract_grid(image_path, grid_size_x, grid_size_y, offset_x, offset_y):
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
