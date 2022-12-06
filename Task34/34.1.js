let a = [3,-3,5,4,7,8,-2,5,-9];

b = a.filter(function (item) {
    return item > 0; // возвращает только положительные элементы
});

console.log(b);

c = b.map(function (item) { // b.map работает так же как a.filter
    return item ** 2;
});
console.log(c);