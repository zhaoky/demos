var http = require('http');
var fs = require('fs');


http.createServer(function (req, res) {
    if(req.url === '/msg') {
        // 1. 设定头信息
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        });

        // 2. 输出内容，必须 "data:" 开头 "\n\n" 结尾（代表结束）
        setInterval(function () {
            res.write("data: " + Date.now() + "\n\n");
        }, 1000);
    } else {
        // 其他请求显示index.html
        fs.readFile('./index.html', function (err, content) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content, 'utf-8');
        });
    }

}).listen(3000);


console.log('Server running on port 3000');