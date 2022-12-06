var i = 1;
var sum = 0;
var res = 0;
for(let n = 100; n <= 999; n++){
    if (n % 10 == 0 && n % 13 == 0){
        sum += n;
        res = sum;
        console.log("Number iteration -", i++, "Summa: ", res);
}
}
console.log(sum);