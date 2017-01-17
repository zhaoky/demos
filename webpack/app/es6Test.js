/**
 * Created by zhaoky on 2017/1/12.
 */

import component from "./exportTest";
class Animal {
	constructor(){
		this.type = 'animal'
	}
	says(say){
		setTimeout( () => {
			console.log(this.type + ' says ' + say);
			console.log(component);
	}, 1000)
	}
}


function instanceAnimal(){
	var animal = new Animal();
	animal.says('hi');  //animal says hi
}
		
module.exports = instanceAnimal;
         