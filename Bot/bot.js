// const TelegramBot = require('node-telegram-bot-api'); // Отправляет список сегодняшних лидов по команде /today

// const axios = require('axios'); // Рабочая версия версия вывода лидов № 3

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const chatId = '1013645358';

// const bot = new TelegramBot(telegramToken, { polling: true });

// // Функция для отправки сообщения в Telegram
// async function sendMessage(message) {
//     try {
//         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
//         const data = {
//             chat_id: chatId,
//             text: message,
//         };

//         await axios.post(url, data);
//         console.log('Сообщение успешно отправлено в Telegram');
//     } catch (error) {
//         console.error('Ошибка при отправке сообщения в Telegram:', error);
//     }
// }

// fetch('https://direct.lptracker.ru/lead/103451/list?offset=0&limit=10&sort[updated_at]=3&filter[created_at_from]=1535529725', {
//     method: 'GET',
//     headers: { 'content-type': 'application/json' },
// })
//     .then((res) => {
//         if (res.ok) {
//             return res.json();
//         } else {
//             throw new Error('Error: ' + res.status);
//         }
//     })
//     .then((data) => {
//         console.log(data);

//         const message = JSON.stringify(data);

//     })
//     .catch((error) => {
//         console.error(error);
//     });


// const url = 'https://direct.lptracker.ru/lead/103451/list?offset=0&limit=10&sort[updated_at]=3&filter[created_at_from]=1535529725'; // этот url меняет возможность по разному отображать лиды
// const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// bot.onText(/\/today/, async (msg) => {
//     const chatId = msg.chat.id;

//     axios.get(url, {
//         headers: {
//             'token': token
//         }
//     })
//         .then(response => { // мы получаем ответ от запроса и сохраняем данные о лидах в переменную leadData
//             console.log(response.data); // Также выводим данные ответа в консоль с помощью console.log(response.data)
//             const leadData = response.data.result; // Данные о лидах в переменную leadData

//             leadData.forEach(lead => { // метод forEach для перебора каждого элемента массива leadData
//                 const phone = lead.contact.details.find(detail => detail.type === 'phone').data; // Для извлечения информации о телефоне мы используем метод find для поиска объекта с типом 'phone' в массиве lead.contact.details. Затем мы получаем значение свойства data этого объекта и сохраняем его в переменную phone.
//                 const name = lead.contact.name; // Переменная имени
//                 const createdAt = lead.created_at; // Переменная даты

//                 console.log('Телефон:', phone);

//                 console.log('Имя:', name);
//                 console.log('Дата создания:', createdAt);

//                 // Отправка сообщения в Telegram
//                 const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

//                 const telegramData = {
//                     chat_id: chatId,
//                     text: `Телефон: ${phone}\nИмя: ${name}\nДата создания: ${createdAt}`,
//                 };

//                 axios.post(telegramUrl, telegramData)
//                     .then(() => {
//                         console.log('Сообщение успешно отправлено в Telegram');
//                     })
//                     .catch(error => {
//                         console.error('Ошибка при отправке сообщения в Telegram:', error);
//                     });
//             });
//         })
//         .catch(error => {
//             console.error('Ошибка при получении данных:', error);
//         });

// });





const TelegramBot = require('node-telegram-bot-api'); // Отправляет список сегодняшних лидов по команде /today

const axios = require('axios'); // Рабочая версия версия вывода лидов № 3

const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
const chatId = '1013645358';

const bot = new TelegramBot(telegramToken, { polling: true });

// Функция для отправки сообщения в Telegram
async function sendMessage(message) {
    try {
        const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
        const data = {
            chat_id: chatId,
            text: message,
        };

        await axios.post(url, data);
        console.log('Сообщение успешно отправлено в Telegram');
    } catch (error) {
        console.error('Ошибка при отправке сообщения в Telegram:', error);
    }
}

fetch('https://direct.lptracker.ru/lead/103451/list?offset01&limit=3&sort[updated_at]=3&filter[created_at_from]=1535529725', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
})
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Error: ' + res.status);
        }
    })
    .then((data) => {
        console.log(data);

        const message = JSON.stringify(data);

    })
    .catch((error) => {
        console.error(error);
    });


const url = 'https://direct.lptracker.ru/lead/103451/list?offset01&limit=10&sort[updated_at]=3&filter[created_at_from]=1535529725'; // const url = 'https://direct.lptracker.ru/lead/78949162';
const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

bot.onText(/\/today/, async (msg) => {
    const chatId = msg.chat.id;

axios.get(url, {
    headers: {
        'token': token
    }
})
    .then(response => { // мы получаем ответ от запроса и сохраняем данные о лидах в переменную leadData
        console.log(response.data); // Также выводим данные ответа в консоль с помощью console.log(response.data)
        const leadData = response.data.result; // Данные о лидах в переменную leadData

        leadData.forEach(lead => { // метод forEach для перебора каждого элемента массива leadData
            const phone = lead.contact.details.find(detail => detail.type === 'phone').data; // Для извлечения информации о телефоне мы используем метод find для поиска объекта с типом 'phone' в массиве lead.contact.details. Затем мы получаем значение свойства data этого объекта и сохраняем его в переменную phone.
            const name = lead.contact.name; // Переменная имени
            const createdAt = lead.created_at; // Переменная даты

            console.log('Телефон:', phone);

            console.log('Имя:', name);
            console.log('Дата создания:', createdAt);

            // Отправка сообщения в Telegram
            const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

            const telegramData = {
                chat_id: chatId,
                text: `Телефон: ${phone}\nИмя: ${name}\nДата создания: ${createdAt}`,
            };

            axios.post(telegramUrl, telegramData)
                .then(() => {
                    console.log('Сообщение успешно отправлено в Telegram');
                })
                .catch(error => {
                    console.error('Ошибка при отправке сообщения в Telegram:', error);
                });
        });
    })
    .catch(error => {
        console.error('Ошибка при получении данных:', error);
    });

});




// const axios = require('axios'); // Рабочая версия версия вывода лидов № 2

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const chatId = '1013645358';

// // Функция для отправки сообщения в Telegram
// async function sendMessage(message) {
//     try {
//         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
//         const data = {
//             chat_id: chatId,
//             text: message,
//         };

//         await axios.post(url, data);
//         console.log('Сообщение успешно отправлено в Telegram');
//     } catch (error) {
//         console.error('Ошибка при отправке сообщения в Telegram:', error);
//     }
// }

// const url = 'https://direct.lptracker.ru/lead/103451/list?offset01&limit=3&sort[updated_at]=3&filter[created_at_from]=1535529725'; // const url = 'https://direct.lptracker.ru/lead/78949162';
// const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';



// axios.get(url, {
//     headers: {
//         'token': token
//     }
// })
//     .then(response => { // мы получаем ответ от запроса и сохраняем данные о лидах в переменную leadData
//         console.log(response.data); // Также выводим данные ответа в консоль с помощью console.log(response.data)
//         const leadData = response.data.result; // Данные о лидах в переменную leadData

//         leadData.forEach(lead => { // метод forEach для перебора каждого элемента массива leadData
//             const phone = lead.contact.details.find(detail => detail.type === 'phone').data; // Для извлечения информации о телефоне мы используем метод find для поиска объекта с типом 'phone' в массиве lead.contact.details. Затем мы получаем значение свойства data этого объекта и сохраняем его в переменную phone.
//             const name = lead.contact.name; // Переменная имени
//             const createdAt = lead.created_at; // Переменная даты

//             console.log('Телефон:', phone);

//             console.log('Имя:', name);
//             console.log('Дата создания:', createdAt);

//             // Отправка сообщения в Telegram
//             const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

//             const telegramData = {
//                 chat_id: chatId,
//                 text: `Телефон: ${phone}\nИмя: ${name}\nДата создания: ${createdAt}`,
//             };

//             axios.post(telegramUrl, telegramData)
//                 .then(() => {
//                     console.log('Сообщение успешно отправлено в Telegram');
//                 })
//                 .catch(error => {
//                     console.error('Ошибка при отправке сообщения в Telegram:', error);
//                 });
//         });
//     })
//     .catch(error => {
//         console.error('Ошибка при получении данных:', error);
//     });





// const axios = require('axios'); // Рабочая версия вывода лидов

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const chatId = '1013645358';

// // Функция для отправки сообщения в Telegram
// async function sendMessage(message) {
//     try {
//         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
//         const data = {
//             chat_id: chatId,
//             text: message,
//         };

//         await axios.post(url, data);
//         console.log('Сообщение успешно отправлено в Telegram');
//     } catch (error) {
//         console.error('Ошибка при отправке сообщения в Telegram:', error);
//     }
// }

// const url = 'https://direct.lptracker.ru/lead/103451/list?offset01&limit=3&sort[updated_at]=3&filter[created_at_from]=1535529725'; // const url = 'https://direct.lptracker.ru/lead/78949162';
// const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';



// axios.get(url, {
//     headers: {
//         'token': token
//     }
// })
//     .then(response => { // мы получаем ответ от запроса и сохраняем данные о лидах в переменную leadData
//         console.log(response.data); // Также выводим данные ответа в консоль с помощью console.log(response.data)
//         const leadData = response.data.result; // Данные о лидах в переменную leadData
 
//         leadData.forEach(lead => { // метод forEach для перебора каждого элемента массива leadData
//             const phone = lead.contact.details.find(detail => detail.type === 'phone').data; // Для извлечения информации о телефоне мы используем метод find для поиска объекта с типом 'phone' в массиве lead.contact.details. Затем мы получаем значение свойства data этого объекта и сохраняем его в переменную phone.
//             const name = lead.contact.name; // Переменная имени
//             const createdAt = lead.created_at; // Переменная даты

//             console.log('Телефон:', phone); 
            
//             console.log('Имя:', name);
//             console.log('Дата создания:', createdAt);

//             // Отправка сообщения в Telegram
//             const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

//             const telegramData = {
//                 chat_id: chatId,
//                 text: `Телефон: ${phone}\nИмя: ${name}\nДата создания: ${createdAt}`,
//             };

//             axios.post(telegramUrl, telegramData)
//                 .then(() => {
//                     console.log('Сообщение успешно отправлено в Telegram');
//                 })
//                 .catch(error => {
//                     console.error('Ошибка при отправке сообщения в Telegram:', error);
//                 });
//         });
//     })
//     .catch(error => {
//         console.error('Ошибка при получении данных:', error);
//     });









// const axios = require('axios'); // Получение лида

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const chatId = '1013645358';

// // Функция для отправки сообщения в Telegram
// async function sendMessage(message) {
//     try {
//         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
//         const data = {
//             chat_id: chatId,
//             text: message,
//         };

//         await axios.post(url, data);
//         console.log('Сообщение успешно отправлено в Telegram');
//     } catch (error) {
//         console.error('Ошибка при отправке сообщения в Telegram:', error);
//     }
// }

// const url = 'https://direct.lptracker.ru/lead/103451/list?offset=1&limit=3&sort[updated_at]=3&filter[created_at_from]=1535529725'; // const url = 'https://direct.lptracker.ru/lead/78949162';
// const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// axios.get(url, {
//     headers: {
//         'token': token
//     }
// })
//     .then(response => {
//         console.log(response.data);
//         const message = JSON.stringify(response.data);
//         const result = response.data.result; // Получение массива "result" из ответа

//         const resultes = response.data.result; // Получение массива "result" из ответа


//         sendMessage(message);
//     })
//     .catch(error => {
//         console.error(error);
//     });





// const axios = require('axios'); // Получение лида

// const telegramToken = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';
// const chatId = '1013645358';

// fetch('https://direct.lptracker.ru/lead/', {
//     method: 'GET',
//     headers: { 'content-type': 'application/json' },
// })
//     .then((res) => {
//         if (res.ok) {
//             return res.json();
//         } else {
//             throw new Error('Error: ' + res.status);
//         }
//     })
//     .then((data) => {
//         console.log(data);

//         const message = JSON.stringify(data);

//     })
//     .catch((error) => {
//         console.error(error);
//     });

// // Функция для отправки сообщения в Telegram
// async function sendMessage(message) {
//     try {
//         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
//         const data = {
//             chat_id: chatId,
//             text: message,
//         };

//         await axios.post(url, data);
//         console.log('Сообщение успешно отправлено в Telegram');
//     } catch (error) {
//         console.error('Ошибка при отправке сообщения в Telegram:', error);
//     }
// }

// const url = 'https://direct.lptracker.ru/lead/78949162';
// const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// axios.get(url, {
//     headers: {
//         'token': token
//     }
// })
//     .then(response => {
//         console.log(response.data);
//         const message = JSON.stringify(response.data);
//         sendMessage(message);
//     })
//     .catch(error => {
//         console.error(error);
//     });



// const TelegramBot = require('node-telegram-bot-api'); // Вывод элемента по номеру id
// const axios = require('axios');

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const chatId = '1013645358';

// // Создание экземпляра объекта TelegramBot
// const bot = new TelegramBot(telegramToken, { polling: true });

// // Функция для отправки сообщения в Telegram
// async function sendMessage(message) {
//     try {
//         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
//         const data = {
//             chat_id: chatId,
//             text: message,
//         };

//         await axios.post(url, data);
//         console.log('Сообщение успешно отправлено в Telegram');
//     } catch (error) {
//         console.error('Ошибка при отправке сообщения в Telegram:', error);
//     }
// }
// // Ваш код для получения данных
// fetch('https://652e50390b8d8ddac0b12649.mockapi.io/person/', {
//     method: 'GET',
//     headers: { 'content-type': 'application/json' },
// })
//     .then((res) => {
//         if (res.ok) {
//             return res.json();
//         } else {
//             throw new Error('Error: ' + res.status);
//         }
//     })
//     .then((data) => {
//         console.log(data);

//         const message = JSON.stringify(data);
        
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// bot.onText(/\/edit/, async (msg) => {
//     const chatId = msg.chat.id;

//     try {
//         await bot.sendMessage(chatId, 'Введите номер лида');
//     } catch (error) {
//         console.error('Ошибка при отправке сообщения в Telegram:', error);
//     }
// });

// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const messageText = msg.text;

//     if (messageText) {
//         try {
//             const leadNumber = messageText;
//             const url = `https://652e50390b8d8ddac0b12649.mockapi.io/person/${leadNumber}`;
//             const response = await axios.get(url);
//             const data = response.data;

//             const message = JSON.stringify(data);
//             await sendMessage(message);
//         } catch (error) {
//             console.error('Ошибка при получении данных из MockAPI:', error);
//         }
//     }
// });






// const axios = require('axios');
// const TelegramBot = require('node-telegram-bot-api');

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const lptrackerToken = 'oztqO48VzagvMeIh7EJCxwc10lFoGRlE';

// const bot = new TelegramBot(telegramToken, { polling: true });

// bot.onText(/\/createlead/, async (msg) => {
//     try {
//         const chatId = msg.chat.id;
//         const contact_id = 'YOUR_CONTACT_ID';
//         const project_id = 'YOUR_PROJECT_ID';
//         const funnel_id = 'YOUR_FUNNEL_ID';
//         const lead_create_date = '2023-10-23';
//         const deal_date = '2023-10-24';
//         const lead_owner_id = 'YOUR_LEAD_OWNER_ID';

//         const leadData = {
//             contact_id,
//             project_id,
//             funnel_id,
//             lead_create_date,
//             deal_date,
//             view_id: 123,
//             view: {
//                 source: 'someSource',
//                 campaign: 'someCampaign',
//                 keyword: 'someKeyword'
//             },
//             custom: {
//                 custom_field_id: 'YOUR_CUSTOM_FIELD_ID',
//                 custom_field_value: 'YOUR_CUSTOM_FIELD_VALUE'
//             },
//             payments: [
//                 {
//                     category: 'someCategory',
//                     purpose: 'paymentPurpose',
//                     sum: 123.12
//                 }
//             ],
//             owner: lead_owner_id
//         };

//         const response = await axios.post('https://direct.lptracker.ru/lead', leadData, {
//             headers: {
//                 'Authorization': `Bearer ${lptrackerToken}`,
//             },
//         });

//         if (response.status === 201) {
//             bot.sendMessage(chatId, 'Лид успешно создан в Lptracker!');
//         } else {
//             bot.sendMessage(chatId, 'Ошибка при создании лида в Lptracker.');
//         }
//     } catch (error) {
//         console.error(error);
//         bot.sendMessage(chatId, 'Произошла ошибка при отправке запроса.');
//     }
// });

// console.log('Bot is running...');





// const TelegramBot = require('node-telegram-bot-api'); // Кривое удаление
// const axios = require('axios'); // Получение лида

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const chatId = '1013645358';
// const url = 'https://direct.lptracker.ru/lead/78912351';
// const token = 'oztqO48VzagvMeIh7EJCxwc10lFoGRlE';

// const bot = new TelegramBot(telegramToken, { polling: true });

// // Функция для отправки сообщения в Telegram
// async function sendMessage(message) {
//     try {
//         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
//         const data = {
//             chat_id: chatId,
//             text: message,
//         };

//         await axios.post(url, data);
//         console.log('Сообщение успешно отправлено в Telegram');
//     } catch (error) {
//         console.error('Ошибка при отправке сообщения в Telegram:', error);
//     }
// }

// fetch('https://direct.lptracker.ru/lead/', {
//     method: 'GET',
//     headers: { 'content-type': 'application/json' },
// })
//     .then((res) => {
//         if (res.ok) {
//             return res.json();
//         } else {
//             throw new Error('Error: ' + res.status);
//         }
//     })
//     .then((data) => {
//         console.log(data);

//         const message = JSON.stringify(data);

//     })
//     .catch((error) => {
//         console.error(error);
//     });

// bot.onText(/\/delete/, async (msg) => {
//     const chatId = msg.chat.id;

//     try {
//         await bot.sendMessage(chatId, 'Введите номер лида');
//     } catch (error) {
//         console.error('Ошибка при отправке сообщения в Telegram:', error);
//     }
// });

// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const messageText = msg.text;

//     if (messageText) {
//         try {
//             const leadNumber = messageText;

//             const url = `https://direct.lptracker.ru/lead/${leadNumber}`;
//             const response = await axios.delete(url);
//             const data = response.data;

//             const message = JSON.stringify(data);
//             await sendMessage("Лид успешно удалён!");
//         } catch (error) {
//             console.error('Ошибка при получении данных из MockAPI:', error);
//         }
//     }
// });









// const TelegramBot = require('node-telegram-bot-api'); // Кривое удаление рабочее
// const axios = require('axios'); // Получение лида

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const chatId = '1013645358';
// const url = 'https://direct.lptracker.ru/lead/78930509';
// const token = 'oztqO48VzagvMeIh7EJCxwc10lFoGRlE';

// const bot = new TelegramBot(telegramToken, { polling: true });

// // Функция для отправки сообщения в Telegram
// // Определение функции для отправки сообщения в Telegram
// async function sendMessage(message) {
//     try {
//         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
//         const data = {
//             chat_id: chatId,
//             text: message,
//         };

//         await axios.post(url, data);
//         console.log('Сообщение успешно отправлено в Telegram');
//     } catch (error) {
//         console.error('Ошибка при отправке сообщения в Telegram:', error);
//     }
// }


// fetch('https://direct.lptracker.ru/lead/', { 
//     method: 'GET',
//     headers: { 'content-type': 'application/json' },
// })
//     .then((res) => {
//         if (res.ok) {
//             return res.json();
//         } else {
//             throw new Error('Error: ' + res.status);
//         }
//     })
//     .then((data) => {
//         console.log(data);

//         const message = JSON.stringify(data);

//     })
//     .catch((error) => {
//         console.error(error);
//     });



// axios.delete(url, {
//     headers: {
//         'token': token
//     }
// })
//     .then(response => {
//         console.log(response.data);
//         const message = JSON.stringify(response.data);
//         sendMessage(message);
//     })
//     .catch(error => {
//         console.error(error);
//     });

// bot.onText(/\/delete/, async (msg) => {
//     const chatId = msg.chat.id;

//     try {
//         await bot.sendMessage(chatId, 'Введите номер лида');
//     } catch (error) {
//         console.error('Ошибка при отправке сообщения в Telegram:', error);
//     }
// });

// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const messageText = msg.text;

//     if (messageText) {
//         try {
//             const leadNumber = messageText;
            
//             // const url = `https://direct.lptracker.ru/lead/${leadNumber}`;
//             // console.log(leadNumber)                                            
//             const response = await axios.delete(url);
//             const data = response.data;

//             const message = JSON.stringify(data);
//             await sendMessage("Лид успешно удалён!");
//         } catch (error) {
//             console.error('Ошибка при получении данных из MockAPI:', error);
//         }
//     }
// });



// const axios = require('axios'); // Получение лида

// const telegramToken = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';
// const chatId = '1013645358';

// // Функция для отправки сообщения в Telegram
// async function sendMessage(message) {
//     try {
//         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
//         const data = {
//             chat_id: chatId,
//             text: message,
//         };

//         await axios.post(url, data);
//         console.log('Сообщение успешно отправлено в Telegram');
//     } catch (error) {
//         console.error('Ошибка при отправке сообщения в Telegram:', error);
//     }
// }

// const url = 'https://direct.lptracker.ru/lead/78949162';
// const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// axios.get(url, {
//     headers: {
//         'token': token
//     }
// })
//     .then(response => {
//         console.log(response.data);
//         const message = JSON.stringify(response.data);
//         sendMessage(message);
//     })
//     .catch(error => {
//         console.error(error);
//     });





// const TelegramBot = require('node-telegram-bot-api');
// const axios = require('axios');

// const token = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const bot = new TelegramBot(token, {
//     polling: true
// });

// bot.onText(/\/start/, (msg) => {
//     const { id } = msg.chat;

//     const lptrackerToken = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';
//     const lptrackerApiUrl = 'https://direct.lptracker.ru/lead/103451/list?offset=10&limit=1&sort[updated_at]=3&filter[created_at_from]=1535529725';

//     axios.get(lptrackerApiUrl, {
//         headers: {
//             Authorization: lptrackerToken
//         }
//     })
//         .then(response => {
//             bot.sendMessage(id, `Результат запроса:\n${response.data}`);
//         })
//         .catch(error => {
//             bot.sendMessage(id, `Ошибка выполнения запроса: ${error.message}`);
//         });
// });


// const TelegramBot = require('node-telegram-bot-api');
// const { exec } = require('child_process');

// const token = '6383490209:AAHL-fDgEIp3ZvGw8gc8ZsP_ibuffBFthtw';
// const bot = new TelegramBot(token, {
//     polling: true
// });

// bot.onText(/\/start/, (msg) => {
//     const { id } = msg.chat;

//     exec(
//         'curl -H "oW8lBtSOcTXNsYztY97l6sNQlIhqgBfH" https://direct.lptracker.ru/lead/103451/list?offset=10&limit=1&sort[updated_at]=3&filter[created_at_from]=1535529725',
//         (error, stdout, stderr) => {
//             if (error) {
//                 bot.sendMessage(id, `Ошибка выполнения запроса: ${error.message}`);
//                 return;
//             }
//             if (stderr) {
//                 bot.sendMessage(id, `Ошибка выполнения запроса: ${stderr}`);
//                 return;
//             }
//             bot.sendMessage(id, `Результат запроса:\n${stdout}`);
//         }
//     );
// });



// const { Telegraf } = require('telegraf');
// const fs = require('fs');

// const bot = new Telegraf('6383490209:AAHL-fDgEIp3ZvGw8gc8ZsP_ibuffBFthtw'); // Токен бота из BotFather

// const data = fs.readFileSync('./result.json', 'utf-8');
// const jsonData = JSON.parse(data);
// const name = jsonData.name;
// const dataValue = jsonData.details[0].data;
// const createdAt = jsonData.created_at;

// bot.start((ctx) => {
//     const message = `Клиент, ${name}! Номер телефона клиента ${dataValue} время создания заявки ${createdAt}.`;
//     ctx.reply(message);
// });

// bot.launch();

// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));





// const { Telegraf } = require('telegraf');

// const bot = new Telegraf('6383490209:AAHL-fDgEIp3ZvGw8gc8ZsP_ibuffBFthtw'); // Токен бота из BotFather

// bot.start((ctx) => {
//     ctx.reply('Welcome'); // Сообщение после нажатия на кнопку /start
// });



// bot.on('text', (ctx) => {
//     const userMessage = ctx.message.text; // Получаем текст сообщения пользователя

//     if (userMessage === "Свободен") { // Если введено Привет
//         ctx.reply('Вы назначены на заказ...параметры...просим подготовить'); // Вывести Ваш заказ принят
//     }
//     else if (userMessage === "Скоро свободен") {
//         ctx.reply('Отправляю вам заказ на время...');
//     }
//     else if (userMessage === "Занят") {
//         ctx.reply('Напишите как освободитесь');
//     }
//     else {
//         ctx.reply('Я вас не понимаю, исправьте ошибки в вашем сообщении!'); // Иначе Ваш заказ не принят
//     }
// });

// bot.launch();

// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));





// const axios = require('axios'); // Авторизация

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