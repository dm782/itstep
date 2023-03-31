class Person {
    age;
    fullName;

    constructor(age, fullName) {
        this.age = age;
        this.fullName = fullName;
    }

    toString() {
        return `Age:${this.age}  full name:${this.fullName} `
    }

}

class Driver extends Person {
    expirience;

    constructor(age, fullName, expirience) {
        super(age, fullName)
        this.expirience = expirience;

    }
    toString() {
        return `Age: ${this.age}, fullName: ${this.fullName}, experience: ${this.experience}`;
    }
}

class Enigne{
power;
company;

constructor(power,company){
    this.power = power;
    this.company = company;
}

    toString(){
        return `power: ${this.power} company: ${this.company}`;
    }
}



class Car{
    carClass;
    engine;
    driver;   
    marka;

    constructor(carClass, engine, driver, marka) {
        this.carClass = carClass;
        this.engine = engine;
        this.driver = driver;
        this.marka = marka;
    }

    start(){
        return this.power = 100;
    }

    stop(){
        return this.power = 0;
    }

    turnRight(){
        console.log("Car turn right");
    }

    turnLeft(){
        console.log("Car turn left");
    }

    toString(){
        return `Class: ${this.carClass}, Engine: ${this.engine.toString()}, Driver: ${this.driver.fullName}, ${this.driver.experience}, Marka: ${this.marka}`;
    }

}

class Lorry extends Car {
    constructor(carClass, engine, marka, carrying) {
        super(carClass, engine, marka);
        this.carrying = carrying;
    }
    toString() {
        return `Car-Class: ${this.carClass} Engine: ${engine} Marka: ${this.marka} Carrying: ${this.carrying}`;
    }
}

class sportCar extends Car{
speed;

    constructor(carClass, engine, driver, marka, speed){
        super(carClass, engine,driver, marka);
        this.speed = speed;
}
toString(){
    return `Car-Class: ${this.carClass} Enigne: ${this.engine} Marka: ${this.marka} Speed: ${this.speed}`;
}
}

class Client extends Person{
    adres;
    payment;

    constructor(adres, payment, age, fullName){
        super(age, fullName)
        this.adres = adres;
        this.payment = payment;
    }
    toString(){
        return `adres ${this.adres} payment ${this.payment} age ${this.age} fullname ${this.fullName}`
    }
}

class Taxi extends Car{
    tariff;
    constructor(carClass, engine, driver, marka,tariff){
        super(carClass, marka, engine, driver)
        this.tariff = tariff;
    }
    toString(){
        return `Марка автомобиля ${this.marka}, водитель ${this.driver.toString()}, тариф ${this.tarif}`
    }
}

class Order{
    distance;
    taxi;
    client;

    constructor(distance, taxi,client){
        this.distance = distance;
        this.taxi = taxi;
        this.client = client;
    }
    getPrice(){
        return this.distance * this.taxi.tariff;
    }
    toString(){
        console.log(this.client.fullName, this.client.payment, this.distance, this.getPrice());
    }
}

let engine = new Enigne(300, "Porche");
let driver = new Driver(29, "Mitin Dmitry", 5);
let ferrari = new sportCar("Sport Class", engine, driver, "Mercedes",300);
let client = new Client("Moskovski Avenue 55", 7, 48, "Иванов Пётр Петрович");
let taxi = new Taxi("Econom", "Renault Motors", engine, driver,"Econom");
let person  = new Order(5, taxi, client);


console.log(ferrari);
console.log(client);
console.log(taxi);
console.log(person);
console.log(ferrari.toString());
console.log(client.toString())



