import { a } from "./a";
/**
 * 1
 *
 * @param {number} person
 * @return {string}
 */
function sayHello(person) {
    return "Hello, " + person;
}
console.log(a);
const user = "zky";
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
const b = 1;
console.log(Days["Sun"] === 0);
console.log(sayHello(user), b);
