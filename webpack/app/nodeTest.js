/**
 * Created by zhaoky on 2017/1/11.
 */
function test(){
	console.log("---nodeTest.js---");
	var p = document.createElement("p");
	p.textContent = "hello,nodeTest!";
	return p;
}

module.exports = test;