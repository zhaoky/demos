//异步接口：返回当天在线用户数
function getonlinePerson(callback) {
  //模拟实现
  var onlinePerson = Math.ceil(Math.random() * 1000);
  setTimeout(function() {
    callback(onlinePerson);
  }, Math.random * 1000);
}
//异步接口：返回当天总注册用户数
function getRegPerson(callback) {
  //模拟实现
  var regPerson = Math.ceil(Math.random() * 1000) + 1000;
  setTimeout(function() {
    callback(regPerson);
  }, Math.random() * 1000);
}
//异步接口：返回当天在线人数百分比，需要【当天在线用户数】以及【当天总注册用户数】做参数
function calOnlinePercent(onlinePerson, regPerson, callback) {
  //模拟实现
  var percent = Math.ceil((onlinePerson / regPerson) * 100);
  setTimeout(function() {
    callback(percent);
  }, Math.random * 1000);
}
//异步函数promise化
function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      args.push((result, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
      fn.apply(null, args);
    });
}

//结合以上几个函数，编写getOnlinePercent函数，在回调中返回当天在线人数百分比
function getOnlinePercent(callback) {
  //此处编写你的逻辑代码
  var getonlinePerson2 = promisify(getonlinePerson);
  var getRegPerson2 = promisify(getRegPerson);
  var calOnlinePercent2 = promisify(calOnlinePercent);
  Promise.all([getonlinePerson2(), getRegPerson2()])
    .then(arr => {
      return calOnlinePercent2(...arr);
    })
    .then(result => callback(result));
}
getOnlinePercent(result => console.log(result + '%'));
