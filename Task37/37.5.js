let a = [1, 3, 6, 4, 3, 3, 5, 6];
b = a.join();
console.log(b);
let deletedLetters = "3 1";



let newNumb = b.split("").filter(function (item) {
    return deletedLetters.indexOf(item) == -1; // выбираем только те символы, которые не входят в deletedLetters
}).join("");

console.log(newNumb);
arr = Array(newNumb);
console.log(newNumb);