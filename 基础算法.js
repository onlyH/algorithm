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

/***************************************************************************************** */

/**
 * TODO 选择排序
 * 找到数组中的最小值，选中它并将其放置在第一位
 * 接着找到第二小的值，选中它并将它放置在第二位
 *  以此类推，执行n-1轮
 * */

/***************************************************************************************** */

/**
 * 二分查找
 * 通过比较目标值与数组中间元素的大小关系，缩小查找范围，直到找到目标值或查找范围为空。
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    // 计算中间索引
    let mid = Math.floor((left + right) / 2);
    // 如果中间元素等于目标值，返回中间索引
    if (arr[mid] === target) return mid;
    // 如果中间元素大于目标值，在左半部分继续查找
    if (arr[mid] > target) {
      right = mid - 1;
    } else {
      // 如果中间元素小于目标值，在右半部分继续查找
      left = mid + 1;
    }
  }
}

/***************************************************************************************** */

/**
 *
 * 快速排序
 * 它基于分治法的思想。该算法选择一个基准元素，将数组分为两个子数组，使得左子数组的元素都小于基准元素，
 * 右子数组的元素都大于基准元素，然后递归地对子数组进行排序。
 */

function quickSort(arr) {
  // 防止内存溢出
  if (arr.length <= 1) return arr;
  const nums = arr[0];
  let left = [],
    right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < nums) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), nums, ...quickSort(right)];
}

/***************************************************************************************** */

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
