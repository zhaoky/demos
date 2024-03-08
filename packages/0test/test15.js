const a = function b() {
    b = 1;
    console.log(b);
  };
  a(); //打印b为function(){b=1;console.log(b);}

//为什么这里打印的 `b` 为 `b` 函数，而不是 `1`？
//NFE（具名函数表达式） 声明提前：一个声明在函数体内都是可见的，函数声明优先于变量声明；`函数表达式` 如果有 `name` 的话，这个 `name` 是 `不可删除且为只读`。