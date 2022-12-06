let arr = [3,8,9,5,4,10,-2,7,-3,12];
A = 0;
let a = arr.filter(function(elem){
    if (elem >= A){
        return true;
    } else{
        return false;
    }
});
console.log(a);
let b = arr.filter(function (elem) {
    if (elem <= A) {
        return true;
    } else {
        return false;
    }
});
console.log(b);
c = b.concat(a);
c.sort((a,b) => a - b); // сортировка по возрастанию
console.log(c);
