var p1 = new Promise(function(resolve, reject) {
  setTimeout(() => reject(666), 1000);
  console.log(777);
  //     resolve(666);
});
var p2 = new Promise(function(resolve, reject) {
  //     setTimeout(()=>reject(p1), 5000)
  //     setTimeout(()=>reject(p1), 5000)
  reject(p1);
  console.log(888);
});
p1.catch(error => console.log(789, error));
p2.then(result => console.log(999, result)).catch(r => {
  console.log(0, r);
});
p2.catch(error => console.log(987, error));
p1.catch(error => console.log(123, error));
