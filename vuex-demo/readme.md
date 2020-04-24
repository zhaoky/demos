# vuex

粗略看了下源码，行一些记录。

1. 引入 `vuex` 文件时，将执行 `Store, Module` 类等定义，并在原型上监听 `state` 及其子属性（只读）。
2. 通过 `Vue.use(Vuex)` 安装插件 `Vuex`，会通过 `Vue.mixin` 扩展 `beforeCreate` 钩子，用于执行 `vuexInit` 将 `Vue` 的传入选项 `store`（没有则取父组件的 `$store`）赋给实例属性 `$store` 上。
3. 实例化 `Vuex.Store`，内部初始化各项变量，执行插件，调试工具等。
   1. `installModule` 里处理及包装各个传入的选项，如 `getters，mutations，actions，module` 等。
   2. `resetStoreVM` 里监听 `Store` 实例上的 `getters` 的子属性（只读）。并实例化 `vue` 将 `store.state`(`data.$$state`属性) 和包装后的 `store.getters`(`computed` 属性) 设为响应式。
   3. 严格模式下 `$watch` 了 `this._data.$$state`。一旦状态变化即会执行 `$watch` 的回调通过 `this._committing` 判断是否是通过 `commit` 改变，不是则说明为直接更改状态将报错，但不影响执行。
4. 其他
   - `action` 里的函数参数为 `{context,{dispatch,commit,getters,state,rootGetters,rootState},payload}`，支持异步，默认返回 `promise` 对象；
   - `mutations` 里的函数参数为 `{state, payload}` ，不支持异步，无返回；
   - `getters` 里的函数参数为：`{state, getters, rootState, rootGetters}`，返回计算值。
5. 辅助函数：`mapState，mapGetters，mapMutations，mapActions`。
6. 各 `module` 的 `action, mutation, getter` 默认注册在全局命名空间。`state` 会在 `module` 以名称为 `key` 的 `state` 对象下。
