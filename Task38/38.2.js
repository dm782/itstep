let arr = [3,7,-4,8,3,-9,5,-6,-8,3];
let sum = 0;
let mod = 0;
let plus = arr.filter(function (elem) {
    if (elem >= 0) {
        return true;
    } else {
        return false;
    }
});

console.log(plus);
let minus = arr.filter(function (elem) {
    if (elem <= 0) {
        return true;
    } else {
        return false;
    }
});

console.log(minus);

plus.forEach(function(elem){
    sum += elem;
});

console.log(sum);

minus.forEach(function (elem) {
    mod += elem;
});

console.log(mod);

let res = sum - mod;
    if(res >= 0){
        console.log("Сумма положительных чисел больше");
    }
    else if(res == 0){
        console.log("Сумма положительных чисел больше");
    }
    else{
        console.log("Модуль чисел больше")
    }