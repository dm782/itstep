let button = document.querySelector("button");

if(button){
     button.onclick = function(){
        console.log("Кнопка нажата");
    }

    button.addEventListener("click", function(){
        console.log("Кнопка нажата 1");
    });

    button.addEventListener("click", function(){
        console.log("Кнопка нажата 2");
    });
    button.addEventListener("dblclick", function(){
        console.log("Кнопка нажата 3");
    });

    button.onmouseover = function(){
        console.log("На меня навели");
    }
    button.onmouseout = function(){
        console.log("С меня убрали руки");
    }
}

function print(a,b){
    console.log("Я нажался через js-функцию", a, b);
}

