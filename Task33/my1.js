let a = [];

const min = 50, max = 100, n = 10;

for (let i = 0; i < n; i++) {
    a[i] = Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(a);

let res = a.filter(function(b) {
    if (b % 2 == 0){
        return true;
    } else {
        return false;
    }
});
console.log(res);