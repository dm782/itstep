let a = [];

const min = 50, max = 100, n = 10;

for (let i = 0; i < n; i++) {
    a[i] = Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(a);

let b = a.reverse();
console.log(b);