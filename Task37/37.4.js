let a = [0,1,2,3];
let b = [0,1,2,3,3];
let c = a.concat(b);
d = a.length;
console.log(c);
let unique = c.filter((element,index) => {
    return c.indexOf(element) === index;
});
e = unique.length;
if (e == d){
    console.log("Массивы полностью совпадают")
}
else{
    console.log("Массивы не совпадают")
}
