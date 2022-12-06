function uP(studyHour,englishHour,relaxHour){
    return studyHour * 1.5 + englishHour - relaxHour * 2;
}
let c = uP(4,3,2);
console.log(c);