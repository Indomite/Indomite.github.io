## ES6+

[TOC]

### Let、Var、Const的区别

- var可重复声明，let和const不行
- 变量提升，var会存在变量提升，let和const会有临时性死区，在声明之前访问变量报错
- 块级作用域，let 和 const 只在代码块内有效，var声明变量绑定到window 上

### Symbol

- 不是构造函数，不能通过new创建。而是直接调用Symbol()，返回的变量值永远不同
- Symbol.for()全局搜索被登记的 Symbol 中是否有该字符串参数作为名称的 Symbol 值，如果有即返回该 Symbol 值，若没有则新建并返回一个以该字符串参数为名称的 Symbol 值，并登记在全局环境中供搜索
- Symbol.keyFor(参数为Symbol变量) 返回一个已登记的 Symbol 类型值的 key ，用来检测该字符串参数作为名称的 Symbol 值是否已被登记。

### Map和 Set

- Map是一个映射数据结构

  **API：**Get、Set、Delete、Has(键)、Clear、Size、可以forEach遍历

- Set是一个集合数据结构（自带去重效果）

  **API：** Add、Has、Delete、Clear

### 函数

默认参数，参数临死性死区 ，不定参数符
箭头函数，其中包括this的指向问题，参数表示

### 数组API

Array.of 参数中所有值作为元素形成数组
Array.from 将类数组对象或可迭代对象转化为数组
find、findIndex、fill、includes、flat、flatMap

### Promise

**定义：**

是一种异步编程的解决方案，能够将异步操作封装，并将其返回的结果或者错误原因同Promise实例的then方法传入的处理函数联系起来

**New Promise：**
传入构造器函数，两个参数，都是敲定函数，第一个成功的敲定，第二个失败的敲定，构造器同步执行，但是可以异步的执行敲定函数
构造器中调用对应的敲定函数，返回的promise实例的对象状态就是那种，当然中间能会抛出异常throw，那么…状态是拒绝
状态的变化只有两种 pending => fulfilled，pending => rejected，一旦发生变化就不会再改变
**Promise.then返回的Promise的状态：**
非Promise对象，直接包裹成为Promise（Promise.resolve）
Promise对象，状态跟随，值跟随 ，通过这一点可以串联Promise（构造器函数的成功敲定函数也是这样的功能）
报错返回拒绝的Promise，错误对象是Promise的错误原因
**异常穿透：**
如果实例.then方法没有处理实例状态对于的回调函数，那么.then返回的promise实例状态跟随调用then方法的promise，Catch在最后进行异常的捕获

**中断Promise链：**
处理函数返回等待状态的Promise

**判断Promise的执行顺序**
注意，知道前面的Promise状态发生变化时，才能放进微任务队列
async 返回 Promise 和 promise.then返回 Promise 都会导致中间有两个层级的微任务队列间隔
async 每有await延后一个层次发生，如果返回promise再加两个层级

```js
new Promise((resolve)=>{
	resolve()
}).then(()=>{

})

Promise.resolve().then(()=>{

})
//这两个promise的then发生的层级一致
```

### 迭代器Iterator

Iterator是一种接口，它为不同的数据结构提供统一的访问机制。任何数据结构只要部署了Iterator 接口，就可以完成遍历操作。

Iterator可以认为是一个**指针**对象，通过next方法对数据结构进行遍历，每次调用next方法，指针就指向数组的下一个成员并返回数据结构的当前成员的信息。该信息是一个对象，包含value和done两个属性。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

**Iterator 接口部署在数据结构的Symbol.iterator属性**

可迭代的数据结构： String、Array、Map、Set、类数组、DOM（Nodelist对象）

目的就是为了迭代有序的数据结构，方便访问和使用**for…of**

### 生成器Generator

- function关键字与函数名之间有一个星号。
- 函数体内部使用yield表达式划分不同部状态。

```js
function*gen(){
  yield 1
  yield 2
}
// 得到遍历器对象
let g = gen()
console.log(g.next()) // { value: 1, done: false }
console.log(g.next()) // { value: 2, done: false }
console.log(g.next()) // { value: undefined, done: true }
```

### Yield 函数

yield表达式就是用来**划分Generator 函数的各个状态，他可以理解为函数暂停的标志**。

当执行next()方法，遇到yield表达式时，就暂停执行后面的操作，并**将yield表达式的值作为next方法返回的信息对象的value属性值**。

下次调用next()方法，继续执行yield表达式后面的操作。

```js
function*gen(){
  yield 1+2
  yield 2+3
}
// 得到遍历器对象
let g = gen()
console.log(g.next()) // { value: 3, done: false }
console.log(g.next()) // { value: 5, done: false }
console.log(g.next()) // { value: undefined, done: true }
```

### Async、Await

和Promise，Generator 有很大关联的：

 Async函数返回一个Promise，await可以等待Promise实例状态敲定，自己进行迭代器的next方法

### Proxy 和 Reflect

**Proxy**

Proxy 构造函数用于创建一个参数对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等

**Reflect**

ES6 中将 Object 的一些明显属于语言内部的方法移植到了 Reflect 对象上（当前某些方法会同时存在于 Object 和 Reflect 对象上），未来的新方法会只部署在 Reflect 对象上。

Reflect 对象对某些方法的返回结果进行了修改，使其更合理。

Reflect 对象使用函数的方式实现了 Object 的命令式操作
