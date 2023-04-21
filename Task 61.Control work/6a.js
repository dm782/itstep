s = "привет я так устал скучать";
s = s.split(" ");
arr = [];
for(i = 0; i < s.length; i++){
    arr.push(s[i].length);
}

let min = arr[0];

for (i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
        min = arr[i];
    }
}

console.log(min);
