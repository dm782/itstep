let user = {
    name: "Иван",
    age: 30
};

cloneObj = {};
for (newObj in user){
    cloneObj[newObj] = user[newObj]; // newObj Должны быть одинаковы с 1ым значением в for
}

cloneObj = Object.assign({}, user);

console.log (cloneObj, user);