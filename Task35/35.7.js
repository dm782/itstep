let a = 'Я-учу-javascript!';
while (a.indexOf("-") != -1) {
    a = a.replace("-", "!");
}
console.log(a);