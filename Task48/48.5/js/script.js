let button = document.querySelector(".click"); // . - запрос по классу
if (button) {
    button.addEventListener('click', function () {
        let input = document.querySelector("#input");
        let a = input.value;
        a = Number(a);
        let inputOne = document.querySelector("#inputOne"); // # - запрос по id
        let b = inputOne.value;
        b = Number(b);
        let div = document.querySelector("div");
        div.innerHTML = `Сложение:${a + b} Разность:${a - b} Произведение:${a * b} Частное:${a / b}`; 
        // div.innerHTML = a - b;
        // div.innerHTML = a / b;
        // div.innerHTML = a + b;
    });
}
