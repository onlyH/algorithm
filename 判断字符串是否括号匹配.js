// 一个字符串可能包含{}()[]三种括号，判断时是否是括号匹配的 --- 栈
/**
 * 先进后出 push，pop，length
 * 栈：逻辑结构，理论模型，不管如何实现，不受任何语言的限制
 * 数组：物理结构，真实的功能实现，受限于编程语言
 */
function checkBrackets(str) {
  const length = str.length;
  if (length === 0) return true;
  const leftSymbols = "{([";
  const rightSymbols = "})]";
  const stack = [];
  for (let i = 0; i < length; i++) {
    const s = str[i];
    if (leftSymbols.includes(s)) {
      // 左括号，压栈
      stack.push(s);
    } else if (rightSymbols.includes(s)) {
      // 右括号，判断栈顶，是否出栈
      const top = stack[stack.length - 1];
      if (checkMatch(top, s)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}

function checkMatch(l, r) {
  if (l === "(" && r === ")") return true;
  if (l === "{" && r === "}") return true;
  if (l === "[" && r === "]") return true;
  return false;
}

checkBrackets("{a(b[c]d)e}f");
