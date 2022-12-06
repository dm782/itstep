let a = [3,4,7,9,14,6,1,9];
let max = Math.max.apply(null, a);
let min = Math.min.apply(null, a);
res = max - min;
console.log(min);
console.log(max);
console.log("Разность чисел составляет", res);
