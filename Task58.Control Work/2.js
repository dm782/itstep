let array = [10, 20, 30, 40, 50]; // Определите массив целых чисел


function loopWithDelay(array) { // Определите функцию, которая принимает массив в качестве параметра
    
    for (let i = 0; i < array.length; i++) { // Пройдите по массиву с помощью цикла for
        
        setTimeout(function () { // Используйте setTimeout для вывода индекса с задержкой в 3 секунды
            console.log(i);
        }, i * 3000);
    }
}


loopWithDelay(array); // Вызовите функцию с массивом