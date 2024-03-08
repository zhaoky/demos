# 预渲染 demo

采用[官方推荐](https://ssr.vuejs.org/zh/#%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%B8%B2%E6%9F%93-vs-%E9%A2%84%E6%B8%B2%E6%9F%93-ssr-vs-prerendering)的插件：`prerender-spa-plugin`

构建阶段生成匹配预渲染路径的 `html` 文件（注意：每个需要预渲染的路由都有一个对应的 `html`）。构建出来的 `html` 文件已有部分内容。

## 安装方法

```bash
yarn add prerender-spa-plugin -D
```

网络不好则执行：

```bash
yarn add prerender-spa-plugin -D --ignore-scripts
```

然后去下载对应要求的 `chromium` 版本，放在 `node_modules/puppeteer/.local-chromium/mac-686378/chrome-mac` 文件夹下，其中 `mac-686378` 数字为对应版本号。

## 预渲染好处

- 再 webpack 构建的最后，使用无界面浏览器如 puppeteer 访问对应的路径，使用默认的 defaultState 生成 HTML，并保存到对应的目录。访问的时候优先访问有静态 HTML 的页面。
- 预渲染不适合数据频繁变化的页面
- 只是减少白屏时间，并不会减少首屏时间
- 因为不需要等数据回来，所以白屏性能可能比服务端渲染好

## 原理

`prerender-spa-plugin` 利用了 `Puppeteer` 的爬取页面的功能。

`Puppeteer` 是一个 `Chrome` 官方出品的 `headlessChromenode` 库。它提供了一系列的 `API`, 可以在无 `UI` 的情况下调用 `Chrome` 的功能, 适用于爬虫、自动化处理等各种场景。

它很强大，所以很简单就能将运行时的 `HTML` 打包到文件中。

原理是在 `Webpack` 构建阶段的最后，在本地启动一个 `Puppeteer` 的服务，访问配置了预渲染的路由，然后将 `Puppeteer` 中渲染的页面输出到 `HTML` 文件中，并建立路由对应的目录。

## 如何使用

根据原理，他会得到渲染后的 `html` 代码输出到 `html` 文件的对应位置，适合静态无交互，无事件的页面。

如果需要他被客户端 `js` 接管，即执行 `js`，则需要配合 `vue-router` 且 `mode` 设为 `history`，并相应的调整服务器配置。
