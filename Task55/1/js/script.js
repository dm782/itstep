let button = document.querySelector(".btn_click"); // Ищу тег кнопки по его id
let div = document.querySelector("div"); // Ищу тег
button.addEventListener("click", function () { //Стандартный слушатель событий
    ul = document.createElement("ul"); // Создаю элемент ul
    div.insertAdjacentElement("afterbegin", ul); // Вставляю в div
    for (let i = 1; i <= number.value; i++) { // Цикл for, number взято из input html
        ul.innerHTML += `<li>${i}</li>` // ul вывести на экран <li>${i}</li>
}
});