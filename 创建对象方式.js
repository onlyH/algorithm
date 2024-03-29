// TODO 具体详细在前端开发中说一说最有价值的项目，难点在哪里；

// js 创建对象的几种方式

// 1.对象字面量

const person = {
  name: "Join",
  age: 30,
};

// 2.构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person1 = new Person("Join", 30);

// 3.Object.Create
const personPrototype = {
  greet: function () {
    console.log("hello" + this.name);
  },
};
const person2 = Object.create(personPrototype);
person.name = "Jion";

// 工厂函数
function createPerson(name, age) {
  return {
    name,
    age,
    greet: function () {
      console.log("hello" + this.name);
    },
  };
}
const person4 = createPerson("Join", 30);

// 5.class 关键字
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}
const person = new Person("John", 30, "male");

/**************************分割线*************************************/

// 数组解构
const [a, b] = [1, 2];

// 对象解构
const { firstName, lastName } = { firstName: "John", lastName: "Doe" };

// 导出模块
export const PI = 3.14159;

// 导入模块
import { PI } from "./math";

/**************************分割线*************************************/

// 原型，原型链
function Animal(name) {
  this.name = name;
}
Animal.prototype.sayName = function () {
  console.log(this.name);
};

var cat = new Animal("Whiskers");
console.log(cat.name);
cat.sayName();
var animalPrototype = Object.getPrototypeOf(cat);
console.log(animalPrototype === Animal.prototype);

/**************************分割线*************************************/
// instanceof
function myInstanceof(left,right) {
  // 获取对象原型
  let proto = Object.getPrototypeOf(left)
  // 获取类型原型
  let prototype = right.prototype
  while(true) {
    // 判断对象的原型是否在类型的原型上，直到 null
    if(proto == null) return false
    if(proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
/**************************分割线*************************************/

// 使用队列处理异步任务的例子

// 模拟异步任务
function asyncTask(item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(item);
      resolve();
    }, 1000);
  });
}

// 创建队列
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    console.log('Dequeueing item:', this.items[0])
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// 创建异步任务队列
const asyncQueue = new Queue();

// 将异步任务加入队列
asyncQueue.enqueue(() => asyncTask("Task 1"));
asyncQueue.enqueue(() => asyncTask("Task 2"));
asyncQueue.enqueue(() => asyncTask("Task 3"));

// 依次执行队列中的异步任务
async function processAsyncQueue() {
  while (!asyncQueue.isEmpty()) {
    const task = asyncQueue.dequeue();
    await task();
  }
}

// 执行异步队列
processAsyncQueue();

// 空对象
let obj = {}

JSON.stringify(obj === '{}')

Object.keys(obj).length

// offsetTop< innerHeight + scrollTop
function lazyLoad() {
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  let innerHeight = window.innerHeight
  for(let i = 0 ; i<imgs.length;i++) {
    if(imgs[i].offsetTop < innerHeight + scrollTop) {
      imgs[i].src= imgs[i].getAttribute('data-src')
    }
  }
}
window.onscroll(lazyLoad())