/**
 * replace接收两个参数，
 * 参数一是需要替换掉的字符或者一个正则的匹配规则，
 * 参数二，需要替换进去的字符，仔实际的原理当中，参数二，你可以换成一个回调函数。
 */
const str = "2018年结束了，2019年开始了，2020年就也不远了";
const rex = /\d+/g;
const newStr = str.replace(rex, (match) => {
  const arr = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  let result = "";
  match.split("").forEach((i) => {
    result += arr[+i];
  });
  return result;
});
console.log(newStr); // 贰零壹捌年结束了，贰零壹玖年开始了，贰零贰零年就也不远了

/**
 * search()
 * 在目标字符串中搜索与正则规则相匹配的字符，
 * 搜索到，则返回第一个匹配项在目标字符串当中的位置，没有搜索到则返回一个-1。
 */

const reg = /\d+/i;
console.log(str.search(reg)); // 0 这里搜索到的第一项是从位置0开始的

{
  const str = "Excuse me, how do I get to park road?";
  console.log(str.includes("how")); // 输出：true
  console.log(str.startsWith("Excuse")); // 输出： true
  console.log(str.endsWith("?")); // 输出： true
}
{
  const str = "http";
  const str2 = str.repeat(3);
  console.log(str); // 输出：'http'
  console.log(str2); // 输出：'httphttphttp'
}
