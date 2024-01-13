/**
 * 将多层嵌套的数组扁平化为一维数组
 * @param {Array} arr - 多层嵌套的数组
 * @returns {Array} - 扁平化后的一维数组
 */
function flat(arr) {
  // 判断数组中是否存在嵌套数组（是否只有一级）
  let hasNestedArray = arr.some((i) => Array.isArray(i));

  // 如果没有嵌套数组，直接返回原数组
  if (!hasNestedArray) {
    return arr;
  }

  // 使用 concat 方法将多层嵌套的数组扁平化为一维数组
  let flattenedResult = Array.prototype.concat.apply([], arr);

  // 递归调用 flat 函数，处理可能存在的更深层次的嵌套数组
  return flat(flattenedResult);
}

// 示例用法
const nestedArray = [1, [2, 3, [4, 5]], 6, [7, 8]];
const flattenedArray = flat(nestedArray);
console.log(flattenedArray);

/**************************分割线*************************************/
// 对版本号数组进行排序
/**
 * 对版本号数组进行排序
 * @param {Array} versions - 版本号数组，例如 ['1.2.3', '1.0.0', '2.0.1']
 * @returns {Array} - 排序后的版本号数组
 */
function sortVersions(versions) {
  // 利用 compare 函数进行排序
  return versions.sort((a, b) => {
    // 将版本号字符串分割为数字数组
    const versionA = a.split(".").map(Number);
    const versionB = b.split(".").map(Number);

    // 遍历版本号的每个部分进行比较
    for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
      // 如果当前部分存在且不相等，直接返回比较结果
      if (versionA[i] !== undefined && versionB[i] !== undefined) {
        return versionA[i] - versionB[i];
      }

      // 如果当前部分不存在，则默认为 0
      const partA = versionA[i] || 0;
      const partB = versionB[i] || 0;

      // 比较当前部分
      if (partA !== partB) {
        return partA - partB;
      }
    }

    // 如果所有部分都相等，则版本号相等
    return 0;
  });
}

// 示例用法
const unsortedVersions = ["1.2.3", "1.0.0", "2.0.1", "1.10.0", "1.2.4"];
const sortedVersions = sortVersions(unsortedVersions);
console.log(sortedVersions);

/**************************分割线*************************************/
/**
 * 生成字符串的所有排列组合
 * @param {string} str - 输入的字符串
 * @returns {Array} - 字符串的所有排列组合数组
 */
function generatePermutations(str) {
  const result = [];

  // 辅助函数，用于递归生成排列组合
  function generate(current, remaining) {
    // 如果没有剩余字符，将当前排列加入结果数组
    if (remaining.length === 0) {
      result.push(current);
      return;
    }

    // 遍历剩余字符，逐个加入当前排列并递归生成下一级排列
    for (let i = 0; i < remaining.length; i++) {
      const nextChar = remaining[i];
      const newCurrent = current + nextChar;
      const newRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
      generate(newCurrent, newRemaining);
    }
  }

  // 开始生成排列组合
  generate("", str);

  return result;
}

// 示例用法
const inputString = "abc";
const permutations = generatePermutations(inputString);
console.log(permutations);
