a = 4;
b = 4;
c = 4;
if (a != b && b != c && a != c){
    console.log("Разносторонний треугольник");
}
else if (a == b && b == c && c == a){
    console.log("Равнобедренный треугольник");
}
else{
    console.log("Равносторонний тругольник");
}