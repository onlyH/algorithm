// 创建响应式
function reactive(target = {}) {
  if (typeof obj !== 'object' || obj === null) return target
//   配置代理
  const proxyConf = {
    get(target, key, receiver) {
      // 只处理本来对象中存在的属性，不存在的属性不处理
      const ownKeys = Reflect.ownKeys(target)
      if (ownkeys.includes(key)) {
        console.log('get', key)
      }
      const result = Reflect.get(target, key, receiver)
      // todo --- 深度监听 ---什么时候 get 操作
      //  (与ObjectDefineProperty的区别是他一开始一次性递归) 获取到哪一层，哪一层才会触发 响应式
      return reactive(result) // 返回处理结果
    },
    set(target, key, value, receiver) {
      //   重复的数据，不处理
      if (value === target[key]) {
        return true
      }
      // todo 判断是否是新增
      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        console.log('已有的 key', key)
      } else {
        console.log('新增的key', key)
      }
      const result = Reflect.set(target, key, value, receiver)
      console.log('set', key, value)
      return result
    },
    delete(target, key) {
      const result = Reflect.deleteProperty(target, key)
      console.log('delete', key)
      return result
    }
  }
//   生成代理对象
  const observed = new Proxy(target, proxyConf)
  return observed
}

// 测试数据
const data = {
  name: 'zs',
  age: 20,
  info: {
    city: 'beijing'
  }
}
const proxyData = reactive(data)

/**************************分割线*************************************/
/**
 * 通过 Proxy 来实现一个数据响应式
 */
let onWatch = (obj, setBind, getLogger) => {
  let handle = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    }, set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy()
}
let obj = {a: 1}
let p = onWatch(obj, (v, property) => {
  console.log(`监听到属性${property}改变为${v}`)
}, (target, property) => {
  console.log(`'${property}' = ${target[property]}`)
})
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2