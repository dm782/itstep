function success(a){
    if(a < 0){
        return true;
    }
    return false;
}
if (success(6)) {
    console.log("Число - отрицательное!")
} else {
    console.log("Число - положительное!")
}