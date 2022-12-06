let a = [-3,4,-9,3,4,8,-5,2,-7,4,1,8,-3];
let b = a.filter(function(elem){
    if (elem > 0){
        return true;
    }
});
console.log(b);
let c = a.filter(function (elem) {
    if (elem < 0) {
        return true;
    }
});
console.log(c);