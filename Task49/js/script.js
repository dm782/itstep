let buttonAdd = document.querySelector(".btn_add");                     // Ищу элемент с классом btn_add
buttonAdd.addEventListener("click", function () {                       // Слушатель событий кнопки введённой строчкой выше
    let food = document.querySelector("#food").value;                   // Ищу элемент с id(#) food забирая значение находящееся в нём
    let weight = document.querySelector("#weight").value;               // Ищу элемент с id(#) weight забирая значение находящееся в нём

    let tr = document.createElement("tr");                              // Создаю элемент tr

    let tdFood = document.createElement("td");                          // Создаю элемент td для input с id food
    tdFood.innerText = food;                                            // Вывожу на экран

    let tdWeight = document.createElement("td");                        // Создаю элемент td для input с id weight
    tdWeight.innerText = weight;                                         //Вывожу на экран

    tr.insertAdjacentElement("beforeend", tdFood);
    tr.insertAdjacentElement("beforeend", tdWeight);


});