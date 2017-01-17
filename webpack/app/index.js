/**
 * Created by zhaoky on 2017/1/11.
 */
import es6Test from "./es6Test";
import './index.css';
import './index2.css';

var nodeTest = require('./nodeTest');
var data = require('./data.json');

console.log(data.name);

document.getElementById('zzz').appendChild(nodeTest());

var aaa = document.getElementById('aaa');
aaa.textContent = data.name;
es6Test();