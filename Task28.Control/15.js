i = 0;
sum = 1;
for (i = 1; i <= 99; i++){
    if (i % 13 == 0 && i % 2 != 0){
        sum = sum*i;
    }
}
console.log(sum);