// 根据promiseA+实现一个自己的promise
class MyPromise {
  constructor(executor) {
    // 初始化 Promise 的状态为 pending（未完成）
    this.state = "pending";
    // 初始化 Promise 的值为 undefined
    this.value = undefined;
    // 存储成功状态的回调函数
    this.onFulfilledCallbacks = [];
    // 存储失败状态的回调函数
    this.onRejectedCallbacks = [];

    // 定义 resolve 函数，用于将 Promise 状态改为 fulfilled（已成功）
    const resolve = (value) => {
      // 只有在状态为 pending 时才能改变状态
      if (this.state === "pending") {
        this.state = "fulfilled"; // 将状态改为 fulfilled
        this.value = value; // 存储成功的值
        // 执行成功状态的所有回调函数，并将成功的值传递给它们
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };

    // 定义 reject 函数，用于将 Promise 状态改为 rejected（已失败）
    const reject = (reason) => {
      // 只有在状态为 pending 时才能改变状态
      if (this.state === "pending") {
        this.state = "rejected"; // 将状态改为 rejected
        this.value = reason; // 存储失败的原因
        // 执行失败状态的所有回调函数，并将失败的原因传递给它们
        this.onRejectedCallbacks.forEach((callback) => callback(reason));
      }
    };

    try {
      // 执行执行器函数，并传入 resolve 和 reject 函数
      executor(resolve, reject);
    } catch (error) {
      // 如果执行器函数抛出异常，将 Promise 状态改为 rejected，并传递异常信息给 reject 函数处理
      reject(error);
    }
  }

  // then 方法用于添加成功和失败状态的回调函数，并返回一个新的 Promise 对象
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        // 如果 Promise 已经是成功状态，则立即执行成功回调，并将结果传递给 resolve 函数
        const result = onFulfilled(this.value);
        resolve(result);
      } else if (this.state === "rejected") {
        // 如果 Promise 已经是失败状态，则立即执行失败回调，并将结果传递给 resolve 函数
        const result = onRejected(this.value);
        resolve(result);
      } else if (this.state === "pending") {
        // 如果 Promise 还是 pending 状态，则将成功和失败的回调函数存储起来，待 Promise 状态改变时执行
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

  // TODO Promise.race
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      // 对传入的 promises 数组进行遍历
      for (let promise of promises) {
        // 如果其中一个 promise 完成（无论成功或失败），则立即将其状态和值传递给新 Promise 的 resolve 或 reject 方法
        promise.then((value) => resolve(value), (reason) => reject(reason))
      }
    })
  }

  // TODO Promise.all
  static all(promises) {
    // 返回一个新的 Promise 对象
    return new MyPromise((resolve, reject) => {
      // 初始化一个数组，用于存储每个 Promise 的解决值
      let results = []
      // 初始化一个计数器，用于记录已完成的 Promise 数量
      let completedCount = 0
      // 遍历传入的 Promise 数组
      for (let i = 0; i < promises.length; i++) {
        // 对每个 Promise 执行 then 方法，监听其状态变化
        promises[i].then(value => {
          // 如果 Promise 成功解决, 将成功的值存储在结果数组的对应位置
          results[i] = value
          // 完成的 Promise 数量加一
          completedCount++;
          // 如果所有 Promise 都已完成
          if (completedCount === promises.length) {
            // 将结果数组传递给新 Promise 的 resolve 方法
            resolve(results)
          }
        }, reason => {
          // 如果有一个 Promise 失败，则直接将新 Promise 的状态改为 rejected，并将失败原因传递给新 Promise
          reject(reason)
        })
      }
    })
  }
}


const promise1 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve("Promise 1 resolved");
  }, 1000);
});

const promise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("Promise 2 rejected");
  }, 500);
});
// 示例用法 promise
promise1.then(
  (result) => console.log(result),
  (error) => console.error(error)
);

// 示例用法 promise.race
MyPromise.race([promise1, promise2])
  .then((value) => {
    console.log("Race resolved:", value);
  })
  .catch((reason) => {
    console.log("Race rejected:", reason);
  });

// 示例用法 promise.all
MyPromise.all([promise1, promise2])
  .then((values) => {
    console.log("All resolved:", values);
  })
  .catch((reason) => {
    console.log("All rejected:", reason);
  });