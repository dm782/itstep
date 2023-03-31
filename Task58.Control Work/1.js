str1 = "Мама";
str2 = "Мама";
function checkLetters(str1, str2) {

    // Если длины строк не равны, возвращаем false
    if (str1.length !== str2.length) {
        return false;
    }
    // Преобразуем строки в массивы символов
    let arr1 = str1.split("");
    let arr2 = str2.split("");
    // Сортируем массивы по алфавиту
    arr1.sort();
    arr2.sort();
    // Сравниваем массивы поэлементно
    for (let i = 0; i < arr1.length; i++) {
        // Если элементы не равны, возвращаем false
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    // Если все элементы равны, возвращаем true
    return true;
}
console.log(checkLetters(str1, str2));

// a = "Мама";
// b = "Пум3а";
// function numbers(a, b){
//     if (a === b) {
//         return true;
//     }
//     else {
//         return false;
//     }
// }

// console.log(numbers(a,b))
