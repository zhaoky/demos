var http = require('http');
var fs = require('fs');
//用随机数模拟数据是否变化
function sendData(res) {
  var randomNum = Math.floor(10 * Math.random());
  console.log(randomNum);
  if (randomNum >= 0 && randomNum <= 5) {
    res.write(new Date().toLocaleString());
    res.end();
  }
}
http
  .createServer(function (req, res) {
    if (req.url == '/time') {
      setInterval(function () {
        sendData(res);
      }, 10000);
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
  .listen(3000, 'localhost');

console.log('请打开地址体验长轮询long-polling：http://localhost:3000');
