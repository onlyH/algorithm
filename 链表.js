// 根据数组创建单项链表
function createLinkList(arr) {
  const length = arr.length;
  if (length === 0) throw new Error('array is empty')
  let currentNode = {
    value: arr[arr.length - 1]
  }
  if (length === 1) return currentNode;
  for (let i = length - 2; i >= 0; i--) {
    currentNode = {
      value: arr[i], next: currentNode
    }
  }

  return currentNode
}

const arr = [100, 200, 300]
const list1 = createLinkList(arr)
console.log(list1)

// 反转单项链表，并返回反转之后的链表头
function reverseLinkList(listNode) {
  let prevNode;
  let curNode;
  let nextNode = listNode;
// 以 nextNode为主，遍历链表
  while (nextNode) {
  //   第一个元素，删掉next，防止循环引用
    if(curNode && !prevNode) {
      delete curNode.next
    }
  //   反转指针
    if(curNode && prevNode) {
      curNode.next = prevNode
    }
  //   整体向后移动指针
    prevNode = curNode
    curNode = nextNode
    nextNode = nextNode?.next
  }
  // 最后一个补充，当 nextNode 为空时，此时 curNode 尚未设置 next
  curNode.next = prevNode
  return curNode
}
console.log(reverseLinkList(list1))

