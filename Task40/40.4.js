class Tovar{
    name;
    price;
    rating;

    constructor(name,price,rating){
        this.name = name;
        this.price = price;
        this.rating = rating;
    }
}

class Category{
    name;
    arrayProducts;

    constructor(){
    }    
}
class Basket {
    arrayBuyProducts;

    constructor(){

    }
}
class User{

    constructor(login,password,objectUser){
        this.login = login;
        this.password = password;
        this.objectUser = new Object();
    }
}
//let new Basket();
//let new User();
let foodStuff = new Category();
let miloRilo = new Category();
let magazine = new Category();
let arrayBuyProducts = [];
let arrayProducts = [];

