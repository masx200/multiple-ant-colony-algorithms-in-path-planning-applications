"""

这是一个Python程序，用于读取用户输入的多个地图文件名和输出图片的文件夹路径。程序会为每个地图文件生成一个对应的灰度图，并在图上添加了水平线和垂直线。最后将图片保存到指定的文件夹中。
    """
# 导入所需库文件
import json
import os
import sys
import matplotlib.pyplot as plt
import numpy as np


def main():
    # 提示用户输入多个地图文件名
    print("请输入多个地图文件名：")

    # 读取用户输入的图片文件名，并去除首尾的空格和双引号
    input_files = [s.strip('"') for s in sys.stdin.readline().strip().split(" ")]

    # 输出用户输入的地图文件名
    print("你输入的多个地图文件名是：", " ".join(input_files))

    # 提示用户输入导出图片的文件夹路径
    print("请输入导出的图片文件夹：")

    # 读取用户输入的输出目录，并去除首尾的空格和双引号
    output_dir = sys.stdin.readline().strip().strip('"')

    # 输出用户输入的图片文件夹路径
    print("你输入的导出的图片文件夹是：", output_dir)

    # 初始化二维栅格地图数据计数器
    k = 0

    # 遍历用户输入的所有地图文件名
    for input_file in input_files:
        draw_image_from_grid(input_file, output_dir, k)
        k = k + 1


def draw_image_from_grid(input_file, output_dir, k):
    # 打开并读取指定地图文件内容
    file = open(input_file, "r")
    map_data = json.loads(file.read())

    # 创建一个新的图像窗口，并设置其大小、颜色映射等属性
    fig, ax = plt.subplots()
    im = ax.imshow(map_data, cmap="gray_r", origin="lower")

    # 添加颜色条（注释掉）
    # cbar = ax.figure.colorbar(im, ax=ax)
    # cbar.ax.set_ylabel("Obstacles")

    # 添加坐标轴标签和标题（注释掉）
    ax.set_xlabel("X")
    ax.set_ylabel("Y")
    # ax.set_title("2D Map")
    # 显示网格线（注释掉）
    # plt.grid(True)

    # 关闭文件
    file.close()

    # 在图像上添加水平线和垂直线
    for i in np.arange(-0.5, len(map_data) + 0.5, 1):
        plt.axhline(i, linewidth=0.5, color="blue")
    for i in np.arange(-0.5, len(map_data[0]) + 0.5, 1):
        plt.axvline(i, linewidth=0.5, color="green")

    # 计算输出图片文件路径，创建不存在的文件夹，并保存图片
    outputfile = os.path.join(
        output_dir,
        os.path.splitext(os.path.basename(input_file))[0] + "-" + str(k)
        # + os.path.splitext(input_file)[-1]
        + ".png",
    )
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    plt.savefig(
        outputfile,
        bbox_inches="tight",
        dpi=300 * len(map_data) / 20,
    )

    # 输出保存成功的提示信息
    print(f"图片文件已保存到：{outputfile}")


if __name__ == "__main__":
    main()
