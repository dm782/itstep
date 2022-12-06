let str = "Добрый вечер - дорогие как Вы!? Расскажите, как ваши дела!";
while (str.indexOf("!") != -1) {
    str = str.replace("!", "");
    str = str.replace("?", "");
    str = str.replace("-", "");
    str = str.replace(",", "");
}
console.log(str);