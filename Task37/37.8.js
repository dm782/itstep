str = "954";
b = str.split("");
c = b.reverse();
d = c.join();
let deletedLetters = ",";
let f = d.split("").filter(function (item) {
    return deletedLetters.indexOf(item) == -1; 
}).join("");

g = Number(f);
console.log(typeof g);
console.log(g);
