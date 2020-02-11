// for...of循环、扩展运算符（...）、解构赋值 和 Array.from 方法可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5

function* fibs() {
  var a = 0;
  var b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

var [a, b, c, d, e, f] = fibs();
console.log(f);
