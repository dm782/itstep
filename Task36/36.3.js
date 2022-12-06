str = "Мама мыла раму";
b = str.split("");// "a" - указанная подстрока
console.log(b);
u = b.filter(function(item,pos){
    return b.indexOf(item) == pos;
});
console.log(u);
