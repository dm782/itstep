class smallAnimal{
    animal;

    constructor(animal){
        this.animal = animal;
    }

}

class bigAnimal{
    animal;

    constructor(animal){
        this.animal = animal;
    }

}

class Goose extends smallAnimal{
    goose;

    constructor(animal, petSmall){
        super(animal)
        this.petSmall = petSmall;
    }

    getSize() {
        return "Малое животное"
    }

}

class Dragon extends bigAnimal{
    dragon;

    constructor(animal,petBig){
        super(animal);
        this.petBig = petBig;

    }

    getSize() {
        return "Большое животное"
    }

}

let pets = [];
let goose = new Goose("Goose");
pets.push(goose);
let dragon = new Dragon("Dragon");
pets.push(dragon);

pets.forEach(function (item) {
    console.log(item.getSize());

});
