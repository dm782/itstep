// 4. Написать функцию, принимающую в аргументах массив и возвращающую новый массив,
// в котором отсортированы все нечетные числа по возрастанию, четные числа по убыванию,
// но при этом сами чётные и нечетные числа остаются на своих местах. ([7, 3, 4, 9, 5, 2, 17] -> [3, 5, 2, 7, 9, 4, 17]).

arr = [3,1,8,14,5,9,12,6,22,17,43,52]

let nechEl = arr.filter(function (elem) {
    if (elem % 2 == 0) {
        return true;
    }
});
sortNechEl = nechEl.sort((a, b) => a - b);
console.log(sortNechEl);

let chetEl = arr.filter(function (elem) {
    if (elem % 2 != 0) {
        return true;
    }
});
sortChetEl = chetEl.sort((a, b) => b - a);
console.log(sortChetEl);