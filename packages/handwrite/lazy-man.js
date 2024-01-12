// 1.方法链式调用
// 2.类的使用和面向对象编程的思路
// 3.设计模式的应用
// 4.代码的解耦
// 5.最少知识原则，也即 迪米特法则（Law of Demeter）
// 6.代码的书写结构和命名

function LazyMan(name) {
  this.todoList = [];
  this.curIndex = 0;
  this.hi(name);
  setTimeout(() => {
    this.publish();
  }, 0);
}
LazyMan.prototype.hi = function (name) {
  this.subscribe('hi', name);
  return this;
};
LazyMan.prototype.sleep = function (num) {
  this.subscribe('sleep', num);
  return this;
};
LazyMan.prototype.sleepFirst = function (num) {
  this.subscribe('sleepFirst', num);
  return this;
};
LazyMan.prototype.eat = function (param) {
  this.subscribe('eat', param);
  return this;
};
LazyMan.prototype.subscribe = function (type, param) {
  if (type === 'sleepFirst') {
    this.todoList.unshift({ type, param });
  } else {
    this.todoList.push({ type, param });
  }
};
LazyMan.prototype.publish = function () {
  this.next();
};
LazyMan.prototype.next = function () {
  if (this.curIndex === this.todoList.length) {
    return;
  }
  var curItem = this.todoList[this.curIndex];
  if (curItem.type === 'sleepFirst') {
    setTimeout(() => {
      console.log(`First wake up after ${curItem.param}`);
      this.curIndex++;
      this.next();
    }, +curItem.param * 1000);
  } else if (curItem.type === 'hi') {
    console.log(`hi! This is ${curItem.param}!`);
    this.curIndex++;
    this.next();
  } else if (curItem.type === 'eat') {
    console.log(`Eat ${curItem.param}`);
    this.curIndex++;
    this.next();
  } else if (curItem.type === 'sleep') {
    setTimeout(() => {
      console.log(`Wake up after ${curItem.param}`);
      this.curIndex++;
      this.next();
    }, +curItem.param * 1000);
  }
};

new LazyMan('korey').eat('汉堡').sleep(3).eat('黄焖鸡').eat('海底捞').sleep(5).sleepFirst(3).eat('烤鱼');
