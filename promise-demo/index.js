window.Promise = ES6Promise.Promise;
console.log(Promise);
var original = Promise.resolve(2)
// var original = {
//     then: function (resolve, reject) {
//         resolve(2);
//     }
// };
// var original = 2;
new Promise(resolve => {
    resolve(original)
    Promise.resolve().then(() => Promise.resolve().then(() => console.log(1)))
    console.log(4)
}
).then(t => console.log(t)).then(t => console.log(666));
console.log(3);
