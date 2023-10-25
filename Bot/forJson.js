const fs = require('fs');
const axios = require('axios');

const url = 'https://direct.lptracker.ru/lead/77972070';
const token = 'kcsEkB2Nnjn6RnlEz3VFRfnN7te4DYwQ';

axios.get(url, { headers: { 'token': token } })
    .then(response => {
        const jsonData = response.data;

        if (jsonData.contact && jsonData.contact.details) {
            const details = jsonData.contact.details;

            const result = {
                details: details.map(detail => ({ Details: detail }))
            };

            fs.writeFile('result.json', JSON.stringify(result, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Результат сохранен в файл result.json');
            });
        } else {
            console.error('Некорректный формат данных в ответе API');
        }
    })
    .catch(error => {
        console.error(error);
    });



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
