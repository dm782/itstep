str = "волгоград";
str = str.split("");
function abc(str){
    let pattern = "аяуюоеёэиы";
    let count = str.filter((letter) => pattern.includes(letter)).length;
    return count;
}

console.log(abc(str));


