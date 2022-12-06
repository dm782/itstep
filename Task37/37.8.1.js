str = "954";
b = str.split("");
c = b.reverse();
d = c.join();

let f = d.split("").filter(function (item) {
    return deletedLetters.indexOf(item) == -1;
});

g = Number(f);
console.log(typeof g);
console.log(g);