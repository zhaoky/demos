const Koa = require('koa');
const static = require('koa-static');
const server = new Koa();

// 静态资源服务器
server.use(static(__dirname + '/static'));

// 跨域中间件
// CORS 跨域资源共享（Cross-origin resource sharing）
/**
 * 关键点：
 * 1、如果需要支持 cookies,
 *    Access-Control-Allow-Origin 不能设置为 *,
 *    并且 Access-Control-Allow-Credentials 需要设置为 true
 *    (注意前端请求需要设置 withCredentials = true)
 * 2、当 method = OPTIONS 时, 属于预检(复杂请求), 当为预检时, 可以直接返回空响应体, 对应的 http 状态码为 204
 * 3、通过 Access-Control-Max-Age 可以设置预检结果的缓存, 单位(秒)
 * 4、通过 Access-Control-Allow-Headers 设置需要支持的跨域请求头
 * 5、通过 Access-Control-Allow-Methods 设置需要支持的跨域请求方法
 */
server.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://fff.com');//也可以设为动态 ${origin.protocol}//${origin.host} 支持所有访问者的地址
  ctx.set('Access-Control-Allow-Methods', 'GET, DELETE,PUT'); //simple method  (GET, HEAD 或者 POST) 不会被阻止。
  ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, User-Agent, Referer, Content-Type, Cache-Control,accesstoken,asd-1,asd-2'); //自定义的请求头要加进去
  ctx.set('Access-Control-Max-Age', '1'); //本次预检请求结果（Access-Control-Allow-Methods 和Access-Control-Allow-Headers ）的有效期（s）
  ctx.set('Access-Control-Allow-Credentials','true')

  if (ctx.method !== 'OPTIONS') {
    // 如果请求类型为非预检请求，则进入下一个中间件（包括路由中间件等）
    await next();
  } else {
    // 当为预检请求（preflight request）时，直接返回204,代表空响应体
    ctx.body = '';
    ctx.status = 204;
  }
});
//  post请求
server.use(async (ctx) => {
  if (ctx.method === 'POST') {
    await parsePostData(ctx);
    console.log('date:',new Date());
    ctx.append('xxx', 'yyy');
    return new Promise((resolve) => {
      setTimeout(() => {
        ctx.cookies.set('username', 'korey', {
        //   domain: 'fff.com', // 写cookie所在的域名，用于共享cookies，最好不要用ip
          path: '/', // 写cookie所在的路径
          maxAge: 60 * 60 * 1000, // cookie有效时长（优先级高于expires）（单位 毫秒）
          expires: new Date('2021-12-15'), // cookie失效时间
          httpOnly: false, // 是否只用于http请求中获取
          overwrite: false, // 是否允许重写
        });
        ctx.body = { message: 'hello world!' };
        resolve();
      }, 1000);
    });
  }
});
// 开启服务器
server.listen(8080, () => {
  console.log(`渲染地址：http://localhost:8080`);
});
// 处理post参数
function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = '';
      ctx.req.addListener('data', (data) => {
        postdata += data;
      });
      ctx.req.on('end', ()=> {
        resolve(postdata);
      });
    } catch (error) {
      reject(error);
    }
  });
}
