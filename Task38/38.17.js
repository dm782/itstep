str = "Мама на маме папа на даме"
str = str.toLowerCase();

strArray = str.split("");

let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)

console.log([...new Set(findDuplicates(strArray))]);
