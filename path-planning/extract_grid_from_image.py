import json
import os
import sys

import numpy as np
from PIL import Image


def extract_grid_from_image(
    image_path: str,
    grid_size_x: float,
    grid_size_y: float,
    offset_x: float,
    offset_y: float,
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
    img = Image.open(image_path)
    width = float(img.size[0])
    height = float(img.size[1])
    # 将具有透明度的图片转换为不透明图片
    new_img = Image.new("RGB", size=(int(width), int(height)), color=(255, 255, 255))
    new_img.paste(img, (0, 0), mask=img)
    img.close()
    img = new_img.convert("L")

    # 获取图像的宽度和高度
    # width, height = img.size

    # 创建二维数组来存储栅格地图
    grid = np.zeros((int(height / (grid_size_y)), int(width / grid_size_x)), dtype=int)

    # 遍历每个栅格并检查其值
    for i in np.arange(
        float(-grid_size_y + offset_y), float(height + offset_y), float(grid_size_y)
    ):
        for j in np.arange(
            float(-grid_size_x + offset_x), float(width + offset_x), float(grid_size_x)
        ):
            # 检查这个方格是否在图像内
            if (
                i + grid_size_y <= height
                and j + grid_size_x <= width
                and i >= 0
                and j >= 0
            ):
                # 如果这个区域的平均亮度大于某个阈值，那么我们认为这不是一个障碍物
                if (
                    np.mean(
                        img.crop(
                            (
                                int(j),
                                int(i),
                                int(j + grid_size_x),
                                int(i + grid_size_y),
                            )
                        ).getdata()
                    )
                    > 128
                ):
                    grid[int(i / grid_size_y), int(j / grid_size_x)] = 0
                else:
                    grid[int(i / grid_size_y), int(j / grid_size_x)] = 1

    # 交换行和列的坐标
    img.close()
    new_img.close()
    return np.flipud(grid)  # .swapaxes(1, 0)


def encode_json(data):
    """
    将Python对象编码为JSON字符串。
    """
    # 使用json模块的dumps函数将Python对象编码为JSON字符串
    return json.dumps(data)


def main():
    """
    从标准输入读取一个图片文件和输出目录，调用extract_grid_from_image函数生成栅格地图。

    Args:
        无参数。

    Returns:
        无返回值。

    """
    # 从标准输入读取图片文件名
    print("请输入一个图片文件名：")
    # 读取用户输入的图片文件名，并去除首尾的空格和双引号
    input_file = sys.stdin.readline().strip().strip('"')
    print("你输入的一个图片文件名是：", input_file)

    # 从标准输入读取方格参数
    print("请输入方格的宽,方格的高,方格的横坐标偏移量,方格的纵坐标偏移量：")
    # 读取用户输入的方格参数，并使用逗号分隔，同时去除首尾的空格和双引号
    input_params = sys.stdin.readline().strip().split(",")
    print("你输入的方格的宽,方格的高,方格的横坐标偏移量,方格的纵坐标偏移量是：", ",".join(input_params))

    # 从标准输入读取输出目录
    print("请输入导出的地图文件夹：")
    # 读取用户输入的输出目录，并去除首尾的空格和双引号
    output_dir = sys.stdin.readline().strip().strip('"')
    print("你输入的导出的地图文件夹是：", output_dir)

    # 如果输出目录不存在，则创建该文件夹
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # 调用extract_grid_from_image函数生成栅格地图，并传入参数
    grid = extract_grid_from_image(
        input_file,
        float(input_params[0]),
        float(input_params[1]),
        float(input_params[2]),
        float(input_params[3]),
    )

    # 将栅格地图转换为json格式数据
    json_data = encode_json(grid.tolist())

    # 构造输出文件路径和名称，保存json数据到文件
    outputfile = os.path.join(
        output_dir,
        os.path.splitext(os.path.basename(input_file))[0]
        # + os.path.splitext(input_file)[-1]
        + ".json",
    )
    with open(outputfile, "w") as out_f:
        out_f.write(json_data)
        print(f"地图文件已保存到：{outputfile}")


if __name__ == "__main__":
    main()
