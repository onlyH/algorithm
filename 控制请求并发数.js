// 前端控制请求并发数通常是为了限制同时向服务器发送的请求数量，以防止过多的并发请求影响系统性能或引发其他问题
/**
 * 在JavaScript中，可以自行实现一个请求队列，通过维护一个队列，逐个发送请求，
 * 并在请求完成后继续发送队列中的下一个请求。这可以手动控制并发数。
 */
function limitConcurrency(urls, maxConcurrency, callback) {
  let running = 0; // 当前正在运行的请求数量
  let index = 0; // 当前待处理的请求索引
  const results = []; // 存放请求结果的数组
  // 发起请求的函数
  function markRequest(url, i) {
    // 增加正在运行的请求数量
    running++;
    // 将请求结果存入相应的位置
    fetch(url).then(res => res.json()).then(data => results[i] = data)
      .catch(error => results[i] = {error: error.message})
      .finally(() => {
        // 完成一个请求，减少正在运行的请求数量
        running--;
        if (index > urls.length) {
          // 如果还有未处理的请求，则继续发起请求
          markRequest(urls[index], index)
          index++
        } else if (running === 0) {
          // 如果所有请求都已处理完成，并且没有正在运行的请求，则调用回调函数，并将结果数组作为参数传入
          callback(results);
        }
      })
  }

  // 控制并发请求数量，初始化时发起一定数量的请求
  while (running < maxConcurrency && index < urls.length) {
    markRequest(urls[index], index)
    index++
  }
}
// 示例用法
const urls = ['url1', 'url2', 'url3', 'url4', 'url5']; // 待请求的URL数组
const maxConcurrency = 3; // 最大并发请求数量
const callback = results => {
  // 处理请求结果
  console.log(results);
};

// 调用控制函数
limitConcurrency(urls, maxConcurrency, callback);


/*******************分割线************************/

/**
 * 从一组 URL 中获取数据，限制并发请求数量
 * @param {string[]} urls - 要获取数据的 URL 数组
 * @returns {Promise<any[]>} - 包含所有请求响应数据的 Promise 数组
 */
async function fetchData(urls) {
  const maxConcurrentRequests = 3; // 最大并发请求数量
  const chunks = []; // 将 URL 分成多个块，每个块包含最大并发请求数量个 URL

  // 将 URL 分成多个块
  for (let i = 0; i < urls.length; i += maxConcurrentRequests) {
    const chunk = urls.slice(i, i + maxConcurrentRequests); // 从原始数组中提取一个块
    chunks.push(chunk); // 将块添加到 chunks 数组中
  }

  const responses = []; // 存储所有请求的响应数据

  // 对每个块中的 URL 进行并发请求
  for (const chunk of chunks) {
    // 为当前块中的每个 URL 创建一个 Promise 对象，并发送请求获取数据
    const promises = chunk.map(url => fetch(url).then(response => response.json()));
    // 使用 Promise.all 等待所有请求完成，将响应数据存储在 responses 数组中
    responses.push(...await Promise.all(promises));
  }

  return responses; // 返回包含所有请求响应数据的 Promise 数组
}
