EsBuild在Vite中的应用
Vite简介
Vite 是一款开箱即用的集成了开发服务器和打包工具的前端构建工具。

相较于传统的打包构建工具（如 Webpack）先打包构建再启动开发服务器，Vite 巧妙地利用了浏览器对 ESM 的支持，先启动开发服务器（首次启动时会执行依赖预构建，之后会介绍），当代码执行到模块加载时再请求对应模块的文件（注：对 ESM 模块的请求存在跨域问题）。



基于打包器的开发服务器基于 ESM 的开发服务器

webpack 会先打包，然后启动开发服务器，请求服务器时直接给予打包结果。而 vite 是直接启动开发服务器，请求哪个模块再对该模块进行实时编译。

由于现代浏览器本身就支持 ES Module，会自动向依赖的 Module 发出请求。vite 充分利用这一点，将开发环境下的模块文件，就作为浏览器要执行的文件，而不是像 webpack 那样进行打包合并。

由于 vite 在启动的时候不需要打包，也就意味着不需要分析模块的依赖、不需要编译，因此启动速度非常快。当浏览器请求某个模块时，再根据需要对模块内容进行编译。这种按需动态编译的方式，极大的缩减了编译时间，项目越复杂、模块越多，vite 的优势越明显。

在 HMR（热更新）方面，当改动了一个模块后，仅需让浏览器重新请求该模块即可，不像 webpack 那样需要把该模块的相关依赖模块全部编译一次，效率更高。

当需要打包到生产环境时，vite 使用传统的 rollup（也可以自己手动安装 webpack 来）进行打包。因此，vite 的主要优势在开发阶段。另外，由于 vite 利用的是 ES Module，因此在代码中（除了 vite.config.js 里面，这里是 node 的执行环境）不可以使用 CommonJS。

Vite 也是利用浏览器原生的 ESM 去解析 imports，然后向 devServer 请求模块，在服务器端使用 esbuild 对模块进行即时编译后返回(主要是转换.jsx,.tsx,.vue,.less等浏览器无法处理的文件，而不是编译为 ES5 兼容老旧浏览器）。

依赖预编译
依赖预构建（Dependency Pre-Bundling）。指的是 Vite 会在 DevServer 启动前对需要预构建的依赖进行构建，然后在分析模块的导入（import）时会动态地应用构建过的依赖。

那么，今天本文将会围绕以下 3 点来和大家一起从疑问点出发，深入浅出一番 Vite 的依赖预构建过程：

什么是依赖预构建

依赖预构建的作用

依赖预构建的实现（源码分析）

一、什么是依赖预构建
当你在项目中引用了 vue 和 lodash-es，那么你在启动 Vite 的时候，你会在终端看到这样的输出内容：

技术圈子 > ESBuild在Vite依赖预构建原理 > image2021-8-25_16-15-55.png

而这表示 Vite 将你在项目中引入的 vue 和 lodash-es 进行了依赖预构建：

默认情况下，Vite 会将 package.json 中生产依赖 dependencies 的部分启用依赖预构建，即会先对该依赖进行构建，然后将构建后的文件缓存在内存中（node_modules/.vite 文件下），在启动 DevServer 时直接请求该缓存内容。

在 vite.config.js 文件中配置 optimizeDeps 选项可以选择需要或不需要进行预构建的依赖的名称，Vite 则会根据该选项来确定是否对该依赖进行预构建。

在启动时添加 --force options，可以用来强制重新进行依赖预构建。



那么，下面我们就来了解一下依赖预构建的作用是什么，即优化的意义

二、依赖预构建的作用
1. 兼容 CommonJS 和 AMD 模块的依赖

因为 Vite 的 DevServer 是基于浏览器的 Natvie ES Module 实现的，所以对于使用的依赖如果是 CommonJS 或 AMD 的模块，则需要进行模块类型的转化（ES Module）。

2. 减少模块间依赖引用导致过多的请求次数

通常我们引入的一些依赖，它自己又会一些其他依赖。官方文档中举了一个很经典的例子，当我们在项目中使用 lodash-es 的时候：

import { debounce } from "lodash-es"
lodash 请求依赖链路

如果在没用依赖预构建的情况下，我们打开页面的 Dev Tool 的 Network 面板：

技术圈子 > ESBuild在Vite依赖预构建原理 > image2021-8-25_16-9-30.png

可以看到此时大概有 600+ 和 lodash-es 相关的请求，并且所有请求加载花了 3.43 s，似乎还好？现在，我们来看一下使用依赖预构建的情况：

技术圈子 > ESBuild在Vite依赖预构建原理 > image2021-8-25_16-8-50.png

此时，只有 1 个和 lodash-es 相关的请求（经过预构建），并且所有请求加载才花了 338 ms，缩短了足足 10 倍多的时间！ 而这里节省的时间，就是我们常说的冷启动时间。

那么，到这里我们就已经了解了 Vite 依赖预构建概念和作用。下面，我们就深入 Vite 源码来更进一步地认识依赖预构建过程！

三、依赖预构建的实现
在 Vite 源码中，默认的依赖预构建过程会在 DevServer 开启之前进行。这里，我们仍然以在项目中引入了 vue 和 lodash-es 依赖为例。

需要注意的是以下和源码相关的函数都是取的核心逻辑讲解（伪代码）。

3.1 Dev Server 启动前
首先，Vite 会创建一个 DevServer，也就是我们平常使用的本地开发服务器，这个过程是由 createServer 函数完成：

// packages/vite/src/node/server/index.ts
async function createServer( inlineConfig: InlineConfig = {} ): Promise<ViteDevServer> {
  ...
  // 通常情况下我们会命中这个逻辑
  if (!middlewareMode && httpServer) {
    // 重写 DevServer 的 listen，保证在 DevServer 启动前进行依赖预构建
    const listen = httpServer.listen.bind(httpServer)
    httpServer.listen = (async (port: number, ...args: any[]) => {
      try {
        ...
        // 依赖预构建相关
        await runOptimize()
      } 
      ...
    }) as any
    ...
  } else {
    await runOptimize()
  }
  ...
}
可以看到在 DevServer 真正启动之前，它会先调用 runOptimize 函数，进行依赖预构建相关的处理。

runOptimize 函数：
// packages/vite/src/node/server/index.ts
const runOptimize = async () => {
  // config.optimzizeCacheDir 指的是 node_modules/.vite
  if (config.optimizeCacheDir) {
    ..
    try {
      server._optimizeDepsMetadata = await optimizeDeps(config)
    }
    ..
    server._registerMissingImport = createMissingImpoterRegisterFn(server)
  }
}
runOptimize 函数负责的是调用和注册处理依赖预构建相关的 optimizeDeps 函数，具体来说会是两件事：

1. 进行依赖预构建

optimizeDeps 函数是 Vite 实现依赖预构建的核心函数，它会根据配置 vite.config.js 的 optimizeDeps 选项和 package.json 的 dependencies 的参数进行第一次预构建。它会返回解析 node_moduels/.vite/_metadata.json 文件后生成的对象（包含预构建后的依赖所在的文件位置、原文件所处的文件位置等）。

之所以要进行重写的缘由是因为 CommonJS 的模块并不支持命名方式的导出。所以，如果不经过插件的转化，则会看到这样的异常：

2. 注册依赖预构建相关函数

调用 createMissingImpoterRegisterFn 函数，它会返回一个函数，其仍然内部会调用 optimizeDeps 函数进行预构建，只是不同于第一次预构建过程，此时会传人一个 newDeps，即新的需要进行预构建的依赖。

那么，显然无论是第一次预构建，还是后续的预构建，它们两者的实现都是调用的 optimizeDeps 函数。所以，下面我们来看一下 optimizeDeps 函数～

3.2 预构建实现核心 optimizeDeps 函数
optimizeDeps 函数被定义在 packages/vite/node/optimizer/index.ts 中，它负责对依赖进行预构建过程：

// packages/vite/node/optimizer/index.ts
export async function optimizeDeps( config: ResolvedConfig, force = config.server.force, asCommand = false, newDeps?: Record<string, string> ): Promise<DepOptimizationMetadata | null> {
...
}
由于 optimizeDeps 内部逻辑较为繁多，这里我们拆分为 5 个步骤讲解：

1. 读取该依赖此时的文件信息

既然是构建依赖，很显然的是每次构建都需要知道此时文件内容对应的 Hash 值，以便于依赖发生变化时可以重新进行依赖构建，从而应用最新的依赖内容。

所以，这里会先调用 getDepHash 函数获取依赖的 Hash 值：

// 获取该文件此时的 hash
const mainHash = getDepHash(root, config)
const data: DepOptimizationMetadata = {
  hash: mainHash,
  browserHash: mainHash,
  optimized: {}
}
而对于 data 中的这三个属性，我们在上面已经介绍过了，这里就不重复论述了～

2. 对比缓存文件的 Hash

前面，我们也提及了如果启动 Vite 时使用了 --force Option，则会强制重新进行依赖预构建。所以，当不是 --force 场景时，则会进行比较新旧依赖的 Hash 值的过程：

// 默认为 false
if (!force) {
  let prevData
  try {
    // 获取到此时缓存（本地磁盘）中构建的文件信息
    prevData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  } catch (e) {}
  // 对比此时的 
  if (prevData && prevData.hash === data.hash) {
    log('Hash is consistent. Skipping. Use --force to override.')
    return prevData
  }
}

可以看到如果新旧依赖的 Hash 值相等的时候，则会直接返回旧的依赖内容。

3. 缓存失效或未缓存

如果上面的 Hash 不等，则表示缓存失效，所以会删除 cacheDir 文件夹，又或者此时未进行缓存，即第一次依赖预构建逻辑（ cacheDir 文件夹不存在），则创建 cacheDir 文件夹：

 if (fs.existsSync(cacheDir)) {
    emptyDir(cacheDir)
  } else {
    fs.mkdirSync(cacheDir, { recursive: true })
  }
需要注意的是，这里的 cacheDir 则指的是 node_modules/.vite 文件夹

前面在讲 DevServer 启动时，我们提及预构建过程会分为两种：第一次预构建和后续的预构建。两者的区别在于后者会传入一个 newDeps，它表示新的需要进行预构建的依赖：

let deps: Record<string, string>, missing: Record<string, string>
if (!newDeps) {
  ;({ deps, missing } = await scanImports(config))
} else {
  // 存在 newDeps 的时候，直接将 newDeps 赋值给 deps
  deps = newDeps
  missing = {}
}

并且，这里可以看到对于前者，第一次预构建，则会调用 scanImports 函数来找出和预构建相关的依赖 deps，deps 会是一个对象：

{
  lodash-es:'/Users/wjc/Documents/FE/demos/vite2.0-demo/node_modules/lodash-es/lodash.js'
  vue:'/Users/wjc/Documents/FE/demos/vite2.0-demo/node_modules/vue/dist/vue.runtime.esm-bundler.js'
}

而 missing 则表示在 node_modules 中没找到的依赖。所以，当 missing 存在时，你会看到这样的提示：导入了依赖但是没有使用

那么，回到上面对于后者（newDeps 存在时）的逻辑则较为简单，会直接给 deps 赋值为 newDeps，并且不需要处理 missing。因为，newDeps 只有在后续导入并安装了新的 dependencies 依赖，才会传入的，此时是不存在 missing 的依赖的（ Vite 内置的 importAnalysisPlugin 插件会提前过滤掉这些）。

4. 处理 optimizeDeps.include 相关依赖

在前面，我们也提及了需要进行构建的依赖也会由 vite.config.js 的 optimizeDeps 选项决定。所以，在处理完 dependencies 之后，接着需要处理 optimizeDeps。

此时，会遍历前面从 dependencies 获取到的 deps，判断 optimizeDeps.iclude（数组）所指定的依赖是否存在，不存在则会抛出异常：

const include = config.optimizeDeps?.include
  if (include) {
    const resolve = config.createResolver({ asSrc: false })
    for (const id of include) {
      if (!deps[id]) {
        const entry = await resolve(id)
        if (entry) {
          deps[id] = entry
        } else {
          throw new Error(
            `Failed to resolve force included dependency: ${chalk.cyan(id)}`
          )
        }
      }
    }
  }

5. 使用 esbuild 构建依赖

那么，在做好上述和预构建依赖相关的处理（文件 hash 生成、预构建依赖确定等）后。则进入依赖预构建的最后一步，使用 esbuild 来对相应的依赖进行构建：

  ...
  const esbuildService = await ensureService()
  await esbuildService.build({
    entryPoints: Object.keys(flatIdDeps),
    bundle: true,
    format: 'esm',
    ...
  })
  ...
ensureService 函数是 Vite 内部封装的 util，它的本质是创建一个 esbuild 的 service，使用 service.build 函数来完成构建过程。

此时，传入的 flatIdDeps 参数是一个对象，它是由上面提及的 deps 收集好的依赖创建的，它的作用是为 esbuild 进行构建的时候提供多路口（entry），flatIdDeps 对象：

{
  lodash-es:'/Users/wjc/Documents/FE/demos/vite2.0-demo/node_modules/lodash-es/lodash.js'
  moment:'/Users/wjc/Documents/FE/demos/vite2.0-demo/node_modules/moment/dist/moment.js'
  vue:'/Users/wjc/Documents/FE/demos/vite2.0-demo/node_modules/vue/dist/vue.runtime.esm-bundler.js'
}
到此我们已经分析完了整个依赖预构建的实现 

那么，接下来在 DevServer 启动后，当模块需要请求经过预构建的依赖的时候，Vite 内部的 resolvePlugin 插件会解析该依赖是否存在 seen 中（seen 中会存储构建过的依赖映射），直接应用 node_modules/.vite 目录下对应的构建后的依赖，避免直接去请求构建前的依赖的情况出现，从而缩短冷启动的时间。



参考文档：

https://github.com/lgwebdream/FE-Interview/issues/1180

https://zhuanlan.zhihu.com/p/352403391
