let form = document.getElementById("reg_form");

form.addEventListener("submit", function(event){
    event.preventDefault();
    let div = document.querySelector(".result");
    let name = document.querySelector("#name").value;
    let span1 = document.querySelector(".spanOne");
    if(name.value == ""){
        span1.style.visibility = "hidden";
    }
    else{
        span1.style.visibility = "visible";
    }
    div.innerHTML = div.innerHTML + `Имя: ${name}<br>`;
    let span2 = document.querySelector(".spanTwo");
    if (name.value == "") {
        span2.style.visibility = "hidden";
    }
    else {
        span2.style.visibility = "visible";
    }
    let email = document.querySelector("#email").value;
    div.innerHTML = div.innerHTML + `E-mail: ${email}<br>`;
    let span3 = document.querySelector(".spanThree");
    if (name.value == "") {
        span3.style.visibility = "hidden";
    }
    else {
        span3.style.visibility = "visible";
    }
    let phone = document.querySelector("#phone").value;
    div.innerHTML = div.innerHTML + `Телефон: ${phone}<br>`;
    let education = document.querySelector("#education").value;
    div.innerHTML = div.innerHTML + `Образование: ${education}<br>`;
    let sexm = document.querySelector("#sex-m");

    if(sexm.checked){
        div.innerHTML +=`Пол: ${sexm.value}<br>`;
    }
    let sexf = document.querySelector("#sex-f");

    if (sexf.checked) {
        div.innerHTML += `Пол: ${sexf.value}<br>`;
    }
    let hobby1 = document.querySelector("#hobby-1");

    if (hobby1.checked) {
        div.innerHTML += `Хобби: ${hobby1.value}<br>`;
    }
    let hobby2 = document.querySelector("#hobby-2");

    if (hobby2.checked) {
        div.innerHTML += `Хобби: ${hobby2.value}<br>`;
    }
    let hobby3 = document.querySelector("#hobby-3");

    if (hobby3.checked) {
        div.innerHTML += `Хобби: ${hobby3.value}<br>`;
    }
    let about = document.querySelector("#about").value;
    div.innerHTML = div.innerHTML + `О себе: ${about}<br>`;
   
    // let hobby = document.querySelector("#hobby").value;
    // div.innerHTML = div.innerHTML + `Пол: ${hobby}<br>`;
    // let about = document.querySelector("#about").value;
    // div.innerHTML = div.innerHTML + `Пол: ${about}<br>`;

    return false;
})