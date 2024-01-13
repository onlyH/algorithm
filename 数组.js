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
/************************************************************************* */
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

// .斐波那契数列
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
