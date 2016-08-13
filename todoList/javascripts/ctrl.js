//控制器文件
app.controller("ctrl", ["$scope", "$filter", "$timeout", function($scope, $filter, $timeout) {
    //定义输入对象及其他
    $scope.message = {
        text: "",
        status: false,
        show: true,
        flag: false
    };
    $scope.todolist = [];
    $scope.unfinNum = 0;
    $scope.filterData = "";
    $scope.boldflag = 1;
    $scope.checkAllShow = false;
    $scope.checkall = false;
    //本地存储：存储了todolist和unfinNum和checkAllShow
    console.log(localStorage.storageunfinNum);
    var storage = {
        storagelist:localStorage.getItem("storagelist"),
        storagecheckAllShow:localStorage.getItem("storagecheckAllShow"),
        storageunfinNum:localStorage.getItem("storageunfinNum")
    };
    if(storage.storagelist){
        $scope.todolist = JSON.parse(storage.storagelist);
        $scope.checkAllShow = JSON.parse(storage.storagecheckAllShow);
        $scope.unfinNum = storage.storageunfinNum;
    }else{
        $scope.todolist = [];
        $scope.checkAllShow = false;
        $scope.unfinNum = 0;
    }
    function saveList () {
        localStorage.setItem("storagelist",JSON.stringify($scope.todolist));
        localStorage.setItem("storagecheckAllShow",JSON.stringify($scope.checkAllShow));
        localStorage.setItem("storageunfinNum",$scope.unfinNum);
    }
    //输入事项后的事件
    $scope.messageKeyDown = function(e) {
        if (e.keyCode == 13 && $scope.message.text != "") {
            console.log($scope.todolist);
            console.log($scope.message);
            $scope.todolist.unshift($scope.message);
            $scope.message = {
                text: "",
                status: false,
                show: true,
                flag: true
            };
            $scope.all();
            $scope.unfinNum = $filter("filter")($scope.todolist, { status: false }).length;
            $scope.checkall = false;
            $scope.checkAllShow = $scope.todolist.length > 2;
            saveList();

        } else if (e.keyCode == 13 && $scope.message.text == "") {
            alert ("请输入您的待办事项！");
        }
    };
    //点击列表中某一项
    $scope.todolistClick = function(todoitem) {
        todoitem.status = !todoitem.status;
        $scope.checkboxClick();
    };
    //点击某一项的多选按钮事件
    $scope.checkboxClick = function() {
        $scope.checkall=$scope.todolist.every(function(item){
            return !!item.status;
        });
//        for(var i =0,checkflag = true,len=$scope.todolist.length; i < len;i++)
//            if(!$scope.todolist[i].status){
//                checkflag = false;
//            }
//        $scope.checkall = checkflag;
        //检测未完成数量
        $scope.unfinNum = $filter("filter")($scope.todolist, { status: false }).length;
        saveList ();
    };
    //点击全选按钮事件
    $scope.checkAll = function() {
        if ($scope.checkall) {
            angular.forEach($scope.todolist, function(o) {
                o.status = true;
            })
        } else {
            angular.forEach($scope.todolist, function(o) {
                o.status = false;
            })
        }
        //检测未完成数量
        $scope.unfinNum = $filter("filter")($scope.todolist, { status: false }).length;
    };
    //点击all，completed,incompleted的事件
    $scope.all = function() {
        $scope.filterData = "";
        $scope.boldflag = 1;
    };
    $scope.completed = function() {
        angular.forEach($scope.todolist, function(o) {
            o.flag = o.status;                      //不能用status来筛选，否则unfinnum不能用
        });
        $scope.filterData = { flag: true };
        $scope.boldflag = 2;
    };
    $scope.incompleted = function() {
        angular.forEach($scope.todolist, function(o) {
            o.flag = o.status;
        });
        $scope.filterData = { flag: false };
        $scope.boldflag = 3;
    };
    //点击clear事件
    $scope.clearMousedown = function() {
        $scope.clearflag = true;
    };
    $scope.clearMouseup = function() {
        $scope.clearflag = false;

        for (var i = 0; i < $scope.todolist.length; i++) { // $scope.todolist.length 不能写死，因为length长度在变化
            if ($scope.todolist[i].status) {
                $scope.todolist.splice(i, 1);
                i--;
            }
        }
        $scope.checkAllShow = $scope.todolist.length > 2; //同理
        saveList();
        $scope.all();
    };
}]);
//取消双击出现的蓝条
app.directive("form", function() {
    return {
        restrict: "AE",
        link: function() {
            document.onselectstart = function() {
                return false;
            };
        }
    }
});
//绑定事件
app.directive("spanFocus", function() {
    return {
        restrict: "AE",
        link: function(scope, element) {
            element[0].addEventListener("dblclick", function() {
                var index = element.attr("span-index");
                var todoitem = scope.todolist[index];
                todoitem.show = false;
                scope.$apply();
                element.parent().children()[2].focus();
                //                element[0].focus();   错误
            });
        }
    }
});
app.directive("inputFocus", function() {
    return {
        restrict: "AE",
        link: function(scope, element) {
            element[0].addEventListener("keydown", function(e) {
                var index = element.attr("data-index");
                var todoitem = scope.todolist[index];
                if (e.keyCode == 13 && todoitem.text != "") {
                    todoitem.show = true;
                    scope.$apply();
                } else if (e.keyCode == 13 && todoitem.text == "") {
                    alert("必须要有输入值！");
                    element[0].focus();
                }
            });
            element[0].addEventListener("blur", function() {
                var index = element.attr("data-index");
                var todoitem = scope.todolist[index];
                if (todoitem.text != "") {
                    todoitem.show = true;
                    scope.$apply();
                } else if (todoitem.text == "") {
                    alert("必须要有输入值！");
                    element[0].focus();
                }
            });
        }
    }
});