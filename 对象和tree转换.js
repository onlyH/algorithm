/**
 * 将扁平的数据转换为树形结构
 * @param {Array} flatData - 扁平的数据数组
 * @param {number|null} parentId - 父节点的 ID，初始化时为 null
 * @param {Array} tree - 保存结果的数组，初始化时为空数组
 * @returns {Array} - 树形结构的数组
 */
function convertToTree(flatData, parentId = null, tree = []) {
  // 遍历数据数组，找到所有父节点为 parentId 的子节点
  for (let item of flatData) {
    if (item.parentId === parentId) {
      tree.push(item);
    }
  }

  // 遍历 tree 中的每个节点，递归调用 convertToTree 函数构建子树
  for (let node of tree) {
    // 初始化节点的 children 属性为一个空数组
    node.children = [];

    // 递归调用 convertToTree 函数，将当前节点作为父节点，构建子树
    convertToTree(flatData, node.id, node.children);

    // 如果当前节点的 children 数组为空，删除该属性
    if (node.children.length === 0) {
      delete node.children;
    }
  }

  // 返回构建好的树形结构数组
  return tree;
}

// 示例用法
const flatData = [
  { id: 1, name: "Node 1", parentId: null },
  { id: 2, name: "Node 2", parentId: 1 },
  { id: 3, name: "Node 3", parentId: 1 },
  { id: 4, name: "Node 4", parentId: 2 },
  { id: 5, name: "Node 5", parentId: 2 },
];

const treeData = convertToTree(flatData);
console.log(JSON.stringify(treeData, null, 2));

/**************************分割线*************************************/

/**
 * 将树形结构数组扁平化为一维数组
 * @param {Array} tree - 树形结构的数组
 * @returns {Array} - 扁平化后的一维数组
 */
function flattenTree(tree) {
  // 使用深拷贝创建一份树形结构的副本
  let clonedTree = JSON.parse(JSON.stringify(tree));

  // 保存扁平化后的数组
  let flattenedData = [];

  // 递归函数，用于遍历树形结构并将节点添加到扁平化数组中
  const expandTree = (nodes) => {
    if (nodes && nodes.length > 0) {
      nodes.forEach((node) => {
        // 将当前节点添加到扁平化数组中
        flattenedData.push(node);

        // 递归调用 expandTree 处理当前节点的子节点
        expandTree(node.children);
      });
    }
  };

  // 初始调用，传入整个树形结构数组
  expandTree(clonedTree);

  // 返回扁平化后的数组
  return flattenedData;
}

// 示例用法
const treeData1 = [
  { id: 1, name: "Node 1", children: [{ id: 2, name: "Node 2" }] },
  { id: 3, name: "Node 3", children: [{ id: 4, name: "Node 4" }] },
];

const flattenedData = flattenTree(treeData1);
console.log(JSON.stringify(flattenedData1, null, 2));

/**************************分割线*************************************/
// 深度对比两个对象是否相等
function deepEqual(obj1, obj2) {
  // 判断类型
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return obj1 === obj2;
  }

  // 获取对象的属性名数组
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // 判断属性数量是否一致
  if (keys1.length !== keys2.length) {
    return false;
  }

  // 遍历属性进行递归比较
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

// 示例用法
const objA = { a: 1, b: { c: 2, d: [3, 4] } };
const objB = { a: 1, b: { c: 2, d: [3, 4] } };
const objC = { a: 1, b: { c: 2, d: [3, 5] } };

console.log(deepEqual(objA, objB)); // true
console.log(deepEqual(objA, objC)); // false
