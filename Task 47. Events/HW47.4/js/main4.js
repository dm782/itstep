function swapValues() {
let inputOne = document.getElementById("valueOne");
let inputTwo = document.getElementById("valueTwo");
let temp = inputOne.value;
inputOne.value = inputTwo.value;
inputTwo.value = temp;
}