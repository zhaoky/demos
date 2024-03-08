# vue-ssr-demo

## koa2

粗略看了下源码，行一些记录。

### koa

- `application.js`

  - `use` 方法向 `koa` 实例的 `middleware` 数组 `push` 函数，所有的中间件函数都存于此。
  - `listen` 方法里传入 `callback` 参数创建一个 `http` 服务并监听端口。
  - `callback`
    - 调用 `compose（koa-compose）` 递归顺序处理各中间件--洋葱模型。
    - 返回一个有 `req` 和 `res` 参数的函数，在 `listen` 回调里执行该函数，通过 `http` 模块返回的 `req、res` 创建上下文 `createContext`，将 `req、res` 都挂载到 `ctx` 下，然后执行 `handleRequest`。
  - `handleRequest` 里进行错误处理、完成后回调及执行洋葱模型。
  - `respond` 主要是通过 `node http` 模块中的响应对象中的 `end` 方法与 `koa context` 对象中代理的属性进行最终响应对象的设置。
  - `onerror` 监听的是整个对象的 `error` 事件

- `context.js`

  - 创建网络请求的上下文对象。`koa` 通过创建 `context` 将 `node` 原生的 `req` 和 `res` 对象都集中到了一起，即为 `ctx`。
  - 通过 `delegates` 将 `request、response` 对象上的属性方法代理到 `context` 对象上。

- `request.js/response.js`

  对原生的 `http` 模块的返回的 `request、response` 的一些方法属性进行封装后，挂载到 `ctx.request、ctx.response` 的原型上。

### koa-compose

洋葱模型处理中心，在 `application` 的 `callback` 方法里被调用。调用时内部先执行一次 `dispatch(0)`，则会执行 `fn(context, dispatch.bind(null, i + 1))` 即第一个中间件函数，并且把下一个 `dispatch` 作为 `next` 参数传入，当中间件里执行 `next` 时则会去执行第二个中间件函数。依次类推，最后各 `dispatch` 返回 `Promise` 对象。

### koa 总结

- `koa` 是一个很轻量级的 `node.js` 基础框架
- 核心是中间件，框架只提供了基础的功能，而 `cookie,router` 等都是由中间件去完成，高扩展性
- 不太适合大型项目，企业级的 `node.js` 开发使用二次封装框架比如 `egg.js，thinkjs`。
- [Koa Callback 新手不完全指南](https://zhuanlan.zhihu.com/p/67491524)

## vue-ssr

`vue-ssr` 是一个服务端渲染的解决方案，涉及到的技术比较多，包括 `nodejs（koa），vue，vue-router，vuex`，非常具有综合性，值得学习。

### 为什么需要 ssr

- `SEO`
- 首屏加载

### 为什么不需要 ssr

- 开发复杂（同构）
- 部署复杂（多了服务器部署）
- 服务器压力增大

### ssr 原理

默认情况下，可以在浏览器中输出 `Vue` 组件，进行生成 `DOM` 和操作 `DOM`。然而，也可以将同一个组件渲染为服务器端的 `HTML` 字符串，将它们直接发送到浏览器，最后将这些静态标记 "`激活`" 为客户端上完全可交互的应用程序。

服务器渲染的 `Vue.js` 应用程序也可以被认为是 "同构" 或 "通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行。

注意与 **预渲染** 的区别，见 [prerender-spa-demo](https://github.com/zhaoky/demos/tree/master/prerender-spa-demo)

### 项目要点

#### bundle

源码打包编译成 2 份（`Server bundle` 和 `Client bundle`），两个 `webpack` 文件。

- `Server bundle` 运行在后台 `Node` 服务器上。通过该代码渲染成成品 `html`，然后返回给浏览器。这个 `html` 里必然有一个 `<script src="client bundle">` 的加载语句。
- 浏览器加载服务器返回的 `HTML`，执行 `Client bundle` 通过 `Hydrate`（只处理事件等属性，不涉及 `dom` 的调整）后掌管页面（通过判断根 `ID` 的属性 `data-server-rendered` 为 `true`），即客户端激活。

#### 避免状态单例

`vue，vue-router，vuex` 都需要暴露工厂函数，为每个请求创建不同的实例。

#### 生命周期

在服务器端，只会经历 `beforeCreate` 和 `created` 两个生命周期。然后通过 `vue-server-renderer` 包里的 `renderToString->render->renderNode` 将 `template->vnode` 编译得到的字符串 `html`。

#### 服务端数据预取（首屏）

- 用户通过浏览器访问 SSR 网站时，服务端的 `server-bundle` 里的 `vue-router` 会根据用户的 `url` 导航到相应页面，调用页面的静态方法 `asyncData` 读取数据，存入 `Vuex` `store` 里并渲染到 `html`。
- 在存入 `Vuex store` 的同时，也将其数据存入 `context`，在 `renderer.renderToString(renderStringNode$1)` 里会将 `context.state` 序列化后注入到 `window.__INITIAL_STATE__`（通过 `html` 里添加 `script` 标签）
- 浏览器执行 `client-bundle`，会将`window.__INITIAL_STATE__`存入 `Vue store` 后，进行客户端的 `hydrate`.

#### 客户端数据预取（非首屏）

两种方法：

- 在路由导航之前（`router.beforeResolve`）解析数据（调用 `asyncData`），只处理非首屏加载的组件的数据读取，待所有数据都请求完成后，再跳到页面。
- 匹配要渲染的视图后，再获取数据，将处理逻辑放在视图 `beforeMount` 里。此方法应用程序具有更快的响应速度。然而，传入视图在渲染时不会有完整的可用数据。

#### 缓存

- 页面级别缓存
- 组件级别缓存

### 最佳实践

[nuxtjs](https://www.nuxtjs.cn/)
