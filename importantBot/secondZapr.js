const axios = require('axios');

const data = {
    login: 'dm93vtb@yahoo.com',
    password: 'qu62268500',
    service: "ServiceName",
    version: '1.0'
};

axios.post('https://direct.lptracker.ru/login', data)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
// const axiosTwo = require('axios');

// const url = 'https://direct.lptracker.ru/lead/77972070'; // const url = 'https://direct.lptracker.ru/lead/77972070' - вывод лида по id.      const url = 'https://direct.lptracker.ru/lead/103451/list?offset=0&limit=5&sort[updated_at]=3&filter[created_at_from]=1535529725' - вывод списка лидов
// const token = 'someToken';

// axiosTwo.get(url, { headers: { 'token': 'kcsEkB2Nnjn6RnlEz3VFRfnN7te4DYwQ' } })
//     .then(response => {
//         console.log(response.data);
//         // Обработка ответа сервера
//     })
//     .catch(error => {
//         console.error(error);
//         // Обработка ошибки
//     });



// const axios = require('axios');

// const data = {
//     login: 'dm93vtb@yahoo.com',
//     password: 'qu62268500',
//     service: "ServiceName",
//     version: '1.0'
// };

// axios.post('https://direct.lptracker.ru/login', data)
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error(error);
//     });

// const axiosTwo = require('axios');

// const url = 'https://direct.lptracker.ru/lead/77972070';
// const token = 'kcsEkB2Nnjn6RnlEz3VFRfnN7te4DYwQ';

// axiosTwo.get(url, { headers: { 'token': token } })
//     .then(response => {
//         const result = response.data.result;

//         console.log("ID:", result.id);
//         console.log("Contact ID:", result.contact_id);
//         console.log("Name:", result.name);
//         console.log("Deal:", result.deal);
//         console.log("View:", result.view);
//         console.log("Stage ID:", result.stage_id);

//         result.custom.forEach(customItem => {
//             console.log("Custom ID:", customItem.id);
//             console.log("Custom Name:", customItem.name);
//             console.log("Custom Type:", customItem.type);
//             console.log("Custom Value:", customItem.value);
//         });

//         console.log("Created At:", result.created_at);
//         console.log("Contact:", result.contact);
//     })
//     .catch(error => {
//         console.error(error);
//     });
