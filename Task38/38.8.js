let num = 527;
let a = num.toString();
let b = a.split("");
c = b.map(string => +string);
d = c.sort((a, b) => b - a).join('');
console.log(Number(d));