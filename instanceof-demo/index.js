var H = (function() {
  function Dialog() {
    if (Dialog.prototype.init) {
      Dialog.prototype = {
        init: function() {
          console.log('ok');
        }
      };
    }
  }

  new Dialog();

  return Dialog;
})();

var a = new H();

console.log(a instanceof H);

//https://www.cnblogs.com/yanhaijing/p/3291292.html
