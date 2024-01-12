function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    configurable: true,
    writable: true
  });
}
// observe array
let arrayProto = Array.prototype;
let arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(method => {
  // 原始数组操作方法
  let original = arrayMethods[method];
  def(arrayMethods, method, function() {
    let arguments$1 = arguments;
    let i = arguments.length;
    let args = new Array(i);

    while (i--) {
      args[i] = arguments$1[i];
    }
    // 执行数组方法
    let result = original.apply(this, args);
    // 因 arrayMethods 是为了作为 Observer 中的 value 的原型或者直接作为属性，所以此处的 this 一般就是指向 Observer 中的 value
    // 当然，还需要修改 Observer，使得其中的 value 有一个指向 Observer 自身的属性，__ob__，以此将两者关联起来
    let ob = this.__ob__;
    // 存放新增数组元素
    let inserted;
    // 为add 进arry中的元素进行observe
    switch (method) {
      case 'push':
        inserted = args;
        break;
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        // 第三个参数开始才是新增元素
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    // 通知数组变化
    ob.dep.notify();
    // 返回新数组长度
    return result;
  });
});
console.log(arrayMethods);
