function getDivisorsRange(a, b) {
    if (a > b) {
        var temp = a;
        a = b;
        b = temp;
    }
    result = new Array();
    var index = 0;
    for (let i = a; i <= b; i++) {
        result.push({
            num: i,
            divisors: new Array(),
        })
        for (let j = 1; j <= i; j++) {
            if (i % j == 0) {
                result[index].divisors.push(j);
            }
        }
        index++;
    }
    return result;
}

getDivisorsRange(25, 40);