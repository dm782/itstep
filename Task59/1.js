d1 = "14.08.1997";
d2 = "14.08.1997";

function date(d1) {
    arr1 = d1.split('.');
    return arr1;
}
day1 = date(d1)
const numberArray1 = day1.map(Number);
console.log(numberArray1);

function date(d2) {
    arr2 = d2.split('.');
    return arr2;
}
day2 = date(d2)
const numberArray2 = day2.map(Number);
console.log(numberArray2);
if (numberArray1[2] > numberArray2[2]) {
    console.log("Первая дата позже второй");
}
else if (numberArray1[2] < numberArray2[2]) {
    console.log("Вторая дата позже первой");
}
else if (numberArray1[2] == numberArray2[2] && numberArray1[1] > numberArray2[1]) {
    console.log("Первая дата позже второй");
}
else if (numberArray1[2] == numberArray2[2] && numberArray1[1] < numberArray2[1]) {
    console.log("Вторая дата позже первой");
}
else if (numberArray1[2] == numberArray2[2] && numberArray1[1] == numberArray2[1] && numberArray1[0] > numberArray2[0]) {
    console.log("Первая дата позже второй");
}
else if (numberArray1[2] == numberArray2[2] && numberArray1[1] == numberArray2[1] && numberArray1[0] < numberArray2[0]) {
    console.log("Вторая дата позже первой");
}
else {
    console.log("Даты равны");
}

