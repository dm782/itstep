var classes = document.querySelector("#classes")

console.log(classes.classList);

button.addEventListener('click', () => {

    let watchClasses = document.getElementById("classes");
    watchClasses.innerHTML = classes.classList;
    
    let ol = document.createElement("ol"); // +
    watchClasses.insertAdjacentElement("afterbegin", ol); // +
    for (let i = 0; i <= 2; i++) { // +
    let li = document.createElement("li"); // +
    li.innerHTML += `${classes.classList[i]}`;
    ol.insertAdjacentElement("beforeend", li);
}
});



// let watchClasses = document.getElementById("classes");
// watchClasses.innerHTML = classes.classList;

