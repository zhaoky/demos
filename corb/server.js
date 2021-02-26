let express = require('express');
let app = express();

let data = {
  name: 'wade',
  age: 18
};
app.all('*', function(req, res, next) {
  //   res.header('Access-Control-Allow-Origin', '*');

  //   res.header('Access-Control-Allow-Credentials', true);
  res.header('X-Content-Type-Options', 'nosniff');

  //   res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With,JSON');

  //   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');

  res.header('Content-Type', 'text/javascript;charset=utf-8');

  next();
});
let api = '/api/user';

app.get('*', (req, res) => {
  console.log('服务器收到请求');
  //   console.log(111, req, res);
  //   res.type('application/x-javascript');
  res.send(data);

  //   res.jsonp(data);
});

//配置服务端口

app.listen(8000, () => {
  console.log(`localhost:8000${api}`);
});
