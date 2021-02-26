import './10.js';

async function f() {
  return 1111111;
}
f().then(res => {
  console.log(res);
});

// var a = new Promise((r, t) => {
//   r(666666666);
// });
// a.then(res => {
//   console.log(res);
// });
