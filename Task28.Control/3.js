a = 6;
b = 5;
c = 3;
if (a + b <= c){
    console.log("Треугольник - невозможен!");
}
else if (a + c <= b) {
    console.log("Треугольник - невозможен!");
}
else if (b + c <= a) {
    console.log("Треугольник - невозможен!");
}
else{
    console.log("Исходя из данных параметров, тругольник получить - реально!");
}