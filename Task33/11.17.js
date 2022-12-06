let a = [];

const min = -16, max = 2, n = 10;

for (let i = 0; i < n; i++) {
    a[i] = Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(a);

let b = a.map((c) => c + 25);
console.log(b);