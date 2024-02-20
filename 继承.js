/**
 * 组合继承
 * 构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数，
 * 但是也存在一个缺点就是在继承父类函数的时候调用了父类构造函数，
 * 导致子类的原型上多了不需要的父类属性，存在内存上的浪费。
 */
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function () {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this,value)
}
Child.prototype  = new Parent()

const children = new Child(1)
children.getValue()
children instanceof Parent // true

/**************************分割线*************************************/

/**
 * 寄生组合继承
 * 将父类的原型赋值给了子类，并且将构造函数设置为子类
 */
function Parent(value) {
this.val = value
}
Parent.prototype.getValue = function () {
  console.log(this.val)
}
function Children(value) {
  Parent.call(this,value)
}
Children.prototype = Object.create(Parent.prototype,{
  constructor:{
    value:Child,
    enumerable:false,
    writable:true,
    configurable:true
  }
})
const child = new Child(1)
child.getValue() // 1
child instanceof Parent // true

/**************************分割线*************************************/

/**
 * Class 继承
 *  extends 表明继承自哪个父类，并且在子类构造函数中必须调用 super，
 *  因为这段代码可以看成 Parent.call(this, value)
 */
class Parent {
  constructor(value) {
    this.val = value
  }
  getValue() {
    console.log(this.val)
  }
}
class Children extends Parent {
  constructor(value) {
    super(value);
    this.val = value
  }
}
let clidren = new Children(1)
child.getValue() // 1
children instanceof Parent // true