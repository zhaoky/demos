var http = require('http');
var fs = require('fs');
var count = 0;
var server = http
  .createServer(function (req, res) {
    if (req.url == '/stream') {
      res.setHeader('content-type', 'multipart/octet-stream');
      var timer = setInterval(function () {
        sendRandomData(timer, res);
      }, 2000);
    }
    if (req.url == '/') {
      fs.readFile('./xhr-stream.html', 'binary', function (err, file) {
        if (!err) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(file, 'binary');
          res.end();
        }
      });
    }
  })
  .listen(8088, 'localhost');
function sendRandomData(timer, res) {
  var randomNum = Math.floor(10000 * Math.random());
  console.log(randomNum);
  if (count++ == 100) {
    clearInterval(timer);
    res.end(randomNum.toString());
  }
  res.write(randomNum.toString());
}
