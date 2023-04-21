let arr = [1, 3, 6, 4, 3, 3, 5, 6];
let finalArr = [];
sred = arr.reduce((x,y) => x + y);
med = sred / arr.length
console.log(med, "Среднее значение");

for(i = 0; i <= arr.length; i++){
    if(arr[i] < med){
        finalArr.push(arr[i]);
    }
}
console.log(finalArr);