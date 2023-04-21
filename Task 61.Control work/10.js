class Student {
    constructor(firstName, lastName, group, averageMark) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.group = group;
        this.averageMark = averageMark;
    }

    getScholarship() {
        if (this.averageMark === 5) {
            return 100;
        } else {
            return 80;
        }
    }
}

class Aspirant extends Student {
    constructor(firstName, lastName, group, averageMark, scientificWork) {
        super(firstName, lastName, group, averageMark);
        this.scientificWork = scientificWork;
    }

    getScholarship() {
        if (this.averageMark === 5) {
            return 200;
        } else {
            return 180;
        }
    }
}

const students = [
    new Student('Иван', 'Иванов', 'Группа1', 3),
    new Student('Петр', 'Петров', 'Группа2', 2),
    new Aspirant('Сидор', 'Сидоров', 'Группа3', 3, 'Научная работа'),
];

students.forEach((student) => console.log(student.getScholarship()));