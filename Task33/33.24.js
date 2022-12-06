function plusNum(b){
    return b >= 0;
}
let a = [5,-9,4,-7,5,3,-2,-7,4,-15].filter(plusNum);
console.log(a);
let c = a.map(a => a ** 0.5);
console.log(c);