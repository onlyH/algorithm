/**
 * call 用于调用一个函数，并且可以指定函数内部 this 的值
 * 判断是否传入上下文，如果没有，默认为全局对象（在浏览器中为 window）
 */
Function.prototype.myCall = function (context = window, ...args) {
  // 将当前函数作为对象的一个方法调用
  context.fn = this;
  // 执行函数并传入参数
  const result = context.fn(...args);
  // 删除临时添加对象
  delete context.fn;
  return result;
};

/***************************************************************************************** */

/**
 * apply 接收一个参数的数组
 */
Function.prototype.myApply = function (context = window, args) {
  // 将当前函数作为对象的一个方法调用
  context.fn = this;
  // 执行函数并传入参数数组
  const result = context.fn(...args);
  // 删除临时添加的方法
  delete context.fn;

  return result;
};

/***************************************************************************************** */

/**
 * bind 函数的 this 值被绑定到传递给 bind 的对象
 */
Function.prototype.myBind = function (context = window, ...args) {
  // 保存当前函数
  const fn = this;
  // 返回一个函数，该函数可以接收参数
  return function (...innerArgs) {
    // 使用 apply 调用原函数，并传入合并的参数
    return fn.apply(context, args.concat(innerArgs));
  };
};
