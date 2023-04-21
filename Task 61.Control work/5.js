arr = "мама  мыла  раму";
arr = arr.split(" ");

for (var i = 0; i < arr.length; i++) {
    if (arr[i] === "") {
        arr.splice(i, 1);
        
    }
}

console.log(arr.join(" "));
