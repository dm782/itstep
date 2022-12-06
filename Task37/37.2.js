function isBigNull(value) {
    return value > 0;
}

let a = [3,-8,4,-7,-9,-1,4,8,3,-1];
let b = a.filter(function(elem){
    if (elem >= 0) {
        return true;
}
else{
    return false;
}
});
console.log(b);
let resb = b.reduce((acc, number) => acc + number, 0);
console.log(resb);