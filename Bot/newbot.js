const axios = require('axios'); // Авторизация

const data = {
    login: 'dmitryworkmitin@gmail.com',
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

// Замените на ваш реальный токен
// const token = 'z0Sayl6q2L5Ce17VWMixW3s2mvx1mGqF'; 
// // Замените на ваш project_id
// const projectId = 103451; 
// const offset = 10;
// const limit = 1;
// const sort = { updated_at: 3 };
// const filter = { created_at_from: 1535529725 };
// const isDeal = false; // true для сделок, false для лидов

// const url = new URL(`https://direct.lptracker.ru/lead/${projectId}/list`);
// url.searchParams.append('offset', offset);
// url.searchParams.append('limit', limit);
// Object.keys(sort).forEach(key => url.searchParams.append(`sort[${key}]`, sort[key]));
// Object.keys(filter).forEach(key => url.searchParams.append(`filter[${key}]`, filter[key]));
// url.searchParams.append('is_deal', isDeal);

// fetch(url, {
//   method: 'GET',
//   headers: {
//     'token': token
//   }
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Лиды:', data);
//   })
//   .catch(error => {
//     console.error('Ошибка:', error);
//   });

// const token = 'z0Sayl6q2L5Ce17VWMixW3s2mvx1mGqF'; 
// const projectId = 103451; 
// const offset = 10;
// const limit = 1;
// const sort = { updated_at: 3 };
// const filter = { created_at_from: 1535529725 };
// const isDeal = false; 

// const url = new URL(`https://direct.lptracker.ru/lead/${projectId}/list`);
// url.searchParams.append('offset', offset);
// url.searchParams.append('limit', limit);
// Object.keys(sort).forEach(key => url.searchParams.append(`sort[${key}]`, sort[key]));
// Object.keys(filter).forEach(key => url.searchParams.append(`filter[${key}]`, filter[key]));
// url.searchParams.append('is_deal', isDeal);

// fetch(url, {
//   method: 'GET',
//   headers: {
//     'token': token
//   }
// })
//   .then(response => response.json())
//   .then(data => {
//     if (data.status === 'success') {
//       const leads = data.result;
//       console.log('Лиды:', leads);

//       // Сохранение данных в JSON файл
//       const json = JSON.stringify(leads, null, 2);
//       const blob = new Blob([json], { type: 'application/json' });
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(blob);
//       link.download = 'leads.json';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } else {
//       console.error('Ошибка получения данных:', data);
//     }
//   })
//   .catch(error => {
//     console.error('Ошибка:', error);
//   });

// const token = 'z0Sayl6q2L5Ce17VWMixW3s2mvx1mGqF'; 
// const projectId = 103451; 
// const offset = 10;
// const limit = 1;
// const sort = { updated_at: 3 };
// const filter = { created_at_from: 1535529725 };
// const isDeal = false; 

// const url = new URL(`https://direct.lptracker.ru/lead/${projectId}/list`);
// url.searchParams.append('offset', offset);
// url.searchParams.append('limit', limit);
// Object.keys(sort).forEach(key => url.searchParams.append(`sort[${key}]`, sort[key]));
// Object.keys(filter).forEach(key => url.searchParams.append(`filter[${key}]`, filter[key]));
// url.searchParams.append('is_deal', isDeal);

// fetch(url, {
//   method: 'GET',
//   headers: {
//     'token': token
//   }
// })
//   .then(response => response.json())
//   .then(data => {
//     if (data.status === 'success') {
//       const leads = data.result;
//       console.log('Лиды:', leads);

//       // Функция для рекурсивного обхода объектов и массивов
//       function deepClone(obj) {
//         if (obj === null || typeof obj !== 'object') {
//           return obj;
//         }
//         if (Array.isArray(obj)) {
//           return obj.map(deepClone);
//         }
//         const clonedObj = {};
//         for (const key in obj) {
//           if (obj.hasOwnProperty(key)) {
//             clonedObj[key] = deepClone(obj[key]);
//           }
//         }
//         return clonedObj;
//       }

//       const detailedLeads = deepClone(leads);
//       console.log('Подробные Лиды:', detailedLeads);

//       // Сохранение данных в JSON файл
//       const json = JSON.stringify(detailedLeads, null, 2);
//       const blob = new Blob([json], { type: 'application/json' });
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(blob);
//       link.download = 'detailed_leads.json';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } else {
//       console.error('Ошибка получения данных:', data);
//     }
//   })
//   .catch(error => {
//     console.error('Ошибка:', error);
//   });

// const token = 'z0Sayl6q2L5Ce17VWMixW3s2mvx1mGqF'; 
// const projectId = 103451; 
// const offset = 10;
// const limit = 1;
// const sort = { updated_at: 3 };
// const filter = { created_at_from: 1535529725 };
// const isDeal = false; 

// const url = new URL(`https://direct.lptracker.ru/lead/${projectId}/list`);
// url.searchParams.append('offset', offset);
// url.searchParams.append('limit', limit);
// Object.keys(sort).forEach(key => url.searchParams.append(`sort[${key}]`, sort[key]));
// Object.keys(filter).forEach(key => url.searchParams.append(`filter[${key}]`, filter[key]));
// url.searchParams.append('is_deal', isDeal);

// fetch(url, {
//   method: 'GET',
//   headers: {
//     'token': token
//   }
// })
//   .then(response => response.json())
//   .then(data => {
//     if (data.status === 'success') {
//       const leads = data.result;
//       console.log('Лиды:', leads);

//       // Функция для рекурсивного обхода объектов и массивов
//       function deepClone(obj) {
//         if (obj === null || typeof obj !== 'object') {
//           return obj;
//         }
//         if (Array.isArray(obj)) {
//           return obj.map(deepClone);
//         }
//         const clonedObj = {};
//         for (const key in obj) {
//           if (obj.hasOwnProperty(key)) {
//             clonedObj[key] = deepClone(obj[key]);
//           }
//         }
//         return clonedObj;
//       }

//       const detailedLeads = deepClone(leads);
//       console.log('Подробные Лиды:', detailedLeads);

//       // Извлечение и вывод данных из массива custom
//       detailedLeads.forEach(lead => {
//         if (lead.custom && Array.isArray(lead.custom)) {
//           lead.custom.forEach((customObj, index) => {
//             console.log(`Custom Object ${index + 1}:`, customObj);
//           });
//         }
//       });

//       // Сохранение данных в JSON файл
//       const json = JSON.stringify(detailedLeads, null, 2);
//       const blob = new Blob([json], { type: 'application/json' });
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(blob);
//       link.download = 'detailed_leads.json';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } else {
//       console.error('Ошибка получения данных:', data);
//     }
//   })
//   .catch(error => {
//     console.error('Ошибка:', error);
//   });

// const token = 'z0Sayl6q2L5Ce17VWMixW3s2mvx1mGqF'; 
// const projectId = 103451; 
// const offset = 10;
// const limit = 1;
// const sort = { updated_at: 3 };
// const filter = { created_at_from: 1535529725 };
// const isDeal = false; 

// const url = new URL(`https://direct.lptracker.ru/lead/${projectId}/list`);
// url.searchParams.append('offset', offset);
// url.searchParams.append('limit', limit);
// Object.keys(sort).forEach(key => url.searchParams.append(`sort[${key}]`, sort[key]));
// Object.keys(filter).forEach(key => url.searchParams.append(`filter[${key}]`, filter[key]));
// url.searchParams.append('is_deal', isDeal);

// fetch(url, {
//   method: 'GET',
//   headers: {
//     'token': token
//   }
// })
//   .then(response => response.json())
//   .then(data => {
//     if (data.status === 'success') {
//       const leads = data.result;
//       console.log('Лиды:', leads);

//       // Функция для рекурсивного обхода объектов и массивов
//       function deepClone(obj) {
//         if (obj === null || typeof obj !== 'object') {
//           return obj;
//         }
//         if (Array.isArray(obj)) {
//           return obj.map(deepClone);
//         }
//         const clonedObj = {};
//         for (const key in obj) {
//           if (obj.hasOwnProperty(key)) {
//             clonedObj[key] = deepClone(obj[key]);
//           }
//         }
//         return clonedObj;
//       }

//       const detailedLeads = deepClone(leads);
//       console.log('Подробные Лиды:', detailedLeads);

//       // Извлечение и вывод данных из массива custom
//       detailedLeads.forEach(lead => {
//         if (lead.custom && Array.isArray(lead.custom)) {
//           lead.custom.forEach((customObj, index) => {
//             console.log(`Custom Object ${index + 1}:`, customObj);
//           });
//         }
//       });

//       // Сохранение данных в JSON файл
//       const json = JSON.stringify(detailedLeads, null, 2);
//       fs.writeFileSync('detailed_leads.json', json, 'utf8');
//       console.log('Данные успешно сохранены в файл detailed_leads.json');
//     } else {
//       console.error('Ошибка получения данных:', data);
//     }
//   })
//   .catch(error => {
//     console.error('Ошибка:', error);
//   });
