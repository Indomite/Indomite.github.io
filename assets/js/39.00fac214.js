(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{448:function(t,e,a){"use strict";a.r(e);var r=a(0),v=Object(r.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"vue"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue"}},[t._v("#")]),t._v(" VUE")]),t._v(" "),e("h3",{attrs:{id:"响应式数据原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#响应式数据原理"}},[t._v("#")]),t._v(" 响应式数据原理")]),t._v(" "),e("p",[t._v("数组和对象类型当值变化时如何劫持到，对象内部通过"),e("code",[t._v("defineReactive")]),t._v("方法，使用"),e("code",[t._v("Object.defineProperty")]),t._v("将属性进行劫持（只会劫持已经存在的属性），数组通过重写数组来实现")]),t._v(" "),e("p",[e("code",[t._v("vue3")]),t._v("使用proxy来实现响应式原理")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic2.zhimg.com/80/v2-b94d747fd273ec8224e6349f701430fd_720w.jpg",alt:"img"}})]),t._v(" "),e("h4",{attrs:{id:"实现的核心类"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实现的核心类"}},[t._v("#")]),t._v(" 实现的核心类：")]),t._v(" "),e("p",[t._v("Observer：给对象属性添加getter和setter，用于以来收集和派发更新")]),t._v(" "),e("p",[t._v("Dep：用于手机当前响应式对象的依赖关系，每个响应式对象包括子对象都会有一个Dep实例，当数据变更时通过"),e("code",[t._v("dep.notify()")]),t._v("通知各个watcher")]),t._v(" "),e("p",[t._v("Watcher：观察者对象，实例分为渲染watcher，计算属性watcher，监听器watcher")]),t._v(" "),e("h4",{attrs:{id:"原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#原理"}},[t._v("#")]),t._v(" 原理")]),t._v(" "),e("p",[t._v("当创建Vue实例时，vue会遍历data选项的属性，利用"),e("code",[t._v("Object.defineProperty")]),t._v("为属性添加getter和setter对数据的读取进行劫持(getter用来收集依赖，setter用来派发更新)，并且在内部追踪依赖，在属性被访问和修改时通知变化")]),t._v(" "),e("p",[t._v("每个组件实例会有相应的watcher实例，会在组件渲染的过程中记录依赖的数据属性，当依赖项被改动时，setter方法会通知依赖与data的watcher实例重新计算（派发更新），从而使关联的组件重新渲染")]),t._v(" "),e("p",[e("strong",[t._v("vue.js采用数据劫持结合发布订阅模式，通过"),e("code",[t._v("object.defineProperty")]),t._v("来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发响应的监听回调")])]),t._v(" "),e("h3",{attrs:{id:"computed和watch"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#computed和watch"}},[t._v("#")]),t._v(" Computed和Watch")]),t._v(" "),e("h4",{attrs:{id:"区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#区别"}},[t._v("#")]),t._v(" 区别")]),t._v(" "),e("p",[t._v("computed计算属性：依赖其它属性值，并且computed的值有缓存，只有依赖的属性值发生改变，下一次获取computed的值时才会重新计算computed的值")]),t._v(" "),e("p",[t._v("watch监听器：更多的是【观察】的作用，无缓存性，类似于某些数据的监听回调，每当监听的数据发生变换时都会执行回调进行后续的操作")]),t._v(" "),e("h4",{attrs:{id:"运用场景"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#运用场景"}},[t._v("#")]),t._v(" 运用场景")]),t._v(" "),e("p",[t._v("当我们需要进行数值的计算，并且依赖于其他数据时，应该使用computed，利用computed的缓存特性，避免每次获取值时，都要重新计算；当我们需要在数据变化时执行异步或者开销比较大的操作时，应该使用watch，watch允许执行异步操作，限制我们执行该操作的频率")]),t._v(" "),e("h3",{attrs:{id:"为什么vue3使用proxy-抛弃了object-defineproperty"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#为什么vue3使用proxy-抛弃了object-defineproperty"}},[t._v("#")]),t._v(" 为什么Vue3使用proxy，抛弃了object.defineProperty")]),t._v(" "),e("p",[e("code",[t._v("Object.defineProperty")]),t._v("只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。Vue 2.x 里,是通过 递归 + 遍历 data 对象来实现对数据的监控的,如果属性值也是对象那么需要深度遍历,显然如果能劫持一个完整的对象是才是更好的选择。Proxy 可以劫持整个对象,并返回一个新的对象。Proxy 不仅可以代理对象,还可以代理数组。还可以代理动态增加的属性。")]),t._v(" "),e("h3",{attrs:{id:"vue中的key到底有什么作用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue中的key到底有什么作用"}},[t._v("#")]),t._v(" Vue中的key到底有什么作用")]),t._v(" "),e("p",[t._v("key是vnode的唯一id，依靠key，我们的diff操作可以更加准确，更加快速。diff算法的过程中，先会进行新旧节点的首尾交叉对比，当无法匹配的时候会用新节点的key与旧节点进行对比，从而找到相应的旧节点。")]),t._v(" "),e("h3",{attrs:{id:"nexttick原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#nexttick原理"}},[t._v("#")]),t._v(" nextTick原理")]),t._v(" "),e("h4",{attrs:{id:"js-运行机制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#js-运行机制"}},[t._v("#")]),t._v(" JS 运行机制")]),t._v(" "),e("p",[t._v("JS 执行是单线程的，它是基于事件循环的。事件循环大致分为以下几个步骤:")]),t._v(" "),e("ol",[e("li",[t._v("所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。")]),t._v(" "),e("li",[t._v('主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。')]),t._v(" "),e("li",[t._v('一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。')]),t._v(" "),e("li",[t._v("主线程不断重复上面的第三步。")])]),t._v(" "),e("h4",{attrs:{id:"原理-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#原理-2"}},[t._v("#")]),t._v(" 原理")]),t._v(" "),e("ol",[e("li",[t._v("vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行")]),t._v(" "),e("li",[t._v("microtask 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕")]),t._v(" "),e("li",[t._v("考虑兼容问题,vue 做了 microtask 向 macrotask 的降级方案")])]),t._v(" "),e("h3",{attrs:{id:"data为什么必须是函数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#data为什么必须是函数"}},[t._v("#")]),t._v(" Data为什么必须是函数")]),t._v(" "),e("p",[t._v("因为组件是可以复用的,JS 里对象是引用关系,如果组件 data 是一个对象,那么子组件中的 data 属性值会互相污染,产生副作用。")]),t._v(" "),e("p",[t._v("所以一个组件的 data 选项必须是一个函数,因此每个实例可以维护一份被返回对象的独立的拷贝。new Vue 的实例是不会被复用的,因此不存在以上问题。")])])}),[],!1,null,null,null);e.default=v.exports}}]);