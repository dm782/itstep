const inputField = document.querySelector('#inputField'); // id input
const button = document.querySelector('#button'); // id button
const div = document.querySelector('#div'); // id div

button.addEventListener('click', function () { // кнопка слушатель событий при клике
    text = inputField.value; // text равен значению из inputField
    
    let list = div.innerHTML; // list равен div с выводом на экран
    if (list === '') { // Если Лист пустой
        list += `<ul><li>${text}</li></ul>`; // Добавить li с текстом из inputField ранее уже присвоил text = inputField.value
    }
else {
        list = list.replace('</ul>', `<li>${text}</li></ul>`); // Иначе вернуть нужную строку без запятой всё слетает
    }
    
    div.innerHTML = list; // Вывести list на экран
});


// const inputField = document.querySelector('#inputField');
// const button = document.querySelector('#button');
// const div = document.querySelector('#div');

// button.addEventListener('click', function () {
//     const text = inputField.value;
//     let list = div.innerHTML;
//     if (list === '') {
//         list = `<ul><li>${text}</li></ul>`;
//     } else {
//         list = list.replace('</ul>', `<li>${text}</li></ul>`);
//     }
//     div.innerHTML = list;
// });