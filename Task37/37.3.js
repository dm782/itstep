a  = [4,-9,1,4,-3,-6,9,12,3];
b = [2,7,5,3,-1,-8,4,10,3,7];
c = [5,2,8,5,3,10,15,-3,8,2];
let d = a.concat(b,c);
d.sort();
e = d.sort(function(a,b){
    return b - a;
});
console.log(e);