let a = [8,5,7,1,4,10,3,12,9];
N = 3;
c = a.sort((a, b) => b - a);
console.log(c.slice(0, N));