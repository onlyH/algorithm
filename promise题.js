// 使用Promise实现每隔1秒输出1,2,3
const arr = [1, 2, 3];
arr.reduce((p, x) => {
  return p.then(() => {
    return new Promise((r) => {
      setTimeout(() => r(console.log(x)), 1000);
    });
  });
});

/**************************分割线*************************************/

// 使用Promise实现红绿灯交替重复亮
function red() {
  console.log("red");
}
function blue() {
  console.log("blue");
}
function green() {
  console.log("green");
}

const light = function (timer, cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timer);
  });
};

const step = function () {
  Promise.resolve()
    .then(() => {
      return light(3000, red);
    })
    .then(() => {
      return light(2000, green);
    })
    .then(() => {
      return light(1000, blue);
    })
    .then(() => {
      return step();
    });
};
step();

/**************************分割线*************************************/
/**
 * mergePromise 函数可以接受一个包含异步操作的 Promise 数组，
 * 按照数组顺序依次执行这些异步操作，最后返回一个包含所有异步操作结果的 Promise
 */
// 定义一个函数 mergePromise，接受包含异步操作的 Promise 数组 ajaxArray
function mergePromise(ajaxArray) {
  // 存放每个 ajax 请求的结果
  const data = [];
  // 初始化一个 Promise，以保证第一个 then 能够正确执行
  let promise = Promise.resolve();

  // 遍历传入的 Promise 数组 ajaxArray
  ajaxArray.forEach((ajax) => {
    // 每次迭代，通过 then 方法依次执行异步操作
    // 第一次的 then 用于调用 ajax 函数
    // 第二次的 then 用于获取 ajax 的结果
    promise = promise.then(ajax).then((res) => {
      // 将每次异步操作的结果存入 data 数组
      data.push(res);
      // 返回 data，以便下一次迭代时能够得到上一次结果
      return data;
    });
  });

  // 返回一个新的 Promise，当所有异步操作完成时，其值为 data 数组
  return promise;
}

// 示例用法
const mockAjax = (result, delay) => () =>
  new Promise((resolve) => setTimeout(() => resolve(result), delay));

const ajaxArray = [mockAjax("a", 1000), mockAjax("b", 500), mockAjax("c", 200)];

mergePromise(ajaxArray)
  .then((results) => console.log(results))
  .catch((error) => console.error(error));
