/**
 * 冒泡排序思路
 *
 * 比较所有相邻的元素，如果第一个比第二个大，则交换他们
 * 一轮下来，可以保证最后一个数是最大的
 * 执行n-1轮，就可以完成排序
 */

function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i; i < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], [arr[j + 1]]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

/**************************分割线*************************************/

/**
 * TODO 选择排序
 * 找到数组中的最小值，选中它并将其放置在第一位
 * 接着找到第二小的值，选中它并将它放置在第二位
 *  以此类推，执行n-1轮
 * */

/**************************分割线*************************************/

/**
 * 二分查找
 * 通过比较目标值与数组中间元素的大小关系，缩小查找范围，直到找到目标值或查找范围为空。
 */
function binarySearch(arr, target) {
  if (arr.length === 0) return -1
  let startIndex = 0; // 开始位置
  let endIndex = arr.length - 1; // 结束位置
  while (startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2)
    const midValue = arr[midIndex]
    if (target < midValue) {
      endIndex = midIndex - 1
    } else if (target > midValue) {
      startIndex = midIndex + 1
    } else {
      return midIndex
    }
  }
  return -1
}

function binarySearch2(arr, target, startIndex, endIndex) {
  if (arr.length === 0) return -1
  if (startIndex == null) startIndex = 0
  if (endIndex == null) endIndex = arr.length - 1
  // 如果start和end相遇则结束
  if (startIndex === endIndex) return -1
  // 中间位置
  const midIndex = Math.floor((startIndex + endIndex) / 2)
  const midValue = arr[midIndex]
  if (target < midValue) {
    return binarySearch2(arr, target, startIndex, midIndex - 1)
  } else if (target > midValue) {
    return binarySearch2(arr, target, midIndex + 1, endIndex)
  } else {
    return midIndex
  }
}

/**************************分割线*************************************/

/**
 *
 * 快速排序
 * 它基于分治法的思想。该算法选择一个基准元素，将数组分为两个子数组，使得左子数组的元素都小于基准元素，
 * 右子数组的元素都大于基准元素，然后递归地对子数组进行排序。
 * 平均情况：O(n log n)
 * 最坏情况（当选择的基准值导致不平衡分割）：O(n^2)
 * 最佳情况（当每次都能平衡地分割数组）：O(n log n)
 */

function quickSort(arr) {
  // 防止内存溢出
  if (arr.length <= 1) return arr;
  const nums = arr[0];
  let left = [], right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < nums) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), nums, ...quickSort(right)];
}

/**************************分割线*************************************/

// 深拷贝
function deepCLone(obj) {
  if (typeof obj !== "object" || obj === null) return obj;
  let result = Array.isArray(obj) ? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      result[i] = deepCLone(obj[i]);
    }
  }
  return result;
}

/**************************分割线*************************************/

/**
 * 获取1-10000之前所有的对称数（回文数）并说明时间复杂度
 * 迭代每个数字，检查它是否为回文数。回文数是指正序和倒序读都一样的数字
 * 时间复杂度是 O(n * d)
 * d 是相对较小的常数，数字范围是 1 到 10000，因此可以将时间复杂度简化为 O(n)
 */
function isPalindrome(num) {
  return String(num) === String(num).split('').reverse().join('')
}

function getPalindromesInRange(start, end) {
  let palindromes = []
  for (let i = start; i <= end; i++) {
    if (isPalindrome(i)) {
      palindromes.push(i)
    }
  }
  return palindromes
}

const palindromesInRange = getPalindromesInRange(1, 10000);
console.log(palindromesInRange);

/**************************分割线*************************************/
/**
 * 实现数字千分位格式化
 * 1234567890 -> 1,234,567,890
 * 内置函数 toLocaleString。这个函数能够根据当前地区的规则格式化数字，包括添加千分位分隔符
 */
//  O(1)
function formatNumberWithCommas(number) {
  return number.toLocaleString()
}

const formattedNumber = formatNumberWithCommas(1234567890);
console.log(formattedNumber); // 输出 "1,234,567,890"

// 使用正则表达式递归 O(n)
function formattedNumber1(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// 使用递归和字符串拼接：
function formattedNumber2(number) {
  let str = number.toString()
  if (str.length <= 3) {
    return str
  } else {
    return formattedNumber2(str.slice(0, -3)) + ',' + str.slice(-3)
  }

}

formattedNumber2(1234567890);

/**************************分割线*************************************/
/**
 * 用JS切换字母大小写
 */
function toggleCaseUsingMethods(str) {
  return str.split('').map(char => char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()).join('')
}

function toggleCaseUsingMethods2(str) {
  return str.replace(/./g, char => char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase())
}

const str = "Hello World";
toggleCaseUsingMethods(str)
toggleCaseUsingMethods2(str)
/**************************分割线*************************************/
/**
 * 实现高效的英文单词前缀匹配
 * 输入一个单词，快速判断是不是某一个单词的前缀
 */

/**************************分割线*************************************/
// 70. 爬楼梯
// https://leetcode.cn/problems/climbing-stairs/submissions/381228150/

// 746. 使用最小花费爬楼梯
// https://leetcode.cn/problems/min-cost-climbing-stairs/description/

// 72. 编辑距离
// https://leetcode.cn/problems/edit-distance/

// 112. 路径总和
// https://leetcode.cn/problems/path-sum/description/

// 1. 两数之和
// https://leetcode.cn/problems/path-sum/
