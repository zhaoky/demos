import { createApp } from '../app';

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    router.push(context.url);

    router.onReady(() => {
      // 首屏渲染拉取对应组件数据
      const matchedComponents = router.getMatchedComponents();

      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      Promise.all(
        matchedComponents.map((comp) => {
          if (comp.asyncData) {
            return comp.asyncData({ store });
          } else {
            return Promise.resolve();
          }
        })
      ).then(() => {
        context.state = store.state; //renderToString 里会将state 注入到 window.__INITIAL_STATE__
        resolve(app);
      });
    }, reject);
  });
};
