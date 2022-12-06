let vowels = "уеыаоэяиюё";
let sagl = "бвгджзйклмнпрстфхцчшщ"
let word = "Экстракарамелизирован";
word = word.toLowerCase();

let glas = word.split("").filter((item) => vowels.includes(item)).join("").toUpperCase();
let sogl = word.split("").filter((item) => sagl.includes(item)).join("");
console.log(glas);
console.log(sogl);
