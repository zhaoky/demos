function a() {
  return new Promise((e, t) => {
    setTimeout(() => {
      e(111);
    }, 1000);
  })
    .then(res => {
      console.log('略略', res);
      setTimeout(() => {
        return new Promise((ee, tt) => {
          ee('hh');
        }).then(res2 => {
          console.log('哈哈', res2);
          setTimeout(() => {
            return 'iii';
          }, 2000);
        });
      }, 5000);
      setTimeout(() => {
        return Promise.resolve(999999);
      }, 0);
    })
    .then(res3 => {
      setTimeout(() => {
        console.log('呵呵', res3);
        return Promise.resolve(565);
      }, 0);
      //                 return Promise.resolve(565);
    })
    .catch(() => {
      console.log(9998);
    });
}
a()
  .then(function(res) {
    console.log('嗯嗯', res);
    return 222;
  })
  .then(function(res) {
    console.log('啊啊', res);
  })
  .catch(function(res) {
    console.log(666, res);
  });
