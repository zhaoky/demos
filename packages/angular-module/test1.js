/**
 * Created by zhaoky on 2017/1/17.
 */
angular
	.module("module1", [])
	.controller("controller1", function () {
		console.log("controller1");
	});

angular
	.module("module2", [])
	.service("service2", function () {
		this.name = "zky";
	})
	.controller("controller2", function () {
		console.log("controller2");
	});

angular
	.module("module3", [])
	.controller("controller3", [
		"service2",
		function (service2) {
			console.log("controller3", service2.name);
		}]);

angular
	.module("module4", [])
	.controller("controller4", function () {
		console.log("controller4");
	});

