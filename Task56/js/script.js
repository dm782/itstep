let input = document.querySelector("input"); // Создаю переменную input и ищу input

input.addEventListener('keyup', function (event) {
    
    let str = this.value;
    document.querySelector("p").innerHTML = str;        
});



// document.addEventListener('keydown', function (event) {
//     event.preventDefault();
//     if (event.key == "+" && event.ctrlKey) {
//         let li = document.createElement("li");
//         li.textContent = document.querySelectorAll("ul > li").length + 1;
//         document.querySelector("ul").append(li);
//     }

//     if (event.key == "-" && event.ctrlKey) {
//         if (document.querySelectorAll("ul > li").length > 0) {
//             document.querySelector("ul > li:last-child").remove();
//         }
//     }

// });                                                                                                                     



