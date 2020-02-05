function test(res) {
  return Promise.resolve(res)
    .then(res => {
      console.log(res + '!');
      return res;
    })
    .then(res => {
      console.log(res);
      //   return Promise.resolve;
      setTimeout(() => {
        return Promise.reject(1);
      }, 0);
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
test('hello')
  .then(res => {
    console.log(res + '#');
  })
  .catch(res => {
    console.log(res + '##');
  });
