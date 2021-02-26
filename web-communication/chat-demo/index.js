const Koa = require('koa');

const fs = require('fs');
const app = new Koa();
const static = require('koa-static');
const router = require('koa-router')();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

// 静态资源服务器
app.use(static(__dirname + '/static'));

router.get('/', async (ctx) => {
  ctx.response.type = 'html';
  ctx.body = fs.readFileSync('./index.html');
});

app.use(router.routes());
app.use(router.allowedMethods());
//  保存登录的在线用户
const onlineUsers = {};
//  在线人数
let number = 0;

io.on('connection', (socket) => {
  // 监听用户登录
  socket.on('login', (userName) => {
    socket.uid = `rd_${new Date().getTime().toString()}${Math.floor(Math.random() * 100000)}`;
    onlineUsers[socket.uid] = userName;
    number++;
    io.emit('login', {
      onlineUsers,
      number,
      curUser: {
        userName,
        uid: socket.uid,
      },
    });
  });
  // 监听用户退出
  socket.on('disconnect', () => {
    if (!socket.uid) {
      return;
    }
    number--;
    const userName = onlineUsers[socket.uid];
    delete onlineUsers[socket.uid];
    console.log(Object.values(onlineUsers));
    io.emit('logout', {
      onlineUsers,
      number,
      curUser: {
        uid: socket.uid,
        userName,
      },
    });
  });
  // 监听普通数据
  socket.on('message', (res) => {
    // 只会向除了自己的其他用户发送消息
    socket.broadcast.emit('message', res);
  });
});

server.listen(3000, () => {
  console.log(`渲染地址：http://localhost:3000`);
});
