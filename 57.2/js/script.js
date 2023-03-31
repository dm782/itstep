let inputKick = document.querySelector("input"); 

inputKick.addEventListener("mouseover", function (event) { 
    this.classList.add("bg-blue"); 
});

let inputDown = document.querySelector("input");

inputDown.addEventListener("mouseout", function (event) {
    this.classList.remove("bg-blue");
});