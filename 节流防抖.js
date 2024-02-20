/** 节流 (throttle)
 * 在一定时间内，无论触发多少次同类事件，只会执行一次相应的处理函数
 * 懒加载，滚动加载, 频繁触发的操作、拖拽、缩放、动画
 */

// 定义一个节流函数，接受两个参数：要执行的函数和延迟时间
function throttle(func, delay) {
  // 记录上一次执行函数的时间
  let lastTime = 0;
  // 返回一个新的匿名函数，用于执行节流逻辑
  return function (...args) {
    // 获取当前时间
    const currentTime = +Date.now();
    // 检查是否已经过了指定的延迟时间
    if (currentTime - lastTime >= delay) {
      // 如果是，执行传入的函数，并传入之前收集的参数
      func.apply(this, args);
      // 更新上一次执行函数的时间为当前时间
      lastTime = currentTime;
    }
  };
}
window.addEventListener("scroll", throttle(handleScroll, 300));

/**************************分割线*************************************/

/** 防抖函数（Debouncing）
 * 一定时间内不再触发同类事件
 * 处理用户输入、窗口调整等事件、按钮提交场景
 */
function debounce(func, delay) {
  // 声明一个变量用于存储定时器的引用
  let timer;
  // 返回一个匿名函数，接受任意数量的参数
  return function (...args) {
    // 清除之前设置的定时器，确保在调用函数时先取消之前的延迟执行
    clearTimeout(timer);
    // 创建一个新的定时器，延迟时间为 delay 毫秒
    timer = setTimeout(() => {
      // 当定时器触发时，通过 apply 方法调用传入的 func 函数，并传递之前收集的参数数组
      func.apply(this, args);
    }, delay);
  };
}
