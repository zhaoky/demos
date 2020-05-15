const Koa = require('koa');
const fs = require('fs');
const static = require('koa-static');
const server = new Koa();
const createApp = require('../dist/bundle-server').default;

const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync(__dirname + '/../src/template.html', 'utf-8'),
});
server.use(static(__dirname + '/../dist'));
server.use((ctx) => {
  const context = {
    title: '1111',
    meta: `
    <meta content='1' />
    <meta content='2' />
    `,
    url: ctx.url,
  };

  return createApp(context)
    .then((app) => {
      renderer.renderToString(app, context, (err, html) => {
        ctx.body = html;
      });
    })
    .catch(() => {});
});

server.listen(3000, () => {
  console.log(`渲染地址：http://localhost:3000`);
});
