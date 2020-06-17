var http = require('http');
var fs = require('fs');
var server = http
  .createServer(function (req, res) {
    if (req.url == '/time') {
      setInterval(function () {
        sendData(res);
      }, 10000);
    }
    if (req.url == '/') {
      fs.readFile('./lpc.html', 'binary', function (err, file) {
        if (!err) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(file, 'binary');
          res.end();
        }
      });
    }
  })
  .listen(8088, 'localhost');
//用随机数模拟数据是否变化
function sendData(res) {
  var randomNum = Math.floor(10 * Math.random());
  console.log(randomNum);
  if (randomNum >= 0 && randomNum <= 5) {
    res.end(new Date().toLocaleString());
  }
}
