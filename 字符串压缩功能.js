// 利用字符重复出现的次数，编写一种方法，实现基本的字符串压缩功能。比如，字符串aabcccccaaa会变为a5b1c5
function compressString(s) {
  let result = "";
  let count = 1;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === s[i + 1]) {
      count++;
    } else {
      result += s[i] + count;
      count = 1;
    }
  }

  return result;
}

// 示例
const compressedString = compressString("aabcccccaaa");
console.log(compressedString); // 输出：a2b1c5a3


function aaa(s) {
  let map = new Map();
  for (let i = 0; i < s.length; i++) {
    map.has(s[i]) ? map.set(s[i], map.get(s[i]) + 1) : map.set(s[i], 1);
  }
  let result = "";

  for (let [key, value] of map) {
    result += key + value;
  }
  return result;

}

aaa("aabcccccaaa"); // a5b1c5


/**************************分割线*************************************/

// 字符串中连续最多的字符，以及次数
/**
 * 双重循环法：算法复杂度：O(n^2)
 *使用两层循环，外层循环遍历字符串的每个字符，内层循环从当前字符开始，统计连续相同字符的数量。
 */
function findMaxConsecutiveChar1(str) {
  // 初始化最大字符和次数
  let maxChar = str[0];
  let maxCount = 1;

  // 外循环遍历字符串的每个字符
  for (let i = 0; i < str.length; i++) {
    // 当前字符和次数
    let currentChar = str[i];
    let count = 1;

    // 内循环统计连续相同字符的数量
    for (let j = i + 1; j < str.length && str[j] === currentChar; j++) {
      count++;
    }

    // 更新最大次数和字符
    if (count > maxCount) {
      maxCount = count;
      maxChar = currentChar;
    }
  }

  // 返回结果字符串
  return `连续最多的字符是${maxChar}，次数${maxCount}次。`;
}


/**
 * 单循环法：
 * 算法复杂度：O(n)
 * 使用单循环遍历字符串，使用变量记录当前连续字符和其出现次数，同时更新最大值。
 */
function findMaxConsecutiveChar2(str) {
  // 初始化最大字符和次数
  let maxChar = str[0];
  let maxCount = 1;

  // 当前字符和次数
  let currentChar = str[0];
  let count = 1;

  // 单循环遍历字符串
  for (let i = 1; i < str.length; i++) {
    // 判断是否为连续相同字符
    if (str[i] === currentChar) {
      count++;
    } else {
      // 更新当前字符和次数
      currentChar = str[i];
      count = 1;
    }

    // 更新最大次数和字符
    if (count > maxCount) {
      maxCount = count;
      maxChar = currentChar;
    }
  }

  // 返回结果字符串
  return `连续最多的字符是${maxChar}，次数${maxCount}次。`;
}

/**
 * 正则表达式法：
 * 算法复杂度：O(n)
 * 使用正则表达式匹配连续字符，并找出匹配结果中最长的。
 */
function findMaxConsecutiveChar3(str) {
  // 使用正则表达式匹配连续字符
  const matches = str.match(/(.)\1*/g);
  // 找出匹配结果中最长的
  const maxMatch = matches.reduce((max, match) => (match.length > max.length ? match : max), '');
  // 返回结果字符串
  return `连续最多的字符是${maxMatch[0]}，次数${maxMatch.length}次。`;
}


/**
 * Map统计法：
 * 算法复杂度：O(n)
 * 使用 Map 统计字符出现的次数，同时记录最大次数
 */
function findMaxConsecutiveChar4(str) {
  // 使用 Map 统计字符出现的次数
  const charCountMap = new Map();
  // 初始化最大字符和次数
  let maxChar = str[0];
  let maxCount = 1;

  // 遍历字符串
  for (const char of str) {
    // 统计字符出现的次数
    charCountMap.set(char, (charCountMap.get(char) || 0) + 1);

    // 更新最大次数和字符
    if (charCountMap.get(char) > maxCount) {
      maxCount = charCountMap.get(char);
      maxChar = char;
    }
  }

  // 返回结果字符串
  return `连续最多的字符是${maxChar}，次数${maxCount}次。`;
}

findMaxConsecutiveChar4('abbcccddeeee123')