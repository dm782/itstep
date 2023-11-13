let makeOrder = "09.11.2023 00:00" = makeOrder.split;
var time = formattedDay.split("").splice(11, 5).join("");
var dey = formattedDay.split("").splice(0, 10).join("");
console.log(dey);
console.log(time);



// const fs = require('fs');
// const axios = require('axios');

// const url = 'https://direct.lptracker.ru/lead/77972070';
// const token = 'kcsEkB2Nnjn6RnlEz3VFRfnN7te4DYwQ';

// axios.get(url, { headers: { 'token': token } })
//     .then(response => {
//         const jsonData = JSON.stringify(response.data, null, 2);

//         fs.writeFile('result.json', jsonData, 'utf8', (err) => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//             console.log('Результат сохранен в файл result.json');
//         });
//     })
//     .catch(error => {
//         console.error(error);
//     });
