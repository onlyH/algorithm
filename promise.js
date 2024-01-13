// 根据promiseA+实现一个自己的promise
class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.value = reason;
        this.onRejectedCallbacks.forEach((callback) => callback(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        const result = onFulfilled(this.value);
        resolve(result);
      } else if (this.state === "rejected") {
        const result = onRejected(this.value);
        resolve(result);
      } else if (this.state === "pending") {
        this.onFulfilledCallbacks.push((value) => {
          const result = onFulfilled(value);
          resolve(result);
        });

        this.onRejectedCallbacks.push((reason) => {
          const result = onRejected(reason);
          resolve(result);
        });
      }
    });
  }
}

// 示例用法
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello, Promise!");
  }, 1000);
});

promise.then(
  (result) => console.log(result),
  (error) => console.error(error)
);

/**************************分割线*************************************/

// 根据promiseA+实现一个自己的promise.all
// 实现一个类似 Promise.all 的函数 myPromiseAll
function myPromiseAll(promises) {
  // 返回一个新的 Promise 对象
  return new Promise((resolve, reject) => {
    // 检查传入的参数是否是数组
    if (!Array.isArray(promises)) {
      // 如果不是数组，直接拒绝并返回一个带有错误信息的 Promise
      reject(new TypeError("Promises must be an array"));
      return;
    }

    // 存放每个 Promise 的执行结果
    const results = [];
    // 记录已完成的 Promise 数量
    let completedCount = 0;

    // 遍历传入的 Promise 数组
    promises.forEach((promise, index) => {
      // 使用 Promise.resolve 包装每个 Promise，确保它是一个 Promise 对象
      Promise.resolve(promise)
        .then((result) => {
          // 将结果存入相应位置
          results[index] = result;
          // 每次 Promise 完成后，检查是否所有 Promise 都已完成
          completedCount++;

          if (completedCount === promises.length) {
            // 如果所有 Promise 都完成，将结果数组作为 resolve 参数，触发 Promise 的成功状态
            resolve(results);
          }
        })
        .catch((error) => {
          // 如果有一个 Promise 失败，直接将整个 myPromiseAll 失败，触发 Promise 的拒绝状态
          reject(error);
        });
    });

    // 如果传入的 Promise 数组为空，直接触发 Promise 的成功状态
    if (promises.length === 0) {
      resolve(results);
    }
  });
}

// 示例用法：
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

myPromiseAll([promise1, promise2, promise3])
  .then((results) => {
    console.log("All promises resolved:", results);
  })
  .catch((error) => {
    console.error("One or more promises rejected:", error);
  });

/**************************分割线*************************************/
// 根据promiseA+实现一个自己的promise.race
