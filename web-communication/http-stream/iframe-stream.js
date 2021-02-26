var http = require('http');
var fs = require('fs');
var count = 0;
var server = http
  .createServer(function (req, res) {
    if (req.url == '/iframe') {
      res.setHeader('content-type', 'text/html');
      var timer = setInterval(function () {
        sendRandomData(timer, res);
      }, 2000);
    }
    if (req.url == '/') {
      fs.readFile('./iframe-stream.html', 'binary', function (err, file) {
        if (!err) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(file, 'binary');
          res.end();
        }
      });
    }
  })
  .listen(3000, 'localhost');
function sendRandomData(timer, res) {
  var randomNum = Math.floor(10000 * Math.random());
  console.log(randomNum.toString());
  if (count++ == 100) {
    clearInterval(timer);
    res.end('<script type="text/javascript">parent.process(\'' + randomNum.toString() + "')</script> ");
  }
  res.write('<script type="text/javascript">parent.process(\'' + randomNum.toString() + "')</script> ");
}
console.log('请打开地址体验基于iframe的stream：http://localhost:3000');
