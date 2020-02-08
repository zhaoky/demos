function Foo() {
  getName = function() {
    console.log(1);
  };
  return this;
}
Foo.getName = function() {
  console.log(2);
};
Foo.prototype.getName = function() {
  console.log(3);
};
var getName = function() {
  console.log(4);
};
function getName() {
  console.log(5);
}

//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();

//在 JavaScript 中，如果构造函数不带参数的话，new 的时候可以省略括号。

//第一种是普通的用法，就和上面代码 new Foo 一样。这种时候它的优先级是仅次于括号（点和括号是同级别的）。

//但是 new 还有另一个种用法，那就是输入构造参数的情况。比如上面代码第二个代码 new Foo()，即使构造函数的参数为空，这种情况下 new 就有括号的性质，前括号的 new 关键字，后括号是用来输入构造参数的小括号。

//https://segmentfault.com/q/1010000011576064/
