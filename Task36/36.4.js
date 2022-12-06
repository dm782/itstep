let a = "Коля";
let b = "Коля";
c = a.split('');
d = b.split('');
kolvoSymbolA = a.length;
newArr = c.concat(d);
console.log(newArr)
let un = Array.from(new Set(newArr));
console.log(un);
kolvoSymbolFull = un.length;
console.log(kolvoSymbolA, "Изначальное количество букв в первом слове");
console.log(kolvoSymbolFull, "Количество одинаковых букв в двух  словах"); 
console.log(kolvoSymbolFull);
if (kolvoSymbolA == kolvoSymbolFull){
    console.log("Данный вариант подходит!")
}
else {
    console.log("Данный вариант не подходит")
}


