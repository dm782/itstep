let buttonAdd = document.querySelector(".btn_add");                     // Ищу элемент с классом btn_add
buttonAdd.addEventListener("click", function () {                       // Слушатель событий кнопки введённой строчкой выше
    let food = document.querySelector("#food").value;                   // Ищу элемент с id(#) food забирая значение находящееся в нём
    let weight = document.querySelector("#weight").value;               // Ищу элемент с id(#) weight забирая значение находящееся в нём

    let tr = document.createElement("tr");                              // Создаю элемент tr

    let tdFood = document.createElement("td");                          // Создаю элемент td для input с id food
    tdFood.innerText = food;                                            // Вывожу на экран

    let tdWeight = document.createElement("td");                        // Создаю элемент td для input с id weight
    tdWeight.innerText = weight;                                         //Вывожу на экран

    tr.insertAdjacentElement("beforeend", tdFood);                      //tr наружний поэтому в начале td внутренний потому в скобках
    tr.insertAdjacentElement("beforeend", tdWeight);                    //tr наружний поэтому в начале td внутренний потому в скобках

    let tbody = document.querySelector("tbody");                         //Найти элемент tbody +++
    tbody.insertAdjacentElement("beforeend", tr);                        //Вывести tdoby в месте "beforeend" +++

    let deleteButton = document.createElement("button");                 //Создаю кнопку
    deleteButton.innerText = "Удалить";                                  //Вывожу кнопку на экран с текстом "Удалить"
    tdAction.insertAdjacentElement("beforeend", deleteButton);           //Вывожу кнопку в месте "beforeend"

    deleteButton.addEventListener("click", function () {                 //Слушатель событий для Кнопки удаления
        this.parentElement.parentElement.remove();                       //Этот родительский элемент.родительский элемент удалить
    });                                                                  //Закрывающий фигурный тег

});