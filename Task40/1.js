pryam = {
    a: 3,
    b: 8,
    plosc: function(){
        return this.a * this.b;
    },
    perim: function(){
        return this.a * 2 + this.b * 2;
    } 
}
let a = pryam.plosc();
let b = pryam.perim();
console.log(a);
console.log(b);