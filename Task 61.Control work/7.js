let a = "мама";
let b = "мама";
a = a.split("");
b = b.split("");
arr = a.concat(b);

let uniqueArr = arr.reduce(function (accumulator, currentValue) {
    if (accumulator.indexOf(currentValue) === -1) {
        accumulator.push(currentValue);
    }
    return accumulator;
}, []);

if(a >= uniqueArr){
    console.log("Можно");
}
else{
    console.log("Нельзя");
}
