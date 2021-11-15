


# 如何实现scoped css

[TOC]

## scoped CSS

### 什么是scoped CSS？

scoped css(作用域CSS)，本质就是通过让每一个选择器成为一个unique的存在，然后便自然而然的形成了作用域

#### scope css 的原理是什么？

「scoped 作用域」是「Vue」通过「postcss」来实现对每一个在 scoped 标签中定义的选择器的特殊作用域标识。在标签加上v-data-something属性，再在选择器时加上对应[v-data-something]，即CSS带属性选择器，以此完成类似作用域的选择方式。

#### 作用域

而提到「Vue」中「作用域 CSS」，我想大家应该立即想到以 scoped 的方式形成的带有作用域的 css。但是，值得一提的是，在「Vue」中还支持了一种「作用域 CSS」，即「CSS Module」。

##### scoped 作用域

「scoped 作用域」是「Vue」通过「vue-loader」来实现对每一个在 scoped 标签中定义的选择器的特殊作用域标识。例如：

```javascript
<template>
  <div id="app">
    <div class="out-box">
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  .out-box {
    width: 200px;
    height: 200px;
    background-color: #faa;
  }
}
</style>
```

标识后展示在页面上的：

```javascript
<div data-v-7ba5bd90 id="app">
    <div data-v-7ba5bd90 class="out-box">
    </div>
</div>

<style>
#app .out-box[data-v-7ba5bd90] {
    width: 200px;
    height: 200px;
    background-color: #faa;
}
</style>
```

> 给HTML的dom节点添加一个不重复的data属性(例如: data-v-7ba5bd90)来唯一标识这个dom 元素
> 在每句css选择器的末尾(编译后生成的css语句)加一个当前组件的data属性选择器(例如：[data-v-7ba5bd90])来私有化样式

可以看到 Scope CSS 的本质是基于 HTML 和 CSS 选择器的属性，通过分别给 HTML 标签和 CSS 选择器添加 data-v-xxxx 属性的方式实现。

在我们平常开发中，很常见的场景就是我们在使用一些已有的组件或第三方组件时，我们需要对原有组件的样式进行一些微小的改动。那么，这个时候就需要使用穿透来实现样式的改动，例如：

```css
<style>
div >>> .out-box {
    background-color: #aaf;
}
</style>
```

##### CSS Module 作用域

相比较「scoped 作用域」，「CSS Modeul 作用域」它所具备的能力更强。

**什么是CSS Module**

「CSS Module」指的是可以将一个定义好的「CSS」文件以变量的形式导入，然后通过使用这个变量对「HTML」中的元素进行样式的修饰，例如：

**a.css**

```css
.box {
    width: 100%;
    height: 100%;
    background-color: #afa;
}
```

**b.js**

```js
import style from './a.css'

const boxElem = document.createElement('div');
boxElem.className = style.box
```

然后，渲染到页面的时候，它对应的 HTML 看起来会是这样：

```html
<div class="a-box_jlpNx"></div>
```

可以看出，此时的「类选择器」同样是随机生成的，这也是「CSS Module」形成作用域的所在。

值得一提的是，「CSS Module」还具备其他的能力，例如可以定义全局的「选择器」，写起来会是这样：

```css
:global(.title) {
  color: green;
}
```

##### 两种作用域的比较

「scoped 作用域」:

- 对组件没有硬性要求
- 不易于管理组件样式，需要借助第三方变量定义支持
- 易于覆盖组件样式，即通过穿透来实现对样式的覆盖

「CSS Module 作用域」:

- 适合于高度沉淀下的组件使用
- 易于管理组件样式，即可以通过 `style` 管理组件中的选择器
- 组件样式无法通过外部直接覆盖

#### vue-loader处理组件

在开发环境下一个组件（.vue 文件）会先由 vue-loader 来处理。那么，针对 Scope CSS 而言，vue-loader 会做这 3 件事：

![img](https://camo.githubusercontent.com/c22ec2a3d7329054971d44836b32222888360474280c423a1a6ba91d25fef007/68747470733a2f2f70332d6a75656a696e2e62797465696d672e636f6d2f746f732d636e2d692d6b3375316662706663702f61363838313137656132616634343063626233386136353239373865613235377e74706c762d6b3375316662706663702d7a6f6f6d2d312e696d616765)

1. 解析组件，提取出 `template`、`script`、`style` 对应的代码块，主要是通过[@vue/component-compiler-utils](https://github.com/vuejs/component-compiler-utils)中的parse方法：

   ```js
   // vue-loader/lib/index.js
   const { parse } = require("@vue/component-compiler-utils");
   
   module.exports = function (source) {
     // 获取当前上下文
     const loaderContext = this;
     const { sourceMap, rootContext, resourcePath } = loaderContext;
     // 构建文件资源入口，一般是src目录，主要用来构建source-map
     const sourceRoot = path.dirname(path.relative(context, resourcePath));
     const descriptor = parse({
       source,	// 源代码块
       compiler: require("vue-template-compiler"),  // 编译对象
       filename,  // 当前组件的文件名
       sourceRoot,  // 文件资源入口
       needMap: sourceMap,	// 是否需要source-map
     });
   };
   ```

   Vue 的 Scope CSS 实现的前提是组件被解析了，然后再分别处理 `template` 和 `style` 部分的代码～所以这一步还是很关键的

2. 构造并导出 `export` 组件实例，在组件实例的选项上绑定 ScopId

   vue-loader 在解析完组件后，会分别处理并生成 `template`、`script`、`style` 的导入 `import` 语句，再调用 `normalizer` 方法正常化（normalizer）组件，最后将它们拼接成代码字符串：

   ```js
   let templateImport = `var render, staticRenderFns`;
   if (descriptor.template) {
     // 构造 template 的 import 语句
   }
   let scriptImport = `var script = {}`;
   if (descriptor.script) {
     // 构造 script 的 import 语句
   }
   let stylesCode = ``;
   if (descriptor.styles.length) {
     // 构造 style 的 import 语句
   }
   let code =
     `
   ${templateImport}
   ${scriptImport}
   ${stylesCode}
   
   // normalizer 是重命名了原方法 normalizeComponent
   import normalizer from ${stringifyRequest(`!${componentNormalizerPath}`)}
   var component = normalizer(
     script,
     render,
     staticRenderFns,
     ${hasFunctional ? `true` : `false`},
     ${/injectStyles/.test(stylesCode) ? `injectStyles` : `null`},
     ${hasScoped ? JSON.stringify(id) : `null`},
     ${isServer ? JSON.stringify(hash(request)) : `null`}
     ${isShadow ? `,true` : ``}
   )
     `.trim() + `\n`;
   ```

   其中，`templateImport`、`scriptImport`、`stylesCode` 等构造好的 `template`、`script`、`style` 部分的导入 `import` 语句看起来会是这样：

   ```js
   import {
     render,
     staticRenderFns,
   } from "./App.vue?vue&type=template&id=7ba5bd90&scoped=true&";
   import script from "./App.vue?vue&type=script&lang=js&";
   // 兼容命名方式的导出
   export * from "./App.vue?vue&type=script&lang=js&";
   import style0 from "./App.vue?vue&type=style&index=0&id=7ba5bd90&scoped=true&lang=css&";
   ```

   template 和 style的导入 `import` 语句都有这么一个**共同的部分** `id=7ba5bd90&scoped=true`，这表示此时组件的 `template` 和 `style` 是需要 Scope CSS 的，并且 `scopeId` 为 `7ba5bd90`

   接着则会调用 `normalizer` 方法来对该组件进行正常化（Normalizer）处理：

   ```js
   import normalizer from "!../node_modules/vue-loader/lib/runtime/componentNormalizer.js";
   var component = normalizer(
     script,
     render,
     staticRenderFns,
     false,
     null,
     "7ba5bd90",
     null
   );
   export default component.exports;
   ```

   此时 `scopeId` 会作为参数传给 `normalizeComponent` 方法，而传给 `normalizeComponent` 的目的则是为了在**组件实例的 `options` 上**绑定 `scopeId`。那么，我们来看一下 `normalizeComponent` 方法（伪代码）：

   ```js
   function normalizeComponent (
     scriptExports,
     render,
     staticRenderFns,
     functionalTemplate,
     injectStyles,
     scopeId,
     moduleIdentifier, /* server only */
     shadowMode /* vue-cli only */
   ) {
     ...
     var options = typeof scriptExports === 'function'
       ? scriptExports.options
       : scriptExports
     // scopedId
     if (scopeId) {
       options._scopeId = 'data-v-' + scopeId
     }
     ...
   }
   ```

   可以看到，这里的 `options._scopeId` 会等于 `data-v-7ba5bd90`，而它的作用主要是用于在 `patch` 的时候，为当前组件的 HTML 标签添加名为 `data-v-7ba5bd90` 的属性。因此，这也是 **template 为什么会形成带有 `scopeId` 的真正所在**！

3. 对 `style` 的 CSS 代码进行编译转化，应用 ScopId 生成选择器的属性

   在构造完 Style 对应的导入语句后，由于此时 `import` 语句中的 `query` 包含 `vue`，则会被 vue-loader 内部的 Pitching Loader 处理。而 Pitching Loader 则会重写 `import` 语句，拼接上**内联（inline）的 Loader**，这看起来会是这样：

   ```js
   export * from '
   "-!../node_modules/vue-style-loader/index.js??ref--6-oneOf-1-0
   !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1
   !../node_modules/vue-loader/lib/loaders/stylePostLoader.js
   !../node_modules/postcss-loader/src/index.js??ref--6-oneOf-1-2
   !../node_modules/cache-loader/dist/cjs.js??ref--0-0
   !../node_modules/vue-loader/lib/index.js??vue-loader-options!./App.vue?vue&type=style&index=0&id=7ba5bd90&scoped=true&lang=css&"
   '
   ```

   然后，webpack 会解析出模块所需要的 Loader，显然这里会解析出 6 个 Loader：

   ```js
   [
     { loader: "vue-style-loader", options: "?ref--6-oneOf-1-0" },
     { loader: "css-loader", options: "?ref--6-oneOf-1-1" },
     { loader: "stylePostLoader", options: undefined },
     { loader: "postcss-loader", options: "?ref--6-oneOf-1-2" },
     { loader: "cache-loader", options: "?ref--0-0" },
     { loader: "vue-loader", options: "?vue-loader-options" }
   ]
   ```

   此时 webpack 则会执行这 6 个 Loader（当然还有解析模块本身）。并且，这里会忽略 webpack.config.js 中符合规则的 Normal Loader

   而对于 Scope CSS 而言，最核心的就是 stylePostLoader。

   ```js
   const { compileStyle } = require("@vue/component-compiler-utils");
   module.exports = function (source, inMap) {
     const query = qs.parse(this.resourceQuery.slice(1));
     const { code, map, errors } = compileStyle({
       source,
       filename: this.resourcePath,
       id: `data-v-${query.id}`,
       map: inMap,
       scoped: !!query.scoped,
       trim: true,
     });
   
     if (errors.length) {
       this.callback(errors[0]);
     } else {
       this.callback(null, code, map);
     }
   };
   ```

   从 stylePostLoader 的定义中，我们知道它是使用了 `@vue/component-compiler-utils` 提供的 `compileStyle` 方法来完成对组件 `style` 的编译。并且，此时会传入参数 `id` 为 `data-v-${query.id}`，即 `data-v-7ba5bd90`，而这也是 `style` 中声明的**选择器的属性为 `scopeId` 的关键点**！

   而在 `compileStyle` 函数内部，则是使用的我们所熟知 [postcss](https://postcss.org/api/) 来完成对 `style` 代码的编译和构造选择器的 `scopeId` 属性。

#### Patch 阶段应用 ScopeId 生成 HTML 的属性

应用 `_scopeId` 的过程是**发生在 Vue 运行时的框架代码中**

![img](https://camo.githubusercontent.com/d2a7def9f1e2ca6dd7e92c854fc28da8a653b1e5a2948fa237191f61def230bf/68747470733a2f2f70332d6a75656a696e2e62797465696d672e636f6d2f746f732d636e2d692d6b3375316662706663702f66646331306430306137306434653762386662646363663836626566643365617e74706c762d6b3375316662706663702d7a6f6f6d2d312e696d616765)

VNode 到真实 DOM 这个过程是由 `patch` 方法完成的。假设，此时我们是第一次渲染 DOM，这在 `patch` 方法中会命中 `isUndef(oldVnode)` 为 `true` 的逻辑：

```js
function patch (oldVnode, vnode, hydrating, removeOnly) {
  if (isUndef(oldVnode)) {
    // empty mount (likely as component), create new root element
    isInitialPatch = true
    createElm(vnode, insertedVnodeQueue)
  } 
}
```

因为第一次渲染 DOM，所以压根不存在什么 `oldVnode`,此时会执行 `createElm` 方法。而在 `createElm` 方法中则会创建 VNode 对应的真实 DOM，并且它还做了**一件很重要的事**，调用 `setScope` 方法应用 `_scopeId` 在 DOM 上生成 `data-v-xxx` 的属性！

```js
// packages/src/core/vdom/patch.js
function createElm(
  vnode,
  insertedVnodeQueue,
  parentElm,
  refElm,
  nested,
  ownerArray,
  index
) {
  ...
  setScope(vnode);
  ...
}
```

在 `setScope` 方法中则会使用组件实例的 `options._scopeId` 作为属性来添加到 DOM 上，从而生成了 `template` 中的 HTML 标签上名为 `data-v-xxx` 的属性。并且，这个过程会由 Vue 封装好的工具函数 `nodeOps.setStyleScope` 完成，它的本质是调用 DOM 对象的 `setAttribute` 方法：

```js
// src/platforms/web/runtime/node-ops.js
export function setStyleScope (node: Element, scopeId: string) {
  node.setAttribute(scopeId, '')
}
```

### 实现scoped css

```js
function scoper(css) {
      var id = generateID();
      var prefix = "#" + id;
      css = css.replace(/\/\*[\s\S]*?\*\//g, '');
      var re = new RegExp("([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)", "g");
      css = css.replace(re, function (g0, g1, g2) {
        if (g1.match(/^\s*(@media|@keyframes|to|from|@font-face)/)) {
          return g1 + g2;
        }
        if (g1.match(/:scope/)) {
          g1 = g1.replace(/([^\s]*):scope/, function (h0, h1) {
            if (h1 === "") {
              return "> *";
            } else {
              return "> " + h1;
            }
          });
        }
        g1 = g1.replace(/^(\s*)/, "$1" + prefix + " ");
        return g1 + g2;
      });
      addStyle(css, id + "-style");
      return id;
    }

// 生成对应的ID
function generateID() {
  var id = ("scoped" + Math.random()).replace("0.", "");
  // 如果当前元素中还可以找到id，递归
  if (document.getElementById(id)) {
    return generateID();
  } else {
    return id;
  }
}

// 判断当前是否是IE环境
var isIE = (function () {
  var undef,
    v = 3,
    div = document.createElement('div'),
    all = div.getElementsByTagName('i');
  while (
    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
    all[0]
  );
  return v > 4 ? v : undef;
}());

// 添加样式
function addStyle(cssText, id) {
  var d = document,
    someThingStyles = d.createElement('style');
  d.getElementsByTagName('head')[0].appendChild(someThingStyles);
  someThingStyles.setAttribute('type', 'text/css');
  someThingStyles.setAttribute('id', id);
  if (isIE) {
    someThingStyles.styleSheet.cssText = cssText;
  } else {
    someThingStyles.textContent = cssText;
  }
}

window.scoper = scoper;

var id = scoper("h1 {\
           color:red;\
        /*color: #0079ff;*/\
            }\
    \
            /*  h2 {\
            color:green\
            }*/");
console.log(id);
```

### 为什么要有scoped css？

#### 规范

**什么是Scoped CSS规范？**

Scoped CSS规范是Web组件产生不污染其他组件，也不被其他组件污染的CSS规范。

#### scope css 的副作用有哪些？

- 难以保证不污染第三方组件


### 参考资料

https://github.com/AlloyTeam/PhyTouch/wiki/Scoped-CSS

https://una.im/local-css-vars/#%F0%9F%92%81

https://github.com/WJCHumble/Blog/issues/23

https://github.com/WJCHumble/Blog/issues/25
