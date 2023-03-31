str = "I feel that spring soon";

function glas(str){
    arr = str.split('');
    return arr;
}
strTwo = glas(str);

let vowels = ['a', 'e', 'i', 'o', 'u',];
let filtered = strTwo.filter(function (value, index, arr) {
    return vowels.includes(value);
});
console.log(filtered.length);


