// import fetch from 'node-fetch';
// import fs from 'fs';

// const token = 'z0Sayl6q2L5Ce17VWMixW3s2mvx1mGqF'; 
// const projectId = 103451; 
// const offset = 10;
// const limit = 1;
// const sort = { updated_at: 4 };
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

import fetch from 'node-fetch';
import fs from 'fs';

const token = 'z0Sayl6q2L5Ce17VWMixW3s2mvx1mGqF'; 
const projectId = 103451; 
const offset = 10;
const limit = 5;
const sort = { updated_at: 4 };
const filter = { created_at_from: 1535529725 };
const isDeal = false; 

const url = new URL(`https://direct.lptracker.ru/lead/${projectId}/list`);
url.searchParams.append('offset', offset);
url.searchParams.append('limit', limit);
Object.keys(sort).forEach(key => url.searchParams.append(`sort[${key}]`, sort[key]));
Object.keys(filter).forEach(key => url.searchParams.append(`filter[${key}]`, filter[key]));
url.searchParams.append('is_deal', isDeal);

fetch(url, {
  method: 'GET',
  headers: {
    'token': token
  }
})
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      const leads = data.result;
      console.log('Лиды:', leads);

      // Function to deep clone objects and arrays
      function deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
          return obj;
        }
        if (Array.isArray(obj)) {
          return obj.map(deepClone);
        }
        const clonedObj = {};
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            clonedObj[key] = deepClone(obj[key]);
          }
        }
        return clonedObj;
      }

      const detailedLeads = deepClone(leads);
      console.log('Подробные Лиды:', detailedLeads);

      // Extract and log specific fields from the custom array
      const extractedData = detailedLeads.map(lead => {
        const customData = lead.custom.reduce((acc, customObj) => {
          if (customObj.name === 'Вид уборки') {
            acc['Вид уборки'] = customObj.value;
          } else if (customObj.name === 'Город') {
            acc['Город'] = customObj.value;
          } else if (customObj.name === 'Исполнитель') {
            acc['Исполнитель'] = customObj.value;
          }
          return acc;
        }, {});
        return { ...lead, ...customData, custom: undefined };
      });

      // Convert arrays to strings
      const finalData = extractedData.map(lead => {
        for (const key in lead) {
          if (Array.isArray(lead[key])) {
            lead[key] = lead[key].join(', ');
          }
        }
        return lead;
      });

      console.log('Извлеченные данные:', finalData);

      // Save the extracted data to a JSON file
      const json = JSON.stringify(finalData, null, 2);
      fs.writeFileSync('extracted_leads.json', json, 'utf8');
      console.log('Данные успешно сохранены в файл extracted_leads.json');
    } else {
      console.error('Ошибка получения данных:', data);
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });

