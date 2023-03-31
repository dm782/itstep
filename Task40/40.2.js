class Student{ // То что перед скобками в конструкторе пишу здесь
    firstname;
    lastName;
    group;
    averageMark;
    
    constructor(name, surname, group,mark){ // То что указываю ПОСЛЕ равно пишу в скобки. Но это другие значения
        this.firstName = name;
        this.lastName = surname;
        this.group = group;
        this.averageMark = mark;
    }
    
    getScholarship(){
        if(this.averageMark == 5){
            return "100 $";
        }else{
            return "80 $";
        }
    }
}

class Aspirant extends Student{
    scientificResearch;
    constructor(name, surname, group, mark, scientificResearch) { // Прописываю старые в скобках из конструктора с новым значением которое хочу добавить
        super(name, surname, group, mark); // Прописываю все старые в скобках из конструктора
        this.scientificResearch = scientificResearch  //Прописываю что появилось из нового
    }
    getScholarship() {
        if (this.averageMark == 5) {
            return "200 $";
        } else {
            return "180 $";
        }
    }
}

let students = [];
let student = new Student("Дмитрий", "Митин",3, 4);
students.push(student);
let aspirant = new Aspirant("Александр", "Петров", 5, 5);
students.push(aspirant);

students.forEach(function(item){
    console.log(item.getScholarship());

});