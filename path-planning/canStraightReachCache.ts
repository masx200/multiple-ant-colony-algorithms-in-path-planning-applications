/**
 * 用于缓存判断是否可以通过直线达到的函数
 */
export const canStraightReachCache = new WeakMap<
    number[][],
    Map<string, boolean>
>();
