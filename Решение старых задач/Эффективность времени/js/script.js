let button = document.querySelector(".btn")

button.addEventListener("click", function(){
    let hourStudy = document.querySelector(".hourStudy");
    let hourEnglish = document.querySelector(".hourEnglish");
    let allHour = document.querySelector(".allHour");

    hourStudyValue = hourStudy.value;
    hourEnglishValue = hourEnglish.value;
    allHourValue = allHour.value;

    let div = document.querySelector("div");

    div.innerHTML = (+hourStudyValue + +hourEnglishValue * 0.33) / +allHourValue;
})