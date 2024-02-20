// 一：map()，forEach()，filter()循环的共同之处：
//   1.forEach，map，filter循环中途是无法停止的，总是会将所有成员遍历完。
//   2.他们都可以接受第二个参数，用来绑定回调函数内部的 this 变量，将回调函数内部的 this 对象，指向第二个参数，间接操作这个参数（一般是数组）。

// 二：map()、filter()循环和forEach()循环的不同：
//    forEach 循环没有返回值； map，filter 循环有返回值。

// 三：map()和filter()都会跳过空位，for 和 while 不会

// 四：some()和every():
//    some()只要有一个是true，便返回true；而every()只要有一个是false，便返回false.

// 五：reduce()，reduceRight()：
//    reduce是从左到右处理（从第一个成员到最后一个成员），reduceRight则是从右到左（从最后一个成员到第一个成员）。

// 六：Object对象的两个遍历 Object.keys 与 Object.getOwnPropertyNames：
//    他们都是遍历对象的属性，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。但Object.keys不能返回不可枚举的属性；Object.getOwnPropertyNames能返回不可枚举的属性。
/**************************分割线*************************************/
// 由26个英文字母组成的字符串：^[A-Za-z]+$
// 由26个大写英文字母组成的字符串：^[A-Z]+$
// 由26个小写英文字母组成的字符串：^[a-z]+$
// 由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
// 数字：^[0-9]*$

// 质数
function judgePrime(n) {
  if (n < 2) {
    return false;
  }
  for (var i = 2; i < n; i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

// .斐波那契数列 0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

fibonacci(8)

function fibonacci2(n) {
  if (n <= 1) return n
  let n1 = 1 // 记录n-1的结果
  let n2 = 0// 记录n-2的结果
  let res = 0
  for (let i = 2; i <= n; i++) {
    res = n1 + n2
    n2 = n1
    n1 = res
  }
  return res
}

fibonacci2(8)

// 青蛙跳台阶 -- 动态规划
/*******************分割线************************/
// 写一个方法，将数组中的0 都移动到数组末尾，双指针实现
/**
 * 一个指针用于迭代数组元素，另一个指针用于记录非0元素的位置
 * 使用了两个指针，i用于迭代数组元素，nonZeroPointer用于记录非0元素的位置。
 * 当遇到非0元素时，将其与nonZeroPointer指向的位置进行交换，
 * 然后nonZeroPointer向后移动。这样，所有非0元素会被移到数组的前部，而剩余的位置都被填充为0。
 */
function moveZerosToEnd(nums) {
  let nonZeroPointer = 0; // 记录非0元素的位置
  // 遍历数组
  for (let i = 0; i < nums.length; i++) {
    // 当前元素非0时，将其移到非0元素的位置
    if (nums[i] !== 0) {
      // 交换非0元素和当前元素的位置
      [nums[i], nums[nonZeroPointer]] = [nums[nonZeroPointer], nums[i]];
      // 非0元素的位置向后移动
      nonZeroPointer++;
    }
  }
}

// 示例
const array = [0, 1, 0, 3, 12];
moveZerosToEnd(array);

console.log(array); // 输出 [1, 3, 12, 0, 0]

function zeroSum1(arr) {
  if (arr.length === 0) return arr
  let zeroLength = 0;
  for (let i = 0; i < arr.length - zeroLength; i++) {
    if (arr[i] === 0) {
      arr.push(arr[i])
      arr.splice(i, 1)
      i--; // 数组截取了一个元素，i 要递减
      zeroLength++; // 累加 0 的长度
    }
  }
  console.log(arr)
}

zeroSum1([0, 0, 1, 1, 2, 0, 1, 2, 3]) //[1, 1, 2, 1, 2, 3, 0, 0, 0]

function zero1(arr) {
  const zero = arr.filter(i => i === 0)
  const oNzero = arr.filter(i => i !== 0)
  console.log([...oNzero, ...zero])
}

zero1([0, 0, 1, 1, 2, 0, 1, 2, 3]) //[1, 1, 2, 1, 2, 3, 0, 0, 0]

function zero2(arr) {
  let zero = [];
  let oNzero = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      zero.push(arr[i])
    } else {
      oNzero.push(arr[i])
    }
  }
  return [...oNzero, ...zero]
}

zero2([0, 0, 1, 1, 2, 0, 1, 2, 3]) //[1, 1, 2, 1, 2, 3, 0, 0, 0]

/*******************分割线************************/
/**
 * reduce
 */
const arr = [1, 2, 3]
const sum = arr.reduce((acc, current) => acc + current, 0)

const mapArray = arr.map(item => item * 2)
const reduceArray = arr.reduce((acc, current) => {
  acc.push(current * 2)
  return acc
}, [])