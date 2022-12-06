function plusNum(b){
    return b >= 0;
}

let a = [-4,-6,4,3,-2,3,7,-9,4,-2].filter(plusNum);
console.log(a);
let b = a.map(a => a * -1);
console.log(b);
