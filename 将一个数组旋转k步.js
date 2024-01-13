/**
 * 输入 [1,2,3,4,5,6,7]
 * k = 3，即旋转 3 步
 * 输出 [5,6,7,1,2,3,4]
 */

// 时间复杂度O(1)，空间复杂度O(n)
function rotate(nums, k) {
  if (!nums || nums.length === 0) return nums;
  //   确保k是数字
  k = Math.abs(k % nums.length);
  // 从第4个元素开始，删除之后所有元素
  const end = nums.splice(nums.length - k);
  return [...end, ...nums];
}
rotate([1, 2, 3, 4, 5, 6, 7], 3);

// 时间复杂度O(n^2)，空间复杂度O(1)
function rotate1(nums, k) {
  if (!nums || nums.length === 0) return nums;
  //   确保k是数字
  k = Math.abs(k % nums.length);

  for (let i = 0; i < k; i++) {
    // 数组是一个有序结构，unshift操作慢，O(n)
    nums.unshift(nums.pop());
  }
  return nums;
}
rotate1([1, 2, 3, 4, 5, 6, 7], 3);

function rotate3(nums, k) {
  let result = [];
  let r2 = [];
  for (let i = 0; i < nums.length; i++) {
    if (i > k) {
      result.push(nums[i]);
    } else {
      r2.push(nums[i]);
    }
  }
  console.log([...result, ...r2]);
}
rotate3([1, 2, 3, 4, 5, 6, 7], 3);
