var http = require('http');
var fs = require('fs');
var count = 0;
var server = http
  .createServer(function (req, res) {
    if (req.url == '/htmlfile') {
      res.setHeader('content-type', 'text/html');
      var timer = setInterval(function () {
        sendRandomData(timer, res);
      }, 2000);
    }
    if (req.url == '/') {
      fs.readFile('./ie-htmlfile-stream.html', 'binary', function (err, file) {
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
  console.log(randomNum.toString());
  if (count++ == 100) {
    clearInterval(timer);
    res.end('<script type="text/javascript">callback.process(\'' + randomNum.toString() + "')</script> ");
  }
  res.write('<script type="text/javascript">callback.process(\'' + randomNum.toString() + "')</script> ");
}
