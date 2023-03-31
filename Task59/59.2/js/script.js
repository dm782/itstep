// Дано 2 поля ввода и кнопка.В каждое поле вводится время 
// в формате "часы:минуты".При нажатии на кнопку найти разницу между временами,
// учитывая, что второе время больше первого и вывести разницу также в формате "часы:минуты".
button = document.querySelector("button");
let Rr;
button.addEventListener("click", function(){
    let input1 = document.querySelector(".input1");
    let input2 = document.querySelector(".input2");
    let result = document.querySelector("p");
    let inputResult = input1.value;
    let inputResult2 = input2.value;
    inputResultFinal1 = inputResult.split(":");
    inputResultFinal2 = inputResult2.split(":");
    minutes1 = +(inputResultFinal1[0] * 60) + +inputResultFinal1[1];
    minutes2 = +(inputResultFinal2[0] * 60) + +inputResultFinal2[1];
    console.log(minutes2 - minutes1);
    Rr = minutes2 - minutes1; 
    result.innerHTML = Rr; //result - это p в html inputResult - то что считываю из input1
});

function timeConvert(Rr) {
    var hours = (Rr / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hour(s) and " + rminutes + " minute(s).";
}

console.log(timeConvert(200));