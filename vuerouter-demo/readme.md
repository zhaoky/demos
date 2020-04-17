# vue-router

粗略看了下源码，行一些记录。

1. 通过 `Vue.use(VueRouter)` 安装插件 `VueRouter`，会通过 `Vue.mixin` 扩展 `beforeCreate，destroyed` 钩子，并监听 `Vue.prototype` 上的 `$router，$route`，注册全局钩子 `RouterView，RouterLink`。
2. 实例化 `VueRouter` 里，根据 `mode` 不同实例化不同的 `history：HTML5History，HashHistory，AbstractHistory`，三者均继承于 `History`，其中如果是 `HashHistory`，如果路径没有 `#` 则调用 `ensureSlash` 添加上。
3. 执行 `vue` 的构建流程：
   1. `beforeCreate` 里对 `VueRouter` 实例执行 `init` 初始化，执行不同的 `history.transitionTo` 后，执行 `history.listen` 注册路由变化回调，并监听 `Vue` 实例上的 `_route`。
   2. `transitionTo` 里得到需要跳转的 `route` 对象后，执行 `confirmTransition` 里通过双 `queue` 任务调度队列，先后执行了：`beforeRouteLeave->beforeEach->beforeRouteUpdate->beforeEnter，beforeRouteEnter->beforeResolve` 钩子。
   3. 然后执行 `confirmTransition` 的回调里执行 `history.updateRoute` 执行路由变化回调触发 `_route` 重新渲染视图后，执行 `afterEach` 钩子。
   4. 然后执行 `transitionTo` 的回调判断是 `HashHistory` 则设置 `scroll` 和注册事件监听：`popstate` 或 `hashchange`。（如果是 `HashHistory` 则在其实例化的时候就已经册事件监听 `popstate`了）。一旦 `hash` 变化即触发 `transitionTo` 流程，到此 `VueRouter init` 结束，
   5. 继续 `vue` 的执行，在执行组件 `RouterView render` 函数渲染成 `vnode` 时，读取 `$route->_route` 将渲染 `watcher` 订阅，之后 `vue` 构建结束。
4. 执行 `router.push`，内部执行 `transitionTo` 后（其中会添加异步 `Vue` 的渲染 `watcher` 任务），其回调里先执行 `pushHash` 通过原生方法 `window.location.hash` 或 `window.history.pushState` 修改路由并设置 `scroll`，在下一次微循环时，执行渲染 `watcher` 更新视图时因为 `renderChildren` 存在会强制更新子组件。
5. 组件 `<router-link>`在执行 `render` 函数时，创建 `a` 标签并绑定处理事件。
6. 调用 `history.pushState()` 或者 `history.replaceState()` 不会触发 `popstate` 事件和 `hashchange` 事件，`popstate` 事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在 `JavaScript` 中调用 `history.back()、history.forward()、history.go()` 方法).
7. [更多分析参考](https://juejin.im/post/5b10b46df265da6e2a08a724)
