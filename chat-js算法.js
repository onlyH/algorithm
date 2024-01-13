var arr = [1, 2, 3, 4, 5, 6, 1, 2, 3];

/* 1，数组去重 */

// set 只存储唯一的值
var arr1 = [...new Set(arr)];

// filter 只保留第一次出现的元素
var arr2 = arr.filter((item, index, self) => self.indexOf(item) === index);

// reduce 元素在累加器中不存在，则添加到累加器中
let arr3 = arr.reduce((pre, cur) => {
  if (!pre.includes(cur)) pre.push(cur);
  return pre;
}, []);

// Map 相同的键只会出现一次
var arr4 = Array.from(new Map(arr.map((item) => [item, item])).values());

// for循环
function unique(arr) {
  let res = [];
  arr?.length &&
    arr.forEach((item) => {
      if (!res.includes(item)) res.push(item);
    });
  return res;
}

/**************************分割线*************************************/

/* 2， JavaScript 数组中只出现一次的元素 */

// 使用filter和indexOf：只保留数组中在第一次出现和最后一次出现的位置相同的元素，即只出现一次的元素。
function findSingleOccurrences(arr) {
  return arr.filter(
    (item, index, self) => self.indexof(item) === self.lastIndexOf(item)
  );
}

// 使用reduce和Object：跟踪每个元素的出现次数，然后过滤出现次数为1的元素。
function findSingleOccurrences(arr) {
  return arr
    .reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {})
    .filter((count) => count === 1);
}

// 使用Map:存储每个元素的出现次数，然后过滤出现次数为1的元素
function findSingleOccurrences(arr) {
  const map = new Map();
  arr.forEach((e) => {
    map.has(e) ? map.set(e, map.get(e) + 1) : map.set(e, 1);
  });
  return [...map.keys()].filter((key) => map.get(key) === 1);
}

/**************************分割线*************************************/

/** js进制转换 */
let decimalNumber = 255;
// 十进制转二，八，十六进制
decimalNumber.toString(2);
decimalNumber.toString(8);
decimalNumber.toString(16);

// 二，八，十六进制转十进制
parseInt(binaryNumber, 2);
parseInt(binaryNumber, 8);
parseInt(binaryNumber, 16);

/**************************分割线*************************************/

/** js解析 url 中的参数 (URLSearchParams 对象来解析 URL 中的查询参数) */
// "https://example.com/page?name=John&age=30"'
let urlString = window.location.href;
let url = new URL(urlString);
// 获取参数
url.searchParams.get("name");
// 设置参数
url.searchParams.set("name", "john");

/**************************分割线*************************************/

/** 手写new操作符 */
function myNew(fn, ...args) {
  // 步骤1：创建一个新的空对象
  let obj = {};
  // 步骤2：将新对象的原型链接到构造函数的原型对象
  Object.setPrototypeOf(obj, fn.prototype);
  // 步骤3：执行构造函数，并将新对象作为 this 上下文
  let result = fn.apply(obj, args);
  // 步骤4：如果构造函数返回一个对象，则返回该对象；否则，返回新对象
  return result instanceof Object ? result : obj;
}
// 示例使用
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let person = myNew(Person, "John", 30);
console.log(person.name); // 输出: "John"
console.log(person.age); // 输出: 30

/**************************分割线*************************************/

/** 洗牌算法
 * 将数组元素随机打乱，产生一个随机排列的数组
 * 从数组的最后一个元素开始，随机选择一个索引（包括当前元素本身），
 * 然后将当前元素与随机选择的元素进行交换。这个过程一直持续到第一个元素。
 * 这种算法保证了每个元素在被选为交换目标的概率相等，因此生成的排列是等概率的。
 * 这是一种高效而且经过广泛验证的洗牌算法。
 */

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // 生成 0 -i 之间的随机整数
    let j = Math.floor(Math.random() * (i + 1));
    [array[j], array[j + 1]] = [array[j + 1], array[j]];
  }
  return array;
}
// 示例使用
let myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let shuffledArray = shuffleArray(myArray);
console.log(shuffledArray);

/**************************分割线*************************************/

/** 数组中的第 K 个最大元素
 * 通过 排序 找到第 K 个最大元素的方法
 * 时间复杂度是 O(n log n)
 */
function findKthLargest(nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}
// 示例使用
let array = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
let k = 4;
let result = findKthLargest(array, k);

// 选择算法，快速选择算法，时间复杂度为 O(n)，最坏情况下为 O(n^2)
