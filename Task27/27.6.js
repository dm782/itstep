iter = 1;
N = 8;
result = 0;
for (let i = 1; i <= N; i++) {
    if (i <= N) {
        sum = i * i;
        result += sum;
        console.log("Итерация", iter++, "Сумма", result);
    }
}