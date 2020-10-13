## HMR 源码大致流程

- `WDS（Webpack-dev-server） HMR（Hot Module Replacement）`
- (`webpack-dev-server/bin/webpack-dev-server.js`) 启动 `webpack`，生成 `compiler` 实例及 `Sever` 实例
- (`webpack-dev-server/lib/Server.js`) 在实例化 Sever 里，执行：

  - `updateCompiler`
    - entry 增加两个入口：
      - `xxx/node_modules/webpack-dev-server/client/index.js?http://localhost:8080` (websocket 客户端代码)
        - `ok hash...`
        - `socket(socketUrl, onSocketMessage)` 建立客户端 `websocket` 连接
      - `xxx/node_modules/webpack/hot/dev-server.js` （热更新代码）
        - 监听 `webpackHotUpdate` 事件，在 `websocket` 发出 `ok` 时被触发，然后执行 `module.hot.check`。
    - 判定有 `hot` 参数时添加插件 `HotModuleReplacementPlugin` 并执行
  - `setupHooks`：监听每次 `webpack` 编译完成
  - `setupApp`： 设置 `express` 服务器
  - `setupDevMiddleware`： 设置 `webpack-dev-middleware`
    - `compiler.watch`
      - 首先对本地文件代码进行编译打包，也就是 `webpack` 的一系列编译流程
      - 其次编译结束后，开启对本地文件的监听，当文件发生变化，重新编译，编译完成之后继续监听。
    - `setFs(context, compiler)` 将编译后的文件打包到内存
  - `createServer`：启动本地 `server` 服务
  - `createSocketServer`： 启动服务端 `websocket` 服务

## HotModuleReplacementPlugin

- 会加入很多运行时代码，用于执行热更新，`moudle` 新增了一个属性为 `hot`。
- 在钩子 `compilation.hooks.additionalChunkAssets` 里 生成热更新对应的 `js` 和 `json` 资源文件

## 更新代码时

- 在编译完成后，执行 `setupHooks` 回调调用 `_sendStats` 方法通过 `websocket` 给浏览器发送通知: `ok 和 hash`，在浏览器端接受到这个通知后，执行热更新代码，通过 `hotDownloadUpdateChunk` 、`hotDownloadManifest` 方法 `jsonp` 拉取对应的文件 `json，js`
  - `.json` `h` 代表本次新生成的 `Hash` 值，用于下次文件热更新请求的前缀。`c` 表示当前要热更新的文件对应的是 `index` 模块。
  - `.js` 本次修改的代码，重新编译打包后的
- 下载完成后，执行 `hotApply` 开始热更新
  - 删除过期的模块，就是需要替换的模块
  - 将新的模块添加到 `modules` 中
  - 通过 `__webpack_require__` 执行相关模块的代码
