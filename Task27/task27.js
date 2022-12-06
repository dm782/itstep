var i = 1;
var sum = 0;

while (i <= 5) {

    sum += i;
    i++;
    console.log(`Итерация ${i - 1} sum=${sum}, i=${i}`);
}

console.log(sum); // 15
console.log(i); // 6