/**
 * 时间复杂度：add O(1),delete O(n)
 * 空间复杂度，整体 O(n)
 */
class myQueue {
  private stack1: number[] = [];
  private stack2: number[] = [];

  add(n: number) {
    this.stack1.push(n);
  }

  delete(): number | null {
    let res;
    const stack1 = this.stack1;
    const stack2 = this.stack2;
    // step1 将 stack1 所有的元素移动到 stack2 中
    while (stack1.length) {
      let n = stack1.pop();
      if (n != null) stack2.push(n);
    }
    // step2 pop
    res = stack2.pop();
    // step3 将 stack2 所有元素还给 stack1
    while (stack2.length) {
      let n = stack2.pop();
      if (n != null) stack1.push(n);
    }
    return res || null;
  }

  get length(): number {
    return this.stack1.length;
  }
}

const q = new myQueue();
q.add(100);
q.add(200);
q.add(300);
console.info(q.length);
console.info(q.delete());
console.info(q.length);

interface IListNode {
  value: number
  next: IListNode | null
}

// 单项列表实现队列 -- 从 tail 入，从 head 出
class MyQueue2 {
  private head: IListNode | null = null;
  private tail: IListNode | null = null;
  private len: number = 0

  // 入队，在tail位置
  add(n: number) {
    const newNode: IListNode = {
      value: n,
      next: null
    }
    //   处理 head
    if (this.head == null) {
      this.head = newNode
    }
    //   处理 tail
    let tail = this.tail
    if (tail) {
      tail.next = newNode
    }
    this.tail = newNode
    //   记录长度
    this.len++
  }

  delete(): number {
    const handNode = this.head
    if (handNode == null) return null
    if (this.len <= 0) return null
    //   取值
    const value = handNode.value
    this.head = handNode.next

    this.len--
    return value
  }

  get length(): number {
    // len 需要单独存储，不能遍历链表来获取
    return this.len
  }
}
 const q2 = new MyQueue2()
q2.add(100)
q2.add(200)
q2.add(300)
console.log('length',q2.length)
console.log(q2.delete())
console.log('length',q2.length)
