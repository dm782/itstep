function changeColor() {
    // Получаем элементы select и div по id
    let select = document.getElementById("color-select");
    let div = document.getElementById("color-block");
    // Устанавливаем цвет фона блока равным значению выбранного пункта списка
    div.style.backgroundColor = select.value;
}