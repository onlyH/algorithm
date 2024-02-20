const url = './serve'
let xhr = new XMLHttpRequest()
// 创建 http 请求
xhr.open('GET', url, true)
//设置状态监听函数
xhr.onreadystatechange = function () {
  if (this.readyState !== 4) return false
//   当请求成功时
  if (this.status === 200) {
    handle(this.response)
  } else {
    console.error(this.statusText)
  }
}
// 设置请求失败时的监听函数
xhr.onerror = function () {
  console.error(this.statusText)
}
// 设置请求头信息
xhr.responseType = 'json'
xhr.setRequestHeader('Accept', 'application/json')
xhr.send(null)


//使用 Promise 封装 AJAX

function getJson(url) {
  // TODO 多出这一行
  let promise = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
// 创建 http 请求
    xhr.open('GET', url, true)
//设置状态监听函数
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return false
//   当请求成功时
      if (this.status === 200) {
        handle(this.response)
      } else {
        console.error(this.statusText)
      }
    }
// 设置请求失败时的监听函数
    xhr.onerror = function () {
      console.error(this.statusText)
    }
// 设置请求头信息
    xhr.responseType = 'json'
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.send(null)
  })
  // TODO 多出这一行
  return promise
}