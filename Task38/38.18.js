a = [4, 9, 7, 3, 5];
a = a.map(function (item, index) {
    
    if (index % 2 == 1) {
        return 0;
    }
else{
    return item;
}
});
console.log(a);

