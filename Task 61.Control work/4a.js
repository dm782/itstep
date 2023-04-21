let s = "правило";
let arr =[];
for(i = 0; i < s.length; i++){
    if (s[i] == "а" || s[i] == "я" || s[i] == "у" || s[i] == "ю" || s[i] == "о" || s[i] == "е" || s[i] == "ё" || s[i] == "э" || s[i] == "и" || s[i] == "ы"){
        arr.push(s[i]);
    }
}
console.log(arr.length);