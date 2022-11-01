skwadr = 4;
radius = 10;
diagk = (skwadr * skwadr + skwadr * skwadr) ** 0.5;
console.log(diagk);
if (diagk < radius){
    console.log("Квадрат поместится в круг, круг в квадрат нет");
}
else{
    console.log("Круг поместится в квадрат, квадрат в круг нет");
}