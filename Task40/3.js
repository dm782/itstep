auto = {
    name: "VW",
    model: "Polo",
    fuel: "Benz",
    print(){
        console.log(this.model, this.brand);
    }
}
carro = {
    country: "Germany",
    __proto__: auto,
    drive(){
        console.log("Made in", this.country);
    }
}
auto.print();