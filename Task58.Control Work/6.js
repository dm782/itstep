var arr = [];
for (var i = 0; i < 100; i++) {
    arr.push(Math.round(Math.random() * 1000));
}
function maxMin(arr){
    max = Math.max.apply(null, arr);
    min = Math.min.apply(null, arr);
    return max - min;
}
console.log(maxMin(arr));
