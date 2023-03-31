a = 4;
b = 4;
c = 5;
function unique(a,b,c){
    arr = [a,b,c]
    return arr;
}

mass = unique(a, b, c);

const uniqueArr = mass.filter((value, index) => mass.indexOf(value) === index);
console.log(uniqueArr);
