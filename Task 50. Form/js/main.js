let form = document.getElementById("reg_form");

form.addEventListener("submit", function(event){
    event.preventDefault(); // отменяет стандартные действия браузера

    // <span class="error-text">Заполните поле</span>

    let errors = document.querySelectorAll(".error-text");

    if(errors.length){
        Array.from(errors).forEach((errorSpan) => {
            errorSpan.parentElement.classList.remove("error");
            errorSpan.remove();
        })
    }

    let hasError = false;

    let data = new FormData(this)

    let fields = ["name", "phone", "email", "education", "sex", "about"]; // атрибут name
    
    fields.forEach((name) => {
        if (data.get(name) == ""){
            let span = document.createElement("span");
            span.className = "error-text"; // span.classList.add("error-text");
            span.innerText = "Заполните поле";
            let field = this.querySelector(`[name="${name}"]`);
            field.insertAdjacentElement("afterend", span);
            field.parentElement.classList.add("error");
            hasError = true;
        }
    });

    let hobbies = data.getAll("hobby[]");

    if (hobbies.length == 0) {
        let span = document.createElement("span");
        span.className = "error-text"; // span.classList.add("error-text");
        span.innerText = "Выберите хобби";
        document.querySelector("#hobby-3").parentElement.insertAdjacentElement("afterend", span);
        hasError = true;
    }

    if(!hasError){
        let div = document.querySelector(".result");

        div.innerHTML += `Имя: ${data.get("name")}<br>`;
        div.innerHTML += `Email: ${data.get("email")}<br>`;
        div.innerHTML += `Телефон: ${data.get("")}<br>`;
        div.innerHTML += `Образование: ${data.get("")}<br>`;
        div.innerHTML += `Пол: ${data.get("sex")}<br>`;
        div.innerHTML += `Хобби: ${data.getAll("hobby[]").join(",")}<br>`;
        div.innerHTML += `О себе: ${data.get("about")}<br>`;
        
        let path = data.get("avatar").name;
        let pathArray = path.split("\\");
        let file = pathArray[pathArray.length-1];
        div.innerHTML += `Аватар: ${file}<br>`;

        this.reset(); // очищение формы this==form
    }
})