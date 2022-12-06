let numbers = [3, 1, 5, 0, 12, 4, 8, 9, 3, 15];

let N = 5;
let M = 10; 

let result = numbers.filter(function (elem) {
    if (elem >= N && elem <= M) {
        return true;
    } else {
        return false;
    }
});

console.log(result);
