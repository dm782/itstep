let str = "Всем доброго времени суток я живу в областном центре и прохожу курс обучения по фронд-энд разработке";
let deletedLetters = ".,:;!?- ";
let newStr = str.split("").filter(function (item) {
    return deletedLetters.indexOf(item) == -1; // выбираем только те символы, которые не входят в deletedLetters
}).join("");

console.log(newStr);
b = newStr.split(""); 
console.log(b);
u = b.filter(function (item, pos) {
    return b.indexOf(item) == pos;
});
console.log(u);
col = u.length
console.log(col);
if(col == 32){
    console.log("Предложение - панграмма");
}
else{
    console.log("Предложение не является панграммой")
}
//Дано два массива и число К найти числа по одному из каждого массива сумма которых будет равно К