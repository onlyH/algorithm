// 定义对象的属性。
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}

const obj = {};
def(obj, "property", "value");
console.log(obj.property); // 'value'

/**************************分割线*************************************/

// extend 混合对象属性
function extend(to, form) {
  for (const key in form) {
    to[key] = form[key];
  }
  return to;
}

const target = {a: 1};
const source = {b: 2};
extend(target, source);
console.log(target); // { a: 1, b: 2 }

/**************************分割线*************************************/

// js将类数组对象转换为真正的数组。

const arrayLikeObject = {0: "a", 1: "b", 2: "c", length: 3};
const newArray1 = Array.from(arrayLikeObject); // ['a', 'b', 'c']
const newArray3 = [...arrayLikeObject]; // ['a', 'b', 'c']
const newArray2 = Array.prototype.slice.call(arrayLikeObject); // ['a', 'b', 'c']
const newArray4 = Array.prototype.concat.call([], arrayLikeObject);

/**************************分割线*************************************/

// 将虚拟 DOM 节点对象转换为实际的 DOM 元素
function rander(domNode) {
  // 如果传入的虚拟 DOM 节点对象为空，则返回文档片段
  if (!domNode) return document.createDocumentFragment();
  let $el;
  // 判断虚拟 DOM 节点是否为对象类型
  if (typeof domNode === "object") {
    // 创建对应的dom元素
    $el = document.createElement(domNode.tagName);

    // 设置元素属性
    if (domNode.hasOwnProperty("props")) {
      for (let key in domNode.props) {
        $el.setAttribute(key, domNode.props[key]);
      }
    }
    //  处理子节点
    if (domNode.hasOwnProperty("children")) {
      domNode.children.forEach((val) => {
        // 递归调用 render 函数处理子节点，并将子节点添加到当前元素中
        const $childrenEl = render(val);
        $el.appendChild($childrenEl);
      });
    }
  } else {
    // 如果虚拟 DOM 节点为文本节点，则创建文本节点
    $el = document.createTextNode(domNode);
  }
  // 返回创建的 DOM 元素
  return $el;
}

// 虚拟 DOM 对象描述----------------实例
const virtualDOM = {
  tagName: "div",
  props: {class: "container"},
  children: [
    {
      tagName: "h1",
      children: ["Hello, Virtual DOM!"],
    },
    {
      tagName: "ul",
      children: [
        {tagName: "li", children: ["Item 1"]},
        {tagName: "li", children: ["Item 2"]},
        {tagName: "li", children: ["Item 3"]},
      ],
    },
  ],
};

// 使用 render 函数将虚拟 DOM 转换为实际的 DOM 元素
const $root = render(virtualDOM);

// 将创建的 DOM 元素添加到页面中
document.body.appendChild($root);


/**
 * vue 实现数组更新方法
 * （push,shift,pop,splice,unshift,sort,reverse）方法进行重写(AOP 切片思想)
 */
// 缓存数组原型
const arrayProto = Array.prototype
// 实现 arrayMethods.__proto__ === Array.prototype
export const arrayMethods = Object.create(arrayProto)

// 需要进行功能扩展的方法
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'splice',
  'reverse'
]
methodsToPatch.forEach(method => {
//   缓存原生数组方法
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator(...args) {
    //   执行并缓存原生数组功能
    const result = original.apply(this, args)
    //   响应式处理
    const ob = this.__ob__
    let inserted;
    switch (method) {
      // push,unshift 会新增索引，所以要手动 observer
      case 'push':
      case 'unshift':
        inserted = args
        break
      //   splice 方法，如果传入了第三个参数，也会有索引加入，也需要手动 observer
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 获取插入的值，并设置响应式监听
    if (inserted) ob.observeArray(inserted)
    ob.dep.notify() // 通知依赖更新
    //   返回原生数组方法的执行结果
    return result
  })
})

/**************************分割线*************************************/
/**
 * 发布订阅模式
 */
class EventEmitter {
  constructor() {
    this.events = {}
  }

//   实现订阅
  on(type, callback) {
    if (!this.events) this.events = Object.create(null)
    if (!this.events[type]) {
      this.events[type] = [callback]
    } else {
      this.events[type].push(callback)
    }
  }

  // 删除订阅
  off(type, callback) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter(item => item !== callback)
  }

//   只执行一次
  once(type, callback) {
    function fn() {
      callback()
      this.off(type, fn)
    }

    this.on(type, fn)
  }

//   触发事件
  emit(type, ...rest) {
    this.events[type] && this.events[type].forEach(fn => fn.apply(this.rest))
  }
}

const event = new EventEmitter()

const handle = (...rest) => {
  console.log(rest)
}
event.on('click', handle)
event.emit('click', 1, 2, 3, 4)
event.off('click', handle)
event.emit('click', 1, 2)
event.once('dbclick', () => {
  console.log(1234)
})
event.emit('dbclick')
event.emit('dbclick')