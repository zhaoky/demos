var http = require('http');
var fs = require('fs');
var server = http
  .createServer(function (req, res) {
    if (req.url == '/time') {
      //res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'http://localhost'});
      res.end(new Date().toLocaleString());
    }
    if (req.url == '/') {
      fs.readFile('./index.html', 'binary', function (err, file) {
        if (!err) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(file, 'binary');
          res.end();
        }
      });
    }
  })
  .listen(8088, 'localhost');
server.on('connection', function (socket) {
  console.log('客户端连接已经建立 ');
});
server.on('close', function () {
  console.log('服务器被关闭');
});
console.log('请打开地址体验普通ajax轮询：http://localhost:8088');
