let counter = document.getElementById('text'); 
let button = document.getElementById('create_text'); 
button.addEventListener('click', () => {
    text.outerHTML = '<b>' + text.innerHTML + '</b>' 
});
