//Task 1
let firstElement = document.querySelector("#first-element");
// firstElement = document.getElementById("first-element"); - альтернатива поиска по ID
if (firstElement) {
    firstElement.classList.add("www");
    firstElement.classList.remove("www");
    if (firstElement.classList.contains("www")) {
        console.log("Есть класс www")
    } else {
        console.log("Нету класса www")
    }
    firstElement.classList.toggle("www");

    console.log(firstElement.classList.length);

    for (let i = 0; i < firstElement.classList.length; i++) {
        console.log(firstElement.classList.item(i));
    }
    // аналог
    for (const item of firstElement.classList) {
        console.log(item);
    }

    firstElement.style.color = "#f00";
    firstElement.style.fontSize = "30px";
    firstElement.style.border = "1px solid #000";

    console.log(firstElement.tagName.toLowerCase());

    firstElement.insertAdjacentHTML("beforeend", "<span>мой любимый спан</span>");
    // вставка строкой
    let list = ["createElement", "appendChild", "insertBefore"];
    let out = "<ul>";
    list.forEach(function (item) {
        out += `<li>${item}</li>`;
    });
    out += "</ul>";

    firstElement.insertAdjacentHTML("beforeend", out);

    // вставка объектом
    let div = document.createElement("div");
    div.classList.add("neighbor");
    div.innerText = "еще один сосед";

    firstElement.insertAdjacentElement("beforebegin", div);
}

let secondElement = document.querySelector("#second-element");

if (secondElement) {
    let span = "<span>!!!</span>";
    secondElement.insertAdjacentHTML("afterbegin", span);
    secondElement.insertAdjacentHTML("afterend", span);
    secondElement.insertAdjacentHTML("beforebegin", span);
    secondElement.insertAdjacentHTML("beforeend", span);
}

let thirdElement = document.querySelector("#third-element");
if (thirdElement) {
    if (thirdElement.firstElementChild) {
        thirdElement.firstElementChild.style.color = "#f00";
    }

    if (thirdElement.lastElementChild) {
        thirdElement.lastElementChild.style.color = "#f00";
    }

    Array.from(thirdElement.children).forEach(function (element) {
        element.insertAdjacentText("beforeend", "!");
    });
}

let fourthElement = document.querySelector("#fourth-element");
if (fourthElement) {
    if (fourthElement.previousElementSibling) {
        fourthElement.previousElementSibling.insertAdjacentText("beforeend", "!");
    }

    if (fourthElement.nextElementSibling) {
        fourthElement.nextElementSibling.insertAdjacentText("beforeend", "!");
    }
    if (fourthElement.nextElementSibling.nextElementSibling) {
        fourthElement.nextElementSibling.nextElementSibling.insertAdjacentText("beforeend", "!");
    }
}

let fifthElement = document.querySelector("#fifth-element");
if (fifthElement) {
    if (fifthElement.parentElement) {
        fifthElement.parentElement.style.color = "#00f";
    }
    if (fifthElement.parentElement.parentElement) {
        fifthElement.parentElement.parentElement.style.color = "#ff0";
    }

    
    if(fifthElement){
        firstDiv = document.createElement("div");
        firstDiv.innerHTML = "1";
        fifthElement.insertAdjacentElement("beforebegin", firstDiv);
    
     
            secondDiv = document.createElement("div");
            secondDiv.innerHTML = "2";
        fifthElement.insertAdjacentElement("afterbegin", secondDiv);
      
   
            threeDiv = document.createElement("div");
            threeDiv.innerHTML = "3";
        fifthElement.insertAdjacentElement("beforeend", threeDiv);
    
   
        fourDiv = document.createElement("div");
        fourDiv.innerHTML = "4";
        fifthElement.insertAdjacentElement("afterend", fourDiv);
    }
        
        if (fifthElement) {
            let out = "<ol>";   
            var day = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];         
                for(let i = 0; i <= 6; i++){                    
                    out += `<li>${day[i]}</li>`;
                }
                out += "</ol>";
                fifthElement.insertAdjacentHTML("afterbegin", out);

            let weekend = document.getElementById('fifth-element');
            weekend.firstElementChild.style.color = 'red';
            }

    //- В div с текстом "2" вставить 2 span с произвольным текстом.В конец каждого span 
    //добавить в скобочках длину(в символах) содержимого span.
    if (fifthElement) {

        secondDiv = document.createElement("span");
        secondDiv.innerHTML = `33 корабля лавировали` + "(" + `33 корабля лавировали`.length + ")";
        fifthElement.insertAdjacentElement("beforebegin", secondDiv);

        threeDiv = document.createElement("span");
        threeDiv.innerHTML = `Карл у Клары` + "(" + `Карл у Клары`.length + ")";
        fifthElement.insertAdjacentElement("beforebegin", threeDiv);

        }
        if(fifthElement){
            threeDiv = document.createElement("a");
            threeDiv.innerHTML = "https://www.google.com/";
            threeDiv.style.textDecoration = "underline"
            threeDiv.style.border = "1px solid red"
            fifthElement.insertAdjacentElement("beforeend", threeDiv);
        }

        if(fifthElement){
            
  
            fourDiv.classList.add("news");
            fourDiv.classList.add("good-news");
            
        }

    }

// let secondElement = document.querySelector("#second-element");
// if (secondElement) {
//     var point = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
//     Array.from(point).forEach(function (item) {
//         document.write('<li> Пункт' + item + '</li>');
//     });
// }