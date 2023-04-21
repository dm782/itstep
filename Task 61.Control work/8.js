// Дано предложение.Найти символ, который чаще всего в нем встречается.

arr = "пример принятия мер за мир кого задел тому дам рим";
arr = arr.split("");
console.log(arr);

arr = arr.filter(str => /\S/.test(str));
console.log(arr);

const result = arr.reduce((acc, curr) => {
    acc[curr] ? acc[curr]++ : (acc[curr] = 1);
    return acc;
}, {});
console.log(result);