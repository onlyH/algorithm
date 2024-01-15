function observe(target) {
  // 不是对象或数组
  if (typeof target !== "object" || target === null) return target;
  if (Array.isArray(target)) target.__proto__ = arrProto;
  //   重新定义各个属性（for in 也可以遍历数组）
  for (let key in target) {
    defineReactive(target, key, target[key]);
  }
}
// 重新定义数组原型
const oldArrayProperty = Array.prototype;
// 创建新对象，原型指向 oldArrayProperty，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
["push", "pop", "shift", "unshift", "splice"].forEach((methodName) => {
  arrProto[methodName] = function () {
    updateView(); //更新视图
    console.log("调用了数组的方法", methodName, arguments);
    oldArrayProperty[methodName].call(this, ...arguments);
  };
});
// 重新定义属性，监听起来
function defineReactive(target, key, value) {
  // 深度监听
  observe(value);
  // 核心 API
  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        // 深度监听
        observe(newValue);
        // 设置新值
        value = newValue;
        // 触发更新
        updateView();
      }
      return value;
    },
  });
}
// 触发视图更新
function updateView() {
  console.log("更新视图");
}
