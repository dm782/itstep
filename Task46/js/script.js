let article = document.createElement("article");
document.body.insertAdjacentElement("afterbegin", article);
article.classList.add("news__item");
let a = document.createElement("a");
a.href =  "/news/we-offer-a-new-fertilizer-potassium-salt-60-nod/";
article.insertAdjacentElement("afterbegin", a);

let div1 = document.createElement("div");
div1.classList.add("news__img");
a.insertAdjacentElement("afterbegin", div1);

let image = document.createElement("img");
image.setAttribute("src", "/upload/iblock / 950 / 9509c6f8dc75758c59e66de60cffa317.webp");
image.setAttribute("alt", "We offer a new fertilizer – potassium salt 60% NOD");
div1.insertAdjacentElement("afterbegin", image);

let time = document.createElement("time");
time.innerHTML = "06.01.2023";
image.insertAdjacentElement("afterend", time);

let div2 = document.createElement("div");
div2.classList.add("news__desciption");
div1.insertAdjacentElement("afterend", div2);

let div3 = document.createElement("div");
div3.classList.add("news__title");
div2.insertAdjacentElement("afterbegin", div3);

let h4 = document.createElement("h4");
h4.innerHTML = "We offer a new fertilizer – potassium salt 60% NOD";
div3.insertAdjacentElement("afterbegin", h4);

let div4 = document.createElement("div");
div4.classList.add("news__text");
div3.insertAdjacentElement("afterend", div4);

let p = document.createElement("p");
p.innerHTML = "We are pleased to inform you that we have decided to expand our product range and add another noteworthy and effective product, potassium salt 60% NOD.";
div4.insertAdjacentElement("afterbegin", p);

let div5 = document.createElement("div");
div5.classList.add("news__more");
p.insertAdjacentElement("afterend", div5);

let text = document.createElement("span");
text.innerHTML = "more";
div5.insertAdjacentElement("afterbegin", text);


//2. Удалить из полученного кода все тег span, но оставить его содержимое.
let deleteS = text.getElementsByTagName("span");
if (deleteS.length) {
    Array.from(deleteS).forEach((item) => {
        item.innerHTML = item.innerText;
    });
}

// 3.Времени добавить  красный фон, белый цвет и внутренние отступы в 25px для даты.
time.style.backgroundColor = "#f00";
time.style.color = "white";
time.style.letterSpacing = "25px";

//4. Увеличить шрифт заголовка на 2px.
h4.style.fontSize = parseInt(getComputedStyle(h4, '').fontSize) + 2 + 'px';

//5. Удалить ссылку из разметки, не меняя остальной структуры, но при этом сохранить ее адрес.
article.firstElementChild.removeAttribute('href');

//6. Убернуть содержимое div с классом news__more в тег а и сделать ссылку на сохранненый адрес из предыдущего задания.

//7. Добавить у новой ссылки атрибут title со значением заголовка новости.

//8. Тег p заменить на тег b.
console.log(article.lastElementChild.nextSibling);
// article.nextElementSibling.replaceChild("p", "b")

//9. Тегу h4 - добавить следующие стили:
// font - weight: 500;
// line - height: 150 %;
// text - transform: uppercase;
// color: #000;
h4.style.fontWeight = "500";
h4.style.fontHeight = "150%";
h4.style.textTransform = "uppercase";
h4.style.color = "#000"
