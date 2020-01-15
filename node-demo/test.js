// process.stdout.write("请输入用户名:");
// process.stdin.resume();
// process.stdin.setEncoding("utf8");
// process.stdin.on("data", function(chunk) {
//   process.stdout.write("data: " + chunk);
//   console.log(process.execPath);
//   process.stdin.resume();
//   //   process.exit();
// });
// process.stdin.on("end", function() {
//   process.stdout.write("end");
//   console.log(2);
// });

// const a = getReadableStreamSomehow();
// console.log(a);
// a.resume().on("end", e => {
//   console.log("没饿", e);
// });
// var readable = getReadableStreamSomehow();
// readable.on("data", function(chunk) {
//   console.log("got %d bytes of data", chunk.length);
// });
// readable.on("end", function() {
//   console.log("there will be no more data.");
// });
// console.log(333, process.stdin);

// const fs = require("fs");
// const path = require("path");

// let filename = path.resolve("1.txt");
// let readStream = fs.createReadStream(filename, { encoding: "utf8" });
// readStream.on("open", data => {
//   console.log("打开了", data);
// });
// readStream.on("data", data => {
//   console.log("数据来了！");
//   console.log("已经读取的字节数", readStream.bytesRead);
// });
// readStream.on("close", data => {
//   console.log("关了");
// });
// console.log(readStream.path + "哈哈哈");

// fs.createReadStream(filename).pipe(process.stdout);
// fs.createReadStream(filename);
// console.log(process.stdout);

//引入readline模块
const readline = require("readline");

//创建readline接口实例
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// question方法
rl.question("Please input a word: ", function(answer) {
  console.log("You have entered {%s}", answer.toUpperCase());
  // 不加close，则不会结束
  rl.close();
});
