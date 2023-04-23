var zp = 1040; // Зарплата
var trat = 400; // Обязательные траты
var now = new Date();
var second = '3/21/2023 0:00';
var salary = zp - trat;
var x = new Date(now);
var y = new Date(second);
days = (x - y) / 2600000000 * salary;

function trates() {
    const numbers = [];
    numbers.push(150);
    numbers.push(150);
    numbers.push(150);
    value = numbers.reduce((x, y) => x + y)
    return value;
}

result = days - trates();
console.log(result.toFixed(2), "Могу потратить прямо сейчас");
dni = (x - y) / (1000 * 60 * 60 * 24);
dprof = result / dni;
//console.log(dprof, "среднем в день накапливается");
dream = 1500; // Сколько нужно накопить на мечту
findream = dream / dprof;
rsr = new Date(x.getTime() + findream * 86400000);
if (findream < 0) {
    console.log("Ты в Минусе");
} else {
    console.log(rsr, "Примерно накопишь на мечту");
}

