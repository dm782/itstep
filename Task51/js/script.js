let form = document.getElementById("reg_form");

form.addEventListener("submit", function (event) {
    event.preventDefault();
});

let buttonAdd = document.querySelector(".btn_add");

buttonAdd.addEventListener("click", function () { 
    let city = document.querySelector("#city").value;
    // div.innerHTML += `Имя: ${data.get("city")}`;
    let area = document.querySelector("#area").value; 
    // div.innerHTML += `Имя: ${data.get("area")}`;
    let nameCity = document.querySelector("#name-city").value; 
    // div.innerHTML += `Имя: ${data.get("nameCity")}`;

    let tr = document.createElement("tr");

    let tdCity = document.createElement("td");
    div.innerHTML += `Имя: ${data.get("city")}`;
    // tdCity.innerText = city;

    let tdArea = document.createElement("td");                        
    tdArea.innerText = area; 

    let tdNameCity = document.createElement("td");                        
    tdNameCity.innerText = nameCity; //Если убрать checked всегда выдаёт город

    let tdAction = document.createElement("td");

    let editButton = document.createElement("button");
    editButton.innerText = "Редактировать";
    tdAction.insertAdjacentElement("beforeend", editButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Удалить";
    tdAction.insertAdjacentElement("beforeend", deleteButton);

    tr.insertAdjacentElement("beforeend", tdCity);
    tr.insertAdjacentElement("beforeend", tdArea); 
    tr.insertAdjacentElement("beforeend", tdNameCity);   
    tr.insertAdjacentElement("beforeend", tdAction);   

    let tbody = document.querySelector("tbody");                         
    tbody.insertAdjacentElement("beforeend", tr);

    deleteButton.addEventListener("click", function () {
        this.parentElement.parentElement.remove();
});
//Сюда добавить
editButton.addEventListener("click", function () {
    let city = this.parentElement.parentElement.firstElementChild.innerText;
    let area = this.closest("tr").children[1].innerText;
    let nameCity = this.closest("tr").children[2].innerText;

    document.querySelector("#city").value = city;
    document.querySelector("#area").value = area;
    document.querySelector("#name-city").value = nameCity;
    let editTr = document.querySelector(".edit");
    if (editTr) {
        editTr.classList.remove("edit");
    }
    this.parentElement.parentElement.classList.add("edit");
    });
}); 


let buttonSave = document.querySelector(".btn_save");
buttonSave.addEventListener("click", function () {
    let editTr = document.querySelector(".edit");
    if (editTr) {
        let city = document.querySelector("#city").value;
        let area = document.querySelector("#area").value;
        let nameCity = document.querySelector("#name-city").value;

      
        editTr.firstChild.innerText = city;
        editTr.children[1].innerText = area;
        editTr.children[2].innerText = nameCity;
        // editTr.firstChild.innerText = food;
        // editTr.children[1].innerText = weight;

        editTr.classList.remove("edit");
    }
});


//Убрать querySelector убрать ИнсертАджесент добавить от соседа аналог секс