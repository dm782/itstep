str = "Папа мама";
str = str.toLowerCase();
let set = [...new Set(str)].join('');
let get = set.split(" ").join("");
console.log(get);