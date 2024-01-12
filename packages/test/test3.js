// 获取Array原型
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var newArrProto = [];
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(method => {
  // 原生Array的原型方法
  let original = arrayMethods[method];

  // 将push，pop等方法重新封装并定义在对象newArrProto的属性上
  // 这里需要注意的是封装好的方法是定义在newArrProto的属性上而不是其原型属性
  // newArrProto.__proto__ 没有改变
  newArrProto[method] = function mutator() {
    console.log('监听到数组的变化啦！');

    // 调用对应的原生方法并返回结果（新数组长度）
    return original.apply(this, arguments);
  };
});

var list = [1, 2];
// 将我们要监听的数组的原型指针指向上面定义的空数组对象
// newArrProto的属性上定义了我们封装好的push，pop等方法
list.__proto__ = newArrProto;
list.push(3);
// 监听到数组的变化啦！ 3

// 这里的list2没有被重新定义原型指针，所以这里会正常执行原生Array上的原型方法
var list2 = [1, 2];
list2.push(3);
// 3
