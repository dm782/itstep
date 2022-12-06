str = ["mother","father","you","and","i"];
b = [str[0].length, str[1].length, str[2].length, str[3].length, str[4].length];
b.sort((a, b) => a - b);
c = b[0];
console.log(c, "Символ, длина самого короткого слова");
