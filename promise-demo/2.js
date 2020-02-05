function test(res) {
  //创建一个rejected状态的Promise
  return Promise.reject(res)
    .then(res => {
      //此处不会执行！！！
      console.log((res += '!'));
      return res;
    })
    .catch(res => {
      console.log(res);
      return res; //catch执行完后，返回了一个新的Fulfilled的状态的Promise,
      //等同于return Promise.resolve(res);所以后面的then会执行，而catch就不会执行了。
    })
    .then(res => {
      console.log((res += '!'));
      return res;
    })
    .catch(res => {
      console.log(res + '?');
      return res;
    });
}
test('hello').then(res => {
  console.log(res + '#');
  //test方法中将错误统一栏截处理了，可以不返回内容，
  //然后此处判断res来确定要不要执行！！
});
