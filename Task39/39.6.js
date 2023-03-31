// function sumSalaries(salaries) {
//     let sum = 0;
//     for (let salary of Object.values(salaries)) {
//         sum += salary;
//     }
//     return sum;
// }

// let salaries = {
//     John: 100,
//     Ann: 160,
//     Pete: 130
// };

// console.log(sumSalaries(salaries));   
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}
let res = 0;

for (boot in salaries){ // Любое значение вместо boot
    res += salaries[boot]; // повтор первой строчки в for
}
console.log(res);