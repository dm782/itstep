let counter = document.getElementById('counter'); // в html p в нём span с id counter
let button = document.getElementById('increment-button'); // в html button с id increment-button
button.addEventListener('click', () => {
    counter.innerText = parseInt(counter.innerText) + 1; // counter - название id абзаца,
    //innerHTML – самый простой способ считать или изменить HTML-содержимое элемента
    //parseInt преобразует первый переданный ей аргумент в строковый тип, интерпретирует его и возвращает целое число или значение NaN
    //(counter.innerText) + 1 - изменить id counter на 1
});
