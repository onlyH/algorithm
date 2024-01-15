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
const target = { a: 1 };
const source = { b: 2 };
extend(target, source);
console.log(target); // { a: 1, b: 2 }

/**************************分割线*************************************/

// js将类数组对象转换为真正的数组。

const arrayLikeObject = { 0: "a", 1: "b", 2: "c", length: 3 };
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
  props: { class: "container" },
  children: [
    {
      tagName: "h1",
      children: ["Hello, Virtual DOM!"],
    },
    {
      tagName: "ul",
      children: [
        { tagName: "li", children: ["Item 1"] },
        { tagName: "li", children: ["Item 2"] },
        { tagName: "li", children: ["Item 3"] },
      ],
    },
  ],
};

// 使用 render 函数将虚拟 DOM 转换为实际的 DOM 元素
const $root = render(virtualDOM);

// 将创建的 DOM 元素添加到页面中
document.body.appendChild($root);
