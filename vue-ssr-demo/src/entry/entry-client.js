import { createApp } from '../app';

const { app, router, store } = createApp();
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  app.$mount('#app');

  // 客户端数据预取（非首屏渲染的情况），也可以将此逻辑放到对应视图组件的 beforeMount 里执行。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    const activated = matched.filter((item) => prevMatched.every((i) => i !== item));

    if (!activated.length) {
      return next();
    }

    Promise.all(
      activated.map((item) => {
        if (item.asyncData) {
          return item.asyncData({ store });
        }
      })
    )
      .then(() => {
        next();
      })
      .catch(() => {
        next();
      });
  });
});
