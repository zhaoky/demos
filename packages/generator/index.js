function f() {
  console.log('执行f');
  return 9;
}
function f1() {
  console.log('执行f1');
  return 'F1';
}
function b() {
  console.log('执行b');
  return 'b';
}
function c() {
  setTimeout(() => {
    return 'c';
  }, 5000);
  return 'cc';
}
function* main() {
  console.log('start');
  var a = yield f();
  console.log('a:', a);
  var b = yield f1();
  console.log('a:', c);
  return 'finish';
}

var vv = main(); //调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象即遍历器对象（Iterator Object）。
var one = vv.next(); //每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止，但要执行yield后面的表达式。得到 { value: 'hello'（yield表达式的值）, done: false（标志遍历是否结束） }
var two = vv.next(b()); //yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作**上一个** yield 表达式的返回值。
var three = vv.next();
console.log(one, two);

// 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
// 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
// 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
// 如果该函数没有return语句，则返回的对象的value属性值为undefined。
