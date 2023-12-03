import json
import sys
import matplotlib.pyplot as plt


def main():
    print("请输入一个地图文件名：")
    # 读取用户输入的图片文件名，并去除首尾的空格和双引号
    input_file = sys.stdin.readline().strip().strip('"')
    print("你输入的一个地图文件名是：", input_file)
    # 二维栅格地图数据
    file = open(input_file, "r")
    map_data = json.loads(file.read())

    # 生成图片
    fig, ax = plt.subplots()
    im = ax.imshow(map_data, cmap="gray_r", origin="lower")

    # 添加颜色条
    # cbar = ax.figure.colorbar(im, ax=ax)
    # cbar.ax.set_ylabel("Obstacles")

    # 添加坐标轴标签和标题
    ax.set_xlabel("X")
    ax.set_ylabel("Y")
    ax.set_title("2D Map")
    # plt.grid(True)
    # 显示图片
    plt.show()
    file.close()


if __name__ == "__main__":
    main()
