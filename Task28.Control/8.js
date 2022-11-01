year = 1900;
month = 2;
day = 30;
if (month == 1 || month == 3 && day > 31){
    console.log("Дата введена не корректно!");
}
else if (month == 5 || month == 7 || month == 8 || month == 10 || month == 12 && day > 31) {
    console.log("Дата введена не корректно!");
}
else if(month == 4 && day > 30){
    console.log("Дата введена не корректно!");
}
else if (month == 6 && day > 30) {
    console.log("Дата введена не корректно!");
}
else if (month == 9 && day > 30) {
    console.log("Дата введена не корректно!");
}
else if (month == 11 && day > 30) {
    console.log("Дата введена не корректно!");
}
else if (year % 4 == 0 && month == 2 && day > 29){
    console.log("Дата введена не корректно!");
}
else if (year % 4 != 0 && month == 2 && day > 28) {
    console.log("Дата введена не корректно!");
}
else{
    console.log("Верная дата!");
}