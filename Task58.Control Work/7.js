a = [1,3,4];
b = [3,4,7];
function concat(a,b){
    let c = a.concat(b);
    return c;
}

let d = concat(a, b);

function unique(arr) {
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index;
    });
}

console.log(unique(d));