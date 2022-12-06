let arr = [3,4,1,9];
let max = [];
let maxtwo = [];

arr.forEach(function (elem, index) {

    if (index > 0) {
        if (max < elem) {
            max = elem;
            
        }

    }
});

console.log(max, "one max element");
let newArray = arr.filter(function (f) {
    return f !== max
});

newArray.forEach(function (elem, index) {

    if (index > 0) {
        if (maxtwo < elem) {
            maxtwo = elem;

        }

    }
});
console.log(maxtwo, "two max element");
