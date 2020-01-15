var name = 'zky';
(function(){
    if(typeof name === 'undefined'){
        var name = "liran";
        console.log(1,name);
    }else{
        console.log(2,name);
    }
})();