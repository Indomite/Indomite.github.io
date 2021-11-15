ESBuild
一.构建速度
image.png 

性能为何如此优越？

1.它是用Go语言编写的，编译成可执行代码

JavaScript基于解释器的node环境才能执行，当webpack等工具解释完本身的代码后，时间就相应的上去了
Go的核心设计是并行的，而JavaScript不是。
Go有线程之间的共享内存，而JavaScript则必须在线程之间进行数据序列化。
Go和JavaScript都有并行的垃圾收集器，但Go的堆是在所有线程之间共享的，而JavaScript的每个线程都有一个独立的堆。
2. 并行被大量使用

大致有三个阶段：解析、连接、代码生成。解析和代码生成是大部分的工作，并且是可并行的。
由于所有线程都共享内存，大多数现代计算机都有很多内核，所以并行化是一个很大的性能提升。
3.esbuild中的所有内容都是从头开始编写的

自己编写可以从一开始就考虑到性能问题，以确保所有的东西都使用一致的数据结构，避免昂贵的转换，而且在必要时可进行广泛的架构变更。
二.加载器(loader)
esbuild加载器的作用与webpack中loader作用类似，都是对于某种类型的文件进行编译

1.js-loader
默认用于.js、.cjs和.mjs文件。.cjs扩展名被node用于CommonJS模块，而.mjs扩展名被node用于ECMAScript模块，尽管esbuild并没有对这两者进行区分。

esbuild支持所有现代JavaScript语法。

2. ts-loader 或 tsx-loader
这个加载器对于.ts和.tsx文件是默认启用的，这意味着esbuild内置了对TypeScript语法的解析和丢弃类型注释的支持。esbuild不进行类型检查，所以需要在esbuild中并行运行tsc -noEmit来检查类型。 需要注意的是，esbuild在编译时不会进行类型检查，这应该在编译之前使用ide去检查

3. jsx-loader
把xml代码转换成js代码

4. json-loader
对于.json文件，这个加载器是默认启用的。它在构建时将JSON文件解析成一个JavaScript对象，并将该对象作为默认导出。

5. css-loader
对于.css文件，这个加载器是默认启用的。它以CSS语法的形式加载文件。CSS在esbuild中是一种第一类内容类型，这意味着esbuild可以直接编译CSS文件，而不需要从JavaScript代码中导入你的CSS。

你可以@导入其他CSS文件，用url()引用图片和字体文件，esbuild会把所有东西编译在一起。注意：图像和字体文件需要配置一个加载器，因为esbuild没有任何预配置。通常这是一个数据URL加载器或外部文件加载器。

请注意，esbuild还不支持CSS Module。

6. text-loader
对于.txt文件，这个加载器是默认启用的。它在构建时将文件加载为字符串，并将字符串导出为默认导出。使用它看起来像这样。

7. binary-loader
在构建时以二进制缓冲区的形式加载文件，并使用Base64编码将其嵌入到包中。文件的原始字节在运行时被从Base64解码，并使用默认的导出方式导出为Uint8Array。

8. Base64-loader
在构建时以二进制缓冲区的形式加载文件，并使用Base64编码将其嵌入到编译中的字符串。这个字符串将使用默认的导出方式导出。

9. dataurl-loader
在构建时作为二进制缓冲区加载文件，并将其作为Base64编码的数据URL嵌入到编译中。这个字符串是用默认的导出方式导出的。

10. file-loader
将文件复制到输出目录，并将文件名作为一个字符串嵌入到编译中。这个字符串是使用默认的导出方式导出的。

三.api 调用
为了更加方便的使用，esbuild提供了api调用的方式，在调用api时传入option进行相应功能的设置。

在esbuild的API中，有两个主要的API调用方式：transform和build。两者的区别在于是否最终生成文件。

1.Transform API
Transform API调用对单个字符串进行操作，不需要访问文件系统。非常适合在没有文件系统的环境中使用或作为另一个工具链的一部分。下面是个简单例子：

require('esbuild').transformSync('let x: number = 1', {
  loader: 'ts',
})
=>
{
  code: 'let x = 1;\n',
  map: '',
  warnings: []
}
2.Build API
Build API调用对文件系统中的一个或多个文件进行操作。这使得文件可以相互引用，并被编译在一起。下面是个简单例子：

require('fs').writeFileSync('in.ts', 'let x: number = 1')
require('esbuild').buildSync({
  entryPoints: ['in.ts'],
  outfile: 'out.js',
})
四.插件API
1.简介
插件API属于上面提到的API调用的一部分，插件API允许你将代码注入到构建过程的各个部分。与API的其他部分不同，它不能从命令行中获得。你必须编写JavaScript或Go代码来使用插件API。

插件API只能用于Build API，不能用于Transform API

2.写插件
一个esbuild插件是一个包含name和setup函数的对象。它们以数组的形式传递给构建API调用。setup函数在每次BUILD API调用时都会运行一次。 

import fs from 'fs'

export default {
  name: "env",
  setup(build) {
    build.onLoad({ filter: /\.tsx$/ }, async (args) => {
      const source = await fs.promises.readFile(args.path, "utf8");
      const contents = source.toString();
      console.log('文件内容:',contents)
      return {
        contents: contents,
        loader: "tsx",
      };
    });
  },
};

2.1 name
name通用代表这个插件的名称

2.2 setup函数
2.2.1. Namespace
每个模块都有一个相关的命名空间。默认情况下，esbuild在文件命名空间中操作，它对应于文件系统中的文件。但是esbuild也可以处理那些在文件系统上没有对应位置的 "虚拟 "模块。虚拟模块通常使用文件以外的命名空间来区分它们和文件系统模块。

2.2.2.Filters
每个回调都必须提供一个正则表达式作为过滤器。当路径与过滤器不匹配时，esbuild会跳过调用回调，这样做是为了提高性能。从esbuild的高度并行的内部调用到单线程的JavaScript代码是很昂贵的，为了获得最大的速度，应该尽可能地避免。

你应该尽量使用过滤器正则表达式，而不是使用JavaScript代码进行过滤。这样做更快，因为正则表达式是在esbuild内部评估的，根本不需要调用JavaScript。

2.2.3.Resolve callbacks
一个使用onResolve添加的回调将在esbuild构建的每个模块的每个导入路径上运行。这个回调可以定制esbuild如何进行路径解析。

2.2.4. Load callbacks
一个使用onLoad添加的回调可以对文件内容进行处理并返回。

3.插件的使用限制
插件API并不打算涵盖所有的用例。它不可能关联编译过程的每个部分。例如，目前不可能直接修改AST。这个限制的存在是为了保持esbuild出色的性能特征，同时也是为了避免暴露出太多的API表面，这将是一个维护的负担，并且会阻止涉及改变AST的改进。

一种考虑esbuild的方式是作为网络的 "链接器"。就像本地代码的链接器一样，esbuild的工作是接收一组文件，解析并绑定它们之间的引用，并生成一个包含所有代码链接的单一文件。一个插件的工作是生成最终被链接的单个文件。

esbuild中的插件最好是在相对范围内工作，并且只定制构建的一个小方面。例如，一个自定义格式（如YAML）的特殊配置文件的插件是非常合适的。你使用的插件越多，你的构建速度就越慢，尤其是当你的插件是用JavaScript编写的时候。如果一个插件适用于你构建中的每一个文件，那么你的构建很可能会非常慢。如果缓存适用，必须由插件本身来完成。
