class Phone {
    number;
    model;
    weight;


constructor(number,model,weight){
    this.number = number;
    this.model = model;
    this.weight = weight;
    }
    receiveCall(name) {
        console.log(`Сейчас вам звонит ${name}`);
    }
    getNumber() {
        return this.number;
    }
}

let Nokia = new Phone("+375336512148", "Nokia", "260");
let Poco = new Phone("+375292905417", "Poco", "321");
let Redmi = new Phone("+375336718790", "Redmi", "160");

console.log(Nokia, Poco, Redmi);

Nokia.receiveCall("Дима");
let number = Nokia.getNumber();
console.log(number);

Poco.receiveCall("Маша");
number = Poco.getNumber();
console.log(number);

Redmi.receiveCall("Даша");
number = Redmi.getNumber();
console.log(number);
