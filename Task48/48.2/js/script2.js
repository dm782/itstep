const inputField = document.querySelector('#inputField'); // +
const button = document.querySelector('#button'); // +
const div = document.querySelector('#div'); // +

button.addEventListener('click', function () { // кнопка слушатель событий при клике

    let list = '<ul>'; // создает ul

        list += `<li>${inputField.value}</li>`; // значение из inputField
    
    list += '</ul>'; // Закрывает ul
    div.innerHTML = list; // Вывести list на экран
});
// div.children.length равна 0 то добавить маркированный список 