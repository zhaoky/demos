# 微前端

## 什么是微前端

微前端是一种类似于微服务的架构，它将微服务的理念应用于浏览器端，即将 `Web` 应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。各个前端应用还可以独立运行、独立开发、独立部署。

## 微前端框架 single-spa

- [官方链接](https://zh-hans.single-spa.js.org/)
- [官方 demo](https://github.com/joeldenning/coexisting-vue-microfrontends)

`single-spa` 是一个在前端应用程序中将多个**不同框架** `javascript` 应用集合在一起的框架。

同一框架可以直接用该框架对应的 `router` 进行微前端实践，无需 `single-spa`。

参考链接：

- [基于 Vue 技术栈的微前端方案实践](https://juejin.im/post/5e5c9bff51882548fe291950)
- [微前端在美团外卖的实践 React](https://juejin.im/post/5e57b6f0f265da57547794c9)

### 组成部分

- 加载器：也就是微前端架构的核心，即 `single-spa`（本 `demo` 下的 `root-html-file/index.html`）
- 包装器：有了加载器，我们要把现有的 `vue` 项目包装一下，使得加载器可以使用它们
- 主项目：一般是包含所有项目公共部分的项目（本 `demo` 下的 `navbar` 项目）
- 子项目：众多展示在主项目内容区的项目（本 `demo` 下的 `app1,app2` 项目）

流程：用户访问 `index.html` 后，浏览器运行加载器的 `js` 文件，加载器去配置文件，然后注册配置文件中配置的各个子应用后，首先加载主应用(菜单等)，再通过路由判定，动态远程加载子应用。

### 相关知识

- `SystemJs`

`SystemJS` 提供通用的模块导入途径，支持传统模块和 `ES6` 的模块。

### demo 跑起来

1. `make install`
2. `cd` 到 `root-html-file,navbar,app1,app2` 文件夹下，分别执行: `npm run serve`
3. 打开 `root-html-file` 下提示的地址。

### 相关改造

- 创建主加载器即入口 `html`，通过 `singleSpa.registerApplication` 注册各应用
- 使用包装器 `single-spa-vue` 包装子应用，使用 `systemjs-webpack-interop` 设置静态资源目录。
- `css` 用 `scope` 隔离。

### 如何通信

应该尽力避免通信将应用程序耦合在一起！而且这个从业务逻辑上也不应该会有通信。

但主项目和子项目应该会有通信，方法可通过：

- `API` 请求，即服务器保存状态。
- `customEvent`
- `window,cookie,localstorage` 等
- 上层方法 `redux，eventBus` 等等。

## 参考链接

- [微前端的那些事儿](https://microfrontends.cn/)
- [每日优鲜供应链前端团队微前端改造](https://juejin.im/post/5d7f702ce51d4561f777e258)
- [single-spa 上层封装 qiankun](https://github.com/umijs/qiankun)
- [可能是你见过最完善的微前端解决方案](https://zhuanlan.zhihu.com/p/78362028)
