const TelegramBot = require('node-telegram-bot-api'); // Версия 0.5
const axios = require('axios');

const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
const chatId = '1013645358';

// Создание экземпляра объекта TelegramBot
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
// Ваш код для получения данных
fetch('https://652e50390b8d8ddac0b12649.mockapi.io/person/', {
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

// Обработчик команды /addrecord
bot.onText(/\/addrecord/, async (msg) => {
    const chatId = msg.chat.id;

    // Отправляем сообщение "Введите имя"
    bot.sendMessage(chatId, 'Введите имя');

    // Ожидаем ответ с именем
    bot.once('message', async (nameMsg) => {
        const name = nameMsg.text;

        // Отправляем сообщение "Введите возраст"
        bot.sendMessage(chatId, 'Введите возраст');

        // Ожидаем ответ с возрастом
        bot.once('message', async (yearsMsg) => {
            const years = parseInt(yearsMsg.text);

            try {
                // Отправляем POST запрос на добавление данных в MockAPI
                const mockApiUrl = 'https://652e50390b8d8ddac0b12649.mockapi.io/person/';
                const response = await axios.post(mockApiUrl, {
                    createdAt: '2023-10-18',
                    name: name,
                    avatar: 'img.jpg',
                    years: years,
                    id: '9'
                });

                // Проверяем статус ответа
                if (response.status === 201) {
                    bot.sendMessage(chatId, 'Данные успешно добавлены в MockAPI!');
                } else {
                    bot.sendMessage(chatId, 'Ошибка при добавлении данных в MockAPI.');
                }
            } catch (error) {
                console.error(error);
                bot.sendMessage(chatId, 'Произошла ошибка при отправке запроса.');
            }
        });
    });
});

bot.onText(/\/delete/, async (msg) => {
    const chatId = msg.chat.id;

    try {
        await bot.sendMessage(chatId, 'Введите номер лида');
    } catch (error) {
        console.error('Ошибка при отправке сообщения в Telegram:', error);
    }
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText) {
        try {
            const leadNumber = messageText;

            const url = `https://652e50390b8d8ddac0b12649.mockapi.io/person/${leadNumber}`;
            const response = await axios.delete(url);
            const data = response.data;

            const message = JSON.stringify(data);
            await sendMessage("Лид успешно удалён!");
        } catch (error) {
            console.error('Ошибка при получении данных из MockAPI:', error);
        }
    }
});

bot.onText(/\/edit/, async (msg) => {
    const chatId = msg.chat.id;

    try {
        await bot.sendMessage(chatId, 'Введите номер лида');
    } catch (error) {
        console.error('Ошибка при отправке сообщения в Telegram:', error);
    }
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText) {
        try {
            const leadNumber = messageText;
            const url = `https://652e50390b8d8ddac0b12649.mockapi.io/person/${leadNumber}`;
            const response = await axios.get(url);
            const data = response.data;

            const message = JSON.stringify(data);
            const messageEdit = "👇Будет изменён данный лид, введите новое имя!👇"
            sendMessage(messageEdit)
            await sendMessage(message);
        } catch (error) {
            console.error('Ошибка при получении данных из MockAPI:', error);
        }
    }
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText) {
        try {
            const leadNumber = messageText;
            const url = `https://652e50390b8d8ddac0b12649.mockapi.io/person/${leadNumber}`;
            const response = await axios.get(url);
            const data = response.data;

            const message = JSON.stringify(data);
            const messageEdit = "👇Будет изменено имя в данном лиде, введите новое имя!👇";
            sendMessage(messageEdit);
            await sendMessage(message);

            // Ожидаем ответ с новым именем
            bot.once('message', async (nameMsg) => {
                const newName = nameMsg.text;

                // Обновляем имя в лиде
                data.name = newName;

                // Отправляем обновленные данные в MockAPI
                await axios.put(url, data);

                const successMessage = `Имя в лиде успешно изменено на "${newName}". Введите новый возраст:`;
                sendMessage(successMessage);

                // Ожидаем ответ с новым возрастом
                bot.once('message', async (ageMsg) => {
                    const newAge = parseInt(ageMsg.text);

                    // Обновляем возраст в лиде
                    data.years = newAge;

                    // Отправляем обновленные данные в MockAPI
                    await axios.put(url, data);

                    const finalMessage = `Возраст в лиде успешно изменен на ${newAge}.`;
                    sendMessage(finalMessage);
                });
            });
        } catch (error) {
            console.error('Ошибка при получении данных из MockAPI:', error);
        }
    }
});






// const TelegramBot = require('node-telegram-bot-api'); // Демо версия
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
//             const messageEdit = "👇Будет изменён данный лид, введите новое имя!👇"
//             sendMessage(messageEdit)
//             await sendMessage(message);
//         } catch (error) {
//             console.error('Ошибка при получении данных из MockAPI:', error);
//         }
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
//             const messageEdit = "👇Будет изменено имя в данном лиде, введите новое имя!👇";
//             sendMessage(messageEdit);
//             await sendMessage(message);

//             // Ожидаем ответ с новым именем
//             bot.once('message', async (nameMsg) => {
//                 const newName = nameMsg.text;

//                 // Обновляем имя в лиде
//                 data.name = newName;

//                 // Отправляем обновленные данные в MockAPI
//                 await axios.put(url, data);

//                 const successMessage = `Имя в лиде успешно изменено на "${newName}". Введите новый возраст:`;
//                 sendMessage(successMessage);

//                 // Ожидаем ответ с новым возрастом
//                 bot.once('message', async (ageMsg) => {
//                     const newAge = parseInt(ageMsg.text);

//                     // Обновляем возраст в лиде
//                     data.years = newAge;

//                     // Отправляем обновленные данные в MockAPI
//                     await axios.put(url, data);

//                     const finalMessage = `Возраст в лиде успешно изменен на ${newAge}.`;
//                     sendMessage(finalMessage);
//                 });
//             });
//         } catch (error) {
//             console.error('Ошибка при получении данных из MockAPI:', error);
//         }
//     }
// });

// // Обработчик команды /addrecord
// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;

//     if (text === '/addrecord') {
//         // Отправляем сообщение "Введите имя"
//         bot.sendMessage(chatId, 'Введите имя');
//     } else {
//         // Получаем имя из сообщения и отправляем POST запрос на добавление данных в MockAPI
//         try {
//             const mockApiUrl = 'https://652e50390b8d8ddac0b12649.mockapi.io/person/';
//             const response = await axios.post(mockApiUrl, {
//                 createdAt: '2023-10-18',
//                 name: text, // Используем введенное имя
//                 avatar: 'img.jpg',
//                 years: 40,
//                 id: '9'
//             });

//             // Проверяем статус ответа
//             if (response.status === 201) {
//                 bot.sendMessage(chatId, 'Данные успешно добавлены в MockAPI!');
//             } else {
//                 bot.sendMessage(chatId, 'Ошибка при добавлении данных в MockAPI.');
//             }
//         } catch (error) {
//             console.error(error);
//             bot.sendMessage(chatId, 'Произошла ошибка при отправке запроса.');
//         }
//     }
// });

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

//             const url = `https://652e50390b8d8ddac0b12649.mockapi.io/person/${leadNumber}`;
//             const response = await axios.delete(url);
//             const data = response.data;

//             const message = JSON.stringify(data);
//             await sendMessage("Лид успешно удалён!");
//         } catch (error) {
//             console.error('Ошибка при получении данных из MockAPI:', error);
//         }
//     }
// });






// const TelegramBot = require('node-telegram-bot-api'); // Изменение двух свойств в Объекте через Телеграм
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
//             const messageEdit = "👇Будет изменён данный лид, введите новое имя!👇"
//             sendMessage(messageEdit)
//             await sendMessage(message);
//         } catch (error) {
//             console.error('Ошибка при получении данных из MockAPI:', error);
//         }
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
//             const messageEdit = "👇Будет изменено имя в данном лиде, введите новое имя!👇";
//             sendMessage(messageEdit);
//             await sendMessage(message);

//             // Ожидаем ответ с новым именем
//             bot.once('message', async (nameMsg) => {
//                 const newName = nameMsg.text;

//                 // Обновляем имя в лиде
//                 data.name = newName;

//                 // Отправляем обновленные данные в MockAPI
//                 await axios.put(url, data);

//                 const successMessage = `Имя в лиде успешно изменено на "${newName}". Введите новый возраст:`;
//                 sendMessage(successMessage);

//                 // Ожидаем ответ с новым возрастом
//                 bot.once('message', async (ageMsg) => {
//                     const newAge = parseInt(ageMsg.text);

//                     // Обновляем возраст в лиде
//                     data.years = newAge;

//                     // Отправляем обновленные данные в MockAPI
//                     await axios.put(url, data);

//                     const finalMessage = `Возраст в лиде успешно изменен на ${newAge}.`;
//                     sendMessage(finalMessage);
//                 });
//             });
//         } catch (error) {
//             console.error('Ошибка при получении данных из MockAPI:', error);
//         }
//     }
// });





// const TelegramBot = require('node-telegram-bot-api'); // Изменение одного свойства в Объекте через Телеграм
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
//             const messageEdit = "👇Будет изменён данный лид, введите новое имя!👇"
//             sendMessage(messageEdit)
//             await sendMessage(message);
//         } catch (error) {
//             console.error('Ошибка при получении данных из MockAPI:', error);
//         }
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
//             const messageEdit = "👇Будет изменено имя в данном лиде, введите новое имя!👇";
//             sendMessage(messageEdit);
//             await sendMessage(message);

//             // Ожидаем ответ с новым именем
//             bot.once('message', async (nameMsg) => {
//                 const newName = nameMsg.text;

//                 // Обновляем имя в лиде
//                 data.name = newName;

//                 // Отправляем обновленные данные в MockAPI
//                 await axios.put(url, data);

//                 const successMessage = `Имя в лиде успешно изменено на "${newName}"`;
//                 sendMessage(successMessage);
//             });
//         } catch (error) {
//             console.error('Ошибка при получении данных из MockAPI:', error);
//         }
//     }
// });






// const TelegramBot = require('node-telegram-bot-api'); // Удаление лида по номеру
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

//             const url = `https://652e50390b8d8ddac0b12649.mockapi.io/person/${leadNumber}`;
//             const response = await axios.delete(url);
//             const data = response.data;

//             const message = JSON.stringify(data);
//             await sendMessage("Лид успешно удалён!");
//         } catch (error) {
//             console.error('Ошибка при получении данных из MockAPI:', error);
//         }
//     }
// });





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





// const axios = require('axios'); // Добавление данных в 2 переменные посредством вывода сообщения в телеграм
// const TelegramBot = require('node-telegram-bot-api');

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const bot = new TelegramBot(telegramToken, { polling: true });

// // Функция для отправки сообщения в Telegram
// async function sendMessage(chatId, message) {
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
//         sendMessage(chatId, message);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// // Обработчик команды /addrecord
// bot.onText(/\/addrecord/, async (msg) => {
//     const chatId = msg.chat.id;

//     // Отправляем сообщение "Введите имя"
//     bot.sendMessage(chatId, 'Введите имя');

//     // Ожидаем ответ с именем
//     bot.once('message', async (nameMsg) => {
//         const name = nameMsg.text;

//         // Отправляем сообщение "Введите возраст"
//         bot.sendMessage(chatId, 'Введите возраст');

//         // Ожидаем ответ с возрастом
//         bot.once('message', async (yearsMsg) => {
//             const years = parseInt(yearsMsg.text);

//             try {
//                 // Отправляем POST запрос на добавление данных в MockAPI
//                 const mockApiUrl = 'https://652e50390b8d8ddac0b12649.mockapi.io/person/';
//                 const response = await axios.post(mockApiUrl, {
//                     createdAt: '2023-10-18',
//                     name: name,
//                     avatar: 'img.jpg',
//                     years: years,
//                     id: '9'
//                 });

//                 // Проверяем статус ответа
//                 if (response.status === 201) {
//                     bot.sendMessage(chatId, 'Данные успешно добавлены в MockAPI!');
//                 } else {
//                     bot.sendMessage(chatId, 'Ошибка при добавлении данных в MockAPI.');
//                 }
//             } catch (error) {
//                 console.error(error);
//                 bot.sendMessage(chatId, 'Произошла ошибка при отправке запроса.');
//             }
//         });
//     });
// });





// const axios = require('axios'); // Добавление данных посредством вывода сообщения в телеграм
// const TelegramBot = require('node-telegram-bot-api');

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const bot = new TelegramBot(telegramToken, { polling: true });

// // Функция для отправки сообщения в Telegram
// async function sendMessage(chatId, message) {
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
//         sendMessage(chatId, message);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// // Обработчик команды /addrecord
// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;

//     if (text === '/addrecord') {
//         // Отправляем сообщение "Введите имя"
//         bot.sendMessage(chatId, 'Введите имя');
//     } else {
//         // Получаем имя из сообщения и отправляем POST запрос на добавление данных в MockAPI
//         try {
//             const mockApiUrl = 'https://652e50390b8d8ddac0b12649.mockapi.io/person/';
//             const response = await axios.post(mockApiUrl, {
//                 createdAt: '2023-10-18',
//                 name: text, // Используем введенное имя
//                 avatar: 'img.jpg',
//                 years: 40,
//                 id: '9'
//             });

//             // Проверяем статус ответа
//             if (response.status === 201) {
//                 bot.sendMessage(chatId, 'Данные успешно добавлены в MockAPI!');
//             } else {
//                 bot.sendMessage(chatId, 'Ошибка при добавлении данных в MockAPI.');
//             }
//         } catch (error) {
//             console.error(error);
//             bot.sendMessage(chatId, 'Произошла ошибка при отправке запроса.');
//         }
//     }
// });






// const axios = require('axios'); // Добавление данных при нажатии /addrecord полный код
// const TelegramBot = require('node-telegram-bot-api');

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const bot = new TelegramBot(telegramToken, { polling: true });

// // Функция для отправки сообщения в Telegram
// async function sendMessage(chatId, message) {
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
//         sendMessage(chatId, message);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// // Обработчик команды /addrecord
// bot.onText(/\/addrecord/, async (msg) => {
//     const chatId = msg.chat.id;

//     try {
//         // Отправляем POST запрос на добавление данных в MockAPI
//         const mockApiUrl = 'https://652e50390b8d8ddac0b12649.mockapi.io/person/';
//         const response = await axios.post(mockApiUrl, {
//             createdAt: '2023-10-18',
//             name: 'Trool',
//             avatar: 'img.jpg',
//             years: 40,
//             id: '9'
//         });

//         // Проверяем статус ответа
//         if (response.status === 201) {
//             bot.sendMessage(chatId, 'Данные успешно добавлены в MockAPI!');
//         } else {
//             bot.sendMessage(chatId, 'Ошибка при добавлении данных в MockAPI.');
//         }
//     } catch (error) {
//         console.error(error);
//         bot.sendMessage(chatId, 'Произошла ошибка при отправке запроса.');
//     }
// });








// const axios = require('axios'); // Добавление записи посредством отправки в телеграм канал сообщения /addrecord
// const TelegramBot = require('node-telegram-bot-api');

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const bot = new TelegramBot(telegramToken, { polling: true });

// // Функция для отправки сообщения в Telegram
// async function sendMessage(chatId, message) {
//     try {
//         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
//         const data = {
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
//         sendMessage(message);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// // Обработчик команды /addrecord
// bot.onText(/\/addrecord/, (msg) => {
//     const chatId = msg.chat.id;

//     fetch('https://652e50390b8d8ddac0b12649.mockapi.io/person/', {
//         method: 'POST',
//         headers: { 'content-type': 'application/json' },
//         body: JSON.stringify({
//             createdAt: '2023-10-18',
//             name: "Elvira C",
//             avatar: 'img.jpg',
//             years: 40,
//             id: '9'
//         })
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Запись успешно добавлена:', data);
//             bot.sendMessage(chatId, 'Запись успешно добавлена:\n' + JSON.stringify(data));
//         })
//         .catch(error => {
//             console.error('Ошибка при добавлении записи:', error);
//             bot.sendMessage(chatId, 'Ошибка при добавлении записи:\n' + error.message);
//         });
// });






// const axios = require('axios'); // Заглюченное удаление данных из mockapi

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const chatId = '1013645358';

// async function sendMessage(message) {
//   try {
//     const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
//     const data = {
//       chat_id: chatId,
//       text: message,
//     };

//     await axios.post(url, data);
//     console.log('Сообщение успешно отправлено в Telegram');
//   } catch (error) {
//     console.error('Ошибка при отправке сообщения в Telegram:', error);
//   }
// }

// async function fetchData(url) {
//   try {
//     const response = await axios.get(url);

//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error(`Ошибка при получении данных: ${response.status}`);
//     }
//   } catch (error) {
//     console.error('Ошибка при получении данных:', error);
//   }
// }

// async function deletePerson(text) {
//   try {
//     const url = `https://652e50390b8d8ddac0b12649.mockapi.io/person/${text}`;
//     const response = await axios.delete(url);

//     if (response.status === 200) {
//       console.log(`Элемент с ID ${text} успешно удален`);

//       const remainingElements = await fetchData('https://652e50390b8d8ddac0b12649.mockapi.io/person');
//       sendMessage(JSON.stringify(remainingElements));
//     } else {
//       throw new Error(`Ошибка при удалении элемента с ID ${text}`);
//     }
//   } catch (error) {
//     console.error('Ошибка при удалении элемента:', error);
//   }
// }

// async function getNewMessages() {
//   try {
//     const url = `https://api.telegram.org/bot${telegramToken}/getUpdates`;
//     const response = await axios.get(url);

//     if (response.data.ok) {
//       const messages = response.data.result;

//       for (const message of messages) {
//         const chat = message.message.chat;
//         const text = message.message.text;

//         console.log(`Получено сообщение от пользователя: ${text}`);

//         if (!isNaN(text)) {
//           deletePerson(text);
//         }
//       }
//     } else {
//       throw new Error('Ошибка при получении новых сообщений из Telegram');
//     }
//   } catch (error) {
//     console.error('Ошибка при получении новых сообщений:', error);
//   }
// }

// setInterval(getNewMessages, 30000);

// async function sendMessage(message) { // Начало функции
//     try { // Конструкция try используется в JavaScript для определения блока кода, в котором может произойти исключение (ошибка). Если внутри блока try возникает исключение, выполнение кода переходит к блоку catch, где можно обработать исключение.
//         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`; // url с токеном Телеграма
//         const data = { // Объект
//             chat_id: chatId, // ID чата, не @... а именно номер
//             text: message, // Текст внутри
//         };

//         await axios.post(url, data); // выполняет асинхронный POST-запрос к указанному URL-адресу с передачей данных в теле запроса. await - это оператор, который используется внутри асинхронной функции для ожидания разрешения промиса
//         console.log('Сообщение успешно отправлено в Telegram'); // Вывод сообщения в консоль об успешной отправке
//     } catch (error) { // Иначе  перейти к блоку catch, где можно обработать исключение, в данном случае ошибку
//         console.error('Ошибка при отправке сообщения в Telegram:', error); // Вывод в консоль ошибки
//     }
// }

// // Ваш код для получения данных
// fetch('https://652e50390b8d8ddac0b12649.mockapi.io/person/', { // 652e50390b8d8ddac0b12649 - что то вроде токена mockapi
//     method: 'GET', // Метод - получение
//     headers: { 'content-type': 'application/json' }, // устанавливает заголовок запроса Content-Type в значение application/json. Заголовок Content- Type указывает тип содержимого, которое отправляется или получается в теле HTTP - запроса или ответа.Значение application / json указывает, что содержимое запроса или ответа является JSON - данными.

// })
//     .then((res) => { // Метод который вызывается после успешного выполнения запроса и получения ответа от сервер
//         if (res.ok) { // Если res.ok равно true, res == true - вызовет ошибку
//             return res.json(); // Вернуть JSON формат
//         } else { // Иначе
//             throw new Error('Error: ' + res.status);  // Если ответ не является успешным (например, имеет статус ошибки), мы выбрасываем ошибку, используя конструкцию throw new Error('Error: ' + res.status). Это позволяет перейти к блоку .catch(), где можно обработать ошибку.
//         }
//     })
//     .then((data) => {
//         // Обработка полученных данных
//         console.log(data);

//         // Преобразование данных в строку
//         const message = JSON.stringify(data);

//         // Отправка сообщения в Telegram
//         sendMessage(message);
//     })
//     .catch((error) => {
//         // Обработка ошибки
//         console.error(error);
//     });



// fetch('https://652e50390b8d8ddac0b12649.mockapi.io/person/', { // Добавление записи
//     method: 'POST',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify({ // Отправляю данные в JSON формате
//         createdAt: '2023-10-18',
//         name: "Tom T",
//         avatar: 'img.jpg',
//         years: 40,
//         id: '7'
//     })
// })
//     .then(response => response.json()) // Метод который вызывается после успешного выполнения запроса и получения ответа от сервер
//     .then(data => { // Если res.ok равно true, res == true - вызовет ошибку
//         console.log('Запись успешно добавлена:', data); // Отправка сообщения в консоль то что запись успешно добавлена
//         // Преобразование данных в строку
//         const message = JSON.stringify(data);

//         // Отправка сообщения в Telegram
//         sendMessage(message);
//     })
//     .catch(error => {
//         console.error('Ошибка при добавлении записи:', error); // Отправка ошибки в консоль если произошла ошибка
//     });



// const axios = require('axios'); // Вывод данных в Телеграм

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk'; // Токен телеграма
// const chatId = '1013645358'; // Замените на фактический ID чата, не @... а именно номер

// // Функция для отправки сообщения в Telegram
// async function sendMessage(message) { // Начало функции
//     try { // Конструкция try используется в JavaScript для определения блока кода, в котором может произойти исключение (ошибка). Если внутри блока try возникает исключение, выполнение кода переходит к блоку catch, где можно обработать исключение.
//         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`; // url с токеном Телеграма
//         const data = { // Объект
//             chat_id: chatId, // ID чата, не @... а именно номер
//             text: message, // Текст внутри
//         };

//         await axios.post(url, data); // выполняет асинхронный POST-запрос к указанному URL-адресу с передачей данных в теле запроса. await - это оператор, который используется внутри асинхронной функции для ожидания разрешения промиса
//         console.log('Сообщение успешно отправлено в Telegram'); // Вывод сообщения в консоль об успешной отправке
//     } catch (error) { // Иначе  перейти к блоку catch, где можно обработать исключение, в данном случае ошибку
//         console.error('Ошибка при отправке сообщения в Telegram:', error); // Вывод в консоль ошибки
//     }
// }

// // Ваш код для получения данных
// fetch('https://652e50390b8d8ddac0b12649.mockapi.io/person/', { // 652e50390b8d8ddac0b12649 - что то вроде токена mockapi
//     method: 'GET', // Метод - получение
//     headers: { 'content-type': 'application/json' }, // устанавливает заголовок запроса Content-Type в значение application/json. Заголовок Content- Type указывает тип содержимого, которое отправляется или получается в теле HTTP - запроса или ответа.Значение application / json указывает, что содержимое запроса или ответа является JSON - данными.

// })
//     .then((res) => { // Метод который вызывается после успешного выполнения запроса и получения ответа от сервер
//         if (res.ok) { // Если res.ok равно true, res == true - вызовет ошибку
//             return res.json(); // Вернуть JSON формат
//         } else { // Иначе
//             throw new Error('Error: ' + res.status);  // Если ответ не является успешным (например, имеет статус ошибки), мы выбрасываем ошибку, используя конструкцию throw new Error('Error: ' + res.status). Это позволяет перейти к блоку .catch(), где можно обработать ошибку.
//         }
//     })
//     .then((data) => {
//         // Обработка полученных данных
//         console.log(data);

//         // Преобразование данных в строку
//         const message = JSON.stringify(data);

//         // Отправка сообщения в Telegram
//         sendMessage(message);
//     })
//     .catch((error) => {
//         // Обработка ошибки
//         console.error(error);
//     });



// fetch('https://652e50390b8d8ddac0b12649.mockapi.io/person/', { // Вывод данных в консоль
//     method: 'GET',
//     headers: { 'content-type': 'application/json' },
// }).then(res => {
//     if (res.ok) {
//         return res.json();
//     } else {
//         throw new Error('Error: ' + res.status);
//     }
// }).then(data => {
//     // Обработка полученных данных
//     console.log(data);
// }).catch(error => {
//     // Обработка ошибки
//     console.error(error);
// });
// 6387626529: AAEwNwwFc_2PjD6 - thtsoO99WRNgChoOd - A

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk'; // Токен телеграма
// const chatId = '1013645358'; // Замените на фактический ID чата, не @... а именно номер