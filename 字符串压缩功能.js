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
