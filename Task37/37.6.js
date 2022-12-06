let a = [1, 3, 6, 4, 3, 3, 5, 6];
let b = a.length;
console.log(b, "Количество элементов массива");
let resa = a.reduce((acc, number) => acc + number, 0);
console.log(resa, "Сумма всех элементов массива");
c = resa / b;
console.log(c, "Среднее арифметическое");
let d = a.filter(function (elem) {
    if (elem >= c) {
        return true;
    }
    else {
        return false;
    }
});
console.log(d);