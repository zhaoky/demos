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

## vue-ssr
