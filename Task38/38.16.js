let str = "I want to be happy on 2023 years";
str = str.toLowerCase();
let b = str.split("");


deletedLetters = "abcdefghijklmnopqrstuvwxyz ";

let newStr = str.split("").filter(function (item) {
    return deletedLetters.indexOf(item) == -1; // выбираем только те символы, которые не входят в deletedLetters
}).join("");


c = newStr.length;
console.log(c);
//Посмотреть в предыдущих уроках как удалять все буквы
//Удалить все буквы
//Посчитать количество символов