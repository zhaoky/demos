const Vue = require('vue');
const Koa = require('koa');

const renderer = require('vue-server-renderer').createRenderer();
const server = new Koa();
server.use(async (ctx) => {
  const app = new Vue({
    template: `<div>Hello World</div>`,
  });
  renderer.renderToString(app, (err, html) => {
    ctx.body = html;
  });
});
server.listen(3000);
