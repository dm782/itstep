let button = document.querySelector(".btn_click");
if(button){
    button.addEventListener("click", function(){

        let input = document.querySelector("#number");
        let x = input.value; // извлечь текст из поля ввода
        x = Number(x);
        let inputTwo = document.querySelector("#numberTwo");
        y = inputTwo.value;
        y = Number(y);
        let p = document.querySelector("p");
        p.innerHTML = x + y;
    
    });
}