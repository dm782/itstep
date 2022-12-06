const arr = [15, 3, 11, 1];

const max = Math.max(...arr);

const indexMax = arr.indexOf(max);
console.log(indexMax);

const min = Math.min(...arr);

const indexMin = arr.indexOf(min);
console.log(indexMin);
[arr[indexMin], arr[indexMax]] = [arr[indexMax], arr[indexMin]];

console.log(arr)