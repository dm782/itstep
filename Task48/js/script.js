const inputField = document.querySelector('#inputField'); // id
const button = document.querySelector('#button'); // id
const div = document.querySelector('#div'); // id

button.addEventListener('click', function () {
    const num = Number(inputField.value); // Перевожу Num в число
    let list = '<ul>'; // Делаю list с ul
    for (let i = 1; i <= num; i++) { // цикл for i до num
        list += `<li>Пункт ${i}</li>`; // вывести через цикл Пункт с нужным количеством
    }
    list += '</ul>'; // Закрытие ul
    div.innerHTML = list; // Вывести list на экран
});
// div.children.length равна 0 то добавить маркированный список