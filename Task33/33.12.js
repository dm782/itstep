let a = [1, 2, 3, 4, 5];
let b = a.splice(1, 0, 'a', 'b',);
let c = a.splice(6, 0, 'c');
let d = a.splice(8, 0, 'e');
console.log(a);