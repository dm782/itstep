date = '2025-12-31'
while (date.indexOf("-") != -1) {
    date = date.replace("-", ".");
}
console.log(date);