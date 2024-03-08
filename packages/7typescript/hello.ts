import { a } from "./a";
/**
 * 1
 *
 * @param {number} person
 * @return {string}
 */
function sayHello(person: string):string {
  return "Hello, " + person;
}
console.log(a);
const user = "zky";
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}
const b = 1;
console.log(Days["Sun"] === 0);
console.log(sayHello(user), b);
