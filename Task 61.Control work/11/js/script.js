let button = document.querySelector(".btn_click");
let input = document.querySelector(".input_add");
let div = document.querySelector("div");

button.addEventListener("click", function () {
        
        let value = input.value;
        let tr = document.createElement("tr");
        div.insertAdjacentElement("beforeend", tr);
        tr.innerHTML = "<td>" + value + "</td>";
    

});