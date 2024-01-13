/**
 * 前序：root -- left -- right
 * 中序：left -- root -- right
 * 后序：left -- right -- root
 */
function orderTraverse(node) {
  if (node == null) return
  console.log(node.value)
  orderTraverse(node.left)
  orderTraverse(node.right)
}

/**
 * 二叉搜索树 BST（binary search tree）
 * left（包括其后代）value <= root value
 * right（包括其后代）value >= root value
 * 可使用二分查找
 */