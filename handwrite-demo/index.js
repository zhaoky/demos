/*
    斐波那契数列
*/
// 普通算法
function fibonacci(n) {
  if (n < 1) {
    throw Error('error');
  }
  if (n === 1 || n === 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

//空间换时间
let obj = {};
memory = (fn) => (n) => {
  if (obj[n] === undefined) {
    obj[n] = fn(n);
  }
  return obj[n];
};
fibonacci = memory(fibonacci);

//动态规划（推荐）
function fibonacci(n) {
  let res = 1;
  if (n === 1 && n === 2) return res;
  n = n - 2;
  let cur = 1,
    pre = 1;
  while (n) {
    res = cur + pre;
    pre = cur;
    cur = res;
    n--;
  }
  return res;
}

/*
    洗牌算法
*/

// 原地
function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let index = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[index]] = [arr[index], arr[i]];
  }
}

// 非原地
function shuffle1(arr) {
  let _arr = [];
  while (arr.length) {
    let index = Math.floor(Math.random() * arr.length);
    _arr.push(arr.splice(index, 1)[0]);
  }
  return _arr;
}

/*
    promisify
*/

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push((err, ...values) => {
        if (err) {
          return reject(err);
        }
        return resolve(...values);
      });
      fn.call(this, ...args);
    });
  };
}

const fsp = new Proxy(fs, {
  get(target, key) {
    return promisify(target[key]);
  },
});

//使用方法，适合 error-first 风格（nodejs）

await fsp.writeFile('./index.js', data);
