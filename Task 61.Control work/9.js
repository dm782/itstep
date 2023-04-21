let date = '3/1/2023 0:00'
let x = new Date(date);
let futureDate = new Date(x.getTime() + (10 * 24 * 60 * 60 * 1000));
console.log(futureDate);