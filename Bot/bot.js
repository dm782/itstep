const path = require("path"); // Подключаю библиотеку path
var envPath = path.join(__dirname, ".env") // создает переменную envPath, которая содержит путь к файлу .env. __dirname - это глобальная переменная в Node.js, которая представляет путь к текущей директории, в которой находится исполняемый файл.
require("dotenv").config({ path: envPath }) //  загружает содержимое файла .env и помещает его в переменные окружения. Модуль dotenv позволяет загружать переменные окружения из файла .env в процесс Node.js
const { telegramToken, lpTrackerToken } = process.env // Деструктуризация telegramToken и lpTrackerToken изenv файла

const fetch = require('node-fetch'); // Подключаю библиотеку запросов

const { Telegraf } = require('telegraf'); // Подключаю библиотеку Telegraf
const bot = new Telegraf(telegramToken); // создает новый экземпляр класса Telegraf и присваивает его переменной bot. В скобках (telegramToken) указывается аргумент, который передается в конструктор класса

(async function () {
    bot.launch();
    await bot.telegram.sendMessage(1013645358, { text: "Принять заказ", reply_markup: { inline_keyboard: [[{ text: "Принять заказ", callback_data: "lnk" }], [{ text: "Отклонить заказ", callback_data: "nolnk" }]] } });
    await bot.telegram.sendMessage(1013645358, { text: "Not inline button" }, { reply_markup: { keyboard: [[{ text: "Вывести лид по ID" }], [{ text: "Вывести список лидов" }], [{ text: "Фильтрация по принятым заказам" }], [{ text: "Фильтрация по непринятым заказам" }]] } });
})();


bot.hears('Вывести лид по ID', async (ctx) => {
    await ctx.reply('Введите ID лида');

    bot.on('text', async (ctx) => {
        const leadId = ctx.message.text;

        try {
            const response = await fetch(`https://direct.lptracker.ru/lead/${leadId}`, { headers: { token: lpTrackerToken } });
            const data = await response.json();           
            const { id, contact, created_at, custom } = data.result;
            
            const message = `ID лида: ${id}\nИмя лида: ${contact.name}\nНомер телефона: ${contact.details.find(detail => detail.type === 'phone').data}\nДата и время выезда на заказ: ${custom.find(object => object.name == 'Дата выполнения сделки').value}\nАдрес заказа: ${custom.find(object => object.name == 'Адрес').value}\nПараметры заказа: ${custom.find(object => object.name == 'Важная информация').value}\nДата создания: ${created_at}`;
            await ctx.reply(message, {
                reply_markup: {
                    inline_keyboard: [[{ text: "Принять заказ", callback_data: "lnk" }], [{ text: "Отклонить заказ", callback_data: "nolnk" }]],
                }
            });
        } catch (error) {
            console.error('Ошибка при получении данных из LPTracker:', error);
        }
    });
});

bot.action('lnk', async (ctx) => { // Delete
    async function sendRequest(leadId) {
        try {
            const response = await fetch(`https://direct.lptracker.ru/lead/${leadId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "token": "M0r1Xzd6eh7aSVDOt9eJcUmfnj55XzvX"
                },
                method: "PUT",
                body: JSON.stringify({
                    "custom": {
                        "2105539": "Да"
                    }
                })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }


    const leadId = ctx.callbackQuery.message.text.split('\n')[0].split(': ')[1];
    await sendRequest(leadId);
}); // Delete




bot.hears('Вывести список лидов', async (ctx) => {
    try {
        const response = await fetch("https://direct.lptracker.ru/lead/103451/list?offset=0&limit=10&sort[updated_at]=3&filter[created_at_from]=1535529725", { headers: { token: lpTrackerToken } });
        const data = await response.json(); // Преобразование ответа в JSON 
        // console.log(data.result);


        data.result.forEach(function (item) {
            var idList = item.id.toString();
            var address = item.custom.find(object => object.name == 'Адрес');
            var phone = item.contact.details.find(detail => detail.type === 'phone').data;
            var name = item.contact.name;
            var parametrs = item.custom.find(object => object.name == 'Важная информация').value;
            var message = 'ID лида: ' + idList + '\nИмя клиента: ' + name + '\nАдрес клиента: ' + address.value + '\nТелефон клиента: ' + phone + '\nПараметры заказа: ' + parametrs;// объединяем id и адрес в одну строку
            ctx.reply(message).catch(err => console.log(err));
        });

    } catch (error) {
        console.log("Ошибка при получении данных из LPTracker: " + error);
    }
});


bot.hears('Фильтрация по принятым заказам', async (ctx) => {
    try {
        const response = await fetch("https://direct.lptracker.ru/lead/103451/list?offset=0&limit=10&sort[updated_at]=3&filter[created_at_from]=1535529725", { headers: { token: lpTrackerToken } });
        const data = await response.json(); // Преобразование ответа в JSON 
        console.log(data.result[0].custom.find(object => object.name == 'Заказ принят в работу?').value);


        data.result.forEach(function (item) {
            var idList = item.id.toString();
            var address = item.custom.find(object => object.name == 'Адрес');
            var phone = item.contact.details.find(detail => detail.type === 'phone').data;
            var name = item.contact.name;
            var parametrs = item.custom.find(object => object.name == 'Важная информация').value;
            var orderWork = item.custom.find(object => object.name == 'Заказ принят в работу?').value;

            if (orderWork[0] === 'Да') {
                var message = 'ID лида: ' + idList + '\nИмя клиента: ' + name + '\nАдрес клиента: ' + address.value + '\nТелефон клиента: ' + phone + '\nПараметры заказа: ' + parametrs + '\nЗаказ принят в работу?: ' + orderWork;
                ctx.reply(message).catch(err => console.log(err));
            }
        });
    } catch (error) {
        console.log("Ошибка при получении данных из LPTracker: " + error);
    }
});



bot.hears('Фильтрация по непринятым заказам', async (ctx) => {
    try {
        const response = await fetch("https://direct.lptracker.ru/lead/103451/list?offset=0&limit=10&sort[updated_at]=3&filter[created_at_from]=1535529725", { headers: { token: lpTrackerToken } });
        const data = await response.json(); // Преобразование ответа в JSON 
        console.log(data.result[0].custom.find(object => object.name == 'Заказ принят в работу?').value);


        data.result.forEach(function (item) {
            var idList = item.id.toString();
            var address = item.custom.find(object => object.name == 'Адрес');
            var phone = item.contact.details.find(detail => detail.type === 'phone').data;
            var name = item.contact.name;
            var parametrs = item.custom.find(object => object.name == 'Важная информация').value;
            var orderWork = item.custom.find(object => object.name == 'Заказ принят в работу?').value;

            if (orderWork[0] === 'Нет') {
                var message = 'ID лида: ' + idList + '\nИмя клиента: ' + name + '\nАдрес клиента: ' + address.value + '\nТелефон клиента: ' + phone + '\nПараметры заказа: ' + parametrs + '\nЗаказ принят в работу?: ' + orderWork;
                ctx.reply(message, {
                reply_markup: {
                    inline_keyboard: [[{ text: "Принять заказ", callback_data: "lnk" }], [{ text: "Отклонить заказ", callback_data: "nolnk" }]],
                }
            });
            }
        });
    } catch (error) {
        console.log("Ошибка при получении данных из LPTracker: " + error);
    }
});

// async function sendRequest(newValue) {
//     var request = await fetch(`https://direct.lptracker.ru/lead/${leadId}`, {
//         headers: {
//             "Content-Type": "application/json",
//             "token": "M0r1Xzd6eh7aSVDOt9eJcUmfnj55XzvX"
//         },
//         method: "PUT",
//         body: JSON.stringify({
//             "custom": {
//                 "2105539": "Да"
//             }
//         })
//     })
//     console.log(await request.json())
// }
// sendRequest()





// Для того чтобы добавить кнопку в меню нужно, для начала после инициализации подключения всех библиотек, .env, и прочего, через (async function () {
// bot.launch(); подключить все кнопки
// Например:
// (async function () {
//     bot.launch();
//     await bot.telegram.sendMessage(1013645358, { text: "Not inline button" }, { reply_markup: { keyboard: [[{ text: "Вывести лид по ID" }], [{ text: "Вывести список лидов" }], [{ text: "Фильтрация по принятым заказам" }], [{ text: "Фильтрация по непринятым заказам" }]] } });
// })();
// После через bot.hears или bot.on она подключается при помощи функции
// bot.hears('Вывести лид по ID', async (ctx) => { - начала должно быть таким, где 'Вывести лид по ID' - это название в переменной text, из вот этой строчки await bot.telegram.sendMessage(1013645358, { text: "Not inline button" }, { reply_markup: { keyboard: [[{ text: "Вывести лид по ID" }], [{ text: "Вывести список лидов" }], [{ text: "Фильтрация по принятым заказам" }], [{ text: "Фильтрация по непринятым заказам" }]] } });






// bot.launch() 






// bot.hears('Вывести лид по ID', async (ctx) => {
//     await ctx.reply('Введите ID лида');

//     bot.on('text', async (ctx) => {
//         const leadId = ctx.message.text;

//         try {
//             const response = await fetch(`https://direct.lptracker.ru/lead/${leadId}`, { headers: { token: lpTrackerToken } });
//             const data = await response.json();
//             const { id, contact, created_at, custom } = data.result;

//             const message = `ID лида: ${id}\nИмя лида: ${contact.name}\nНомер телефона: ${contact.details.find(detail => detail.type === 'phone').data}\nДата и время выезда на заказ: ${custom.find(object => object.name == 'Дата выполнения сделки').value}\nАдрес заказа: ${custom.find(object => object.name == 'Адрес').value}\nПараметры заказа: ${custom.find(object => object.name == 'Важная информация').value}\nДата создания: ${created_at}`;
//             await ctx.reply(message, {
//                 reply_markup: {
//                     inline_keyboard: [[{ text: "Принять заказ", callback_data: "lnk" }], [{ text: "Отклонить заказ", callback_data: "nolnk" }]],
//                 }
//             });
//         } catch (error) {
//             console.error('Ошибка при получении данных из LPTracker:', error);
//         }
//     });
// });


































// bot.on("message", ctx => {
//     ctx.reply("Прости, не понимаю тебя, вот список команд, которые я могу обработать");
// });


// bot.launch();

// (async function () {
//     bot.launch()
//     await bot.telegram.sendMessage(1386450473, { text: "Inlune button" }, { reply_markup: { inline_keyboard: [[{ text: "Inline button", callback_data: "dfsajikfsdjlajklsdfa" }]] } })
//     await bot.telegram.sendMessage(1386450473, { text: "Not inline button" }, { reply_markup: { keyboard: [[{ text: "Привет" }]] } })
// })();

// bot.action("dfsajikfsdjlajklsdfa", ctx => ctx.reply("как дела?"))

// bot.hears("Вывести лид по ID", async (ctx) => {
//     // Отправляем сообщение "Введите ID лида"
//     await ctx.reply('Введите ID лида');

//     await bot.telegram.sendMessage(1386450473, { text: "Not inline button" }, { reply_markup: { keyboard: [[{ text: "Вывести лид по ID" }]] } });

//     // Ожидаем ответ пользователя
//     bot.on('text', async (ctx) => {
//         const leadId = ctx.message.text; // Получаем ID лида из сообщения пользователя

//         try {
//             const response = await fetch(`https://direct.lptracker.ru/lead/${leadId}`, { headers: { token: lpTrackerToken } });
//             const data = await response.json();
//             // console.log(data);
//             const { id, contact, created_at, custom } = data.result;
//             const message = `ID лида: ${id}\nИмя лида: ${contact.name}\nНомер телефона: ${contact.details.find(detail => detail.type === 'phone').data}\nДата и время выезда на заказ: ${custom.find(object => object.name == 'Дата выполнения сделки').value}\nАдрес заказа: ${custom.find(object => object.name == 'Адрес').value}\nПараметры заказа: ${custom.find(object => object.name == 'Важная информация').value}\nДата создания: ${created_at}`;
//             await ctx.reply(message);
//         } catch (error) {
//             console.error('Ошибка при получении данных из LPTracker:', error);
//         }
//     });
// });





// bot.command('list', async (ctx) => {
//     try {
//         const response = await fetch("https://direct.lptracker.ru/lead/103451/list?offset=0&limit=10&sort[updated_at]=3&filter[created_at_from]=1535529725", { headers: { token: lpTrackerToken } });
//         const data = await response.json(); // Преобразование ответа в JSON 
//         // console.log(data.result);
//         data.result.forEach(function (item) {
//             var idList = item.id.toString();
//             var address = item.custom.find(object => object.name == 'Адрес');
//             var phone = item.contact.details.find(detail => detail.type === 'phone').data;
//             var name = item.contact.name;
//             var parametrs = item.custom.find(object => object.name == 'Важная информация').value;
//             var message = 'ID лида: ' + idList + '\nИмя клиента: ' + name + '\nАдрес клиента: ' + address.value + '\nТелефон клиента: ' + phone + '\nПараметры заказа: ' + parametrs;// объединяем id и адрес в одну строку
//             ctx.reply(message).catch(err => console.log(err));
//         });

//     } catch (error) {
//         console.log("Ошибка при получении данных из LPTracker: " + error);
//     }
// });

// bot.command('edit', async (ctx) => {
//     try {
//         const response = await fetch("https://direct.lptracker.ru/lead/79061902", { method: 'PUT', headers: { token: lpTrackerToken } });
//         const data = await response.json();
//         const { contact } = data.result;
//         contact.name === 'Максим';
//         await ctx.reply(contact.name).catch(err => console.log(err));
//     } catch (error) {
//         console.error('Ошибка при получении данных из LPTracker:', error);
//     }
// });



// bot.launch() 



// const path = require("path")
// var envPath = path.join(__dirname, ".env")
// require("dotenv").config({ path: envPath })
// const { telegramToken, lpTrackerToken } = process.env

// const fetch = require('node-fetch');

// const { Telegraf } = require('telegraf');
// const bot = new Telegraf(telegramToken);

// const { Markup } = require('telegraf');

// bot.on('text', async (ctx) => {
//     await ctx.reply('Выберите действие:', Markup.keyboard([
//         ['Вывести лид по ID'],
//         ['Вывести список лидов']
//     ]).resize().oneTime());
// });


// bot.on('text', async (ctx) => {
//     const selectedAction = ctx.message.text;

//     if (selectedAction === 'Вывести лид по ID') {
//         // Отправляем сообщение "Введите ID лида"
//         await ctx.reply('Введите ID лида');

//         // Ожидаем ответ пользователя
//         bot.on('text', async (ctx) => {
//             const leadId = ctx.message.text; // Получаем ID лида из сообщения пользователя

//             try {
//                 const response = await fetch(`https://direct.lptracker.ru/lead/${leadId}`, { headers: { token: lpTrackerToken } });
//                 const data = await response.json();
//                 // console.log(data);
//                 const { id, contact, created_at, custom } = data.result;
//                 const message = `ID лида: ${id}\nИмя лида: ${contact.name}\nНомер телефона: ${contact.details.find(detail => detail.type === 'phone').data}\nДата и время выезда на заказ: ${custom.find(object => object.name === 'Дата выполнения сделки').value}\nАдрес заказа: ${custom.find(object => object.name === 'Адрес').value}\nПараметры заказа: ${custom.find(object => object.name === 'Важная информация').value}\nДата создания: ${created_at}`;
//                 await ctx.reply(message); // Исправлено: передаем сообщение без использования .catch()
//             } catch (error) {
//                 console.error('Ошибка при получении данных из LPTracker:', error);
//             }
//         });
//     }
    
//     else if (selectedAction === 'Вывести список лидов') {
//         try {
//             const response = await fetch("https://direct.lptracker.ru/lead/103451/list?offset=0&limit=10&sort[updated_at]=3&filter[created_at_from]=1535529725", { headers: { token: lpTrackerToken } });
//             const data = await response.json();
//             // console.log(data.result);

//             data.result.forEach(async function (item) {
//                 var idList = item.id.toString();
//                 var address = item.custom.find(object => object.name === 'Адрес');
//                 var phone = item.contact.details.find(detail => detail.type === 'phone').data;
//                 var name = item.contact.name;
//                 var parametrs = item.custom.find(object => object.name === 'Важная информация').value;
//                 var message = 'ID лида: ' + idList + '\nИмя клиента: ' + name + '\nАдрес клиента: ' + address.value + '\nТелефон клиента: ' + phone + '\nПараметры заказа: ' + parametrs;
//                 await ctx.reply(message); // Исправлено: передаем сообщение без использования .catch()
//             });
//         } catch (error) {
//             console.log("Ошибка при получении данных из LPTracker: " + error);
//         }
//     } else {
//         await ctx.reply('Неверный выбор. Пожалуйста, выберите действие из предложенных кнопок.');
//     }
// });


// bot.launch() 




// const path = require("path") // Подключаю библиотеку path
// var envPath = path.join(__dirname, ".env") // создает переменную envPath, которая содержит путь к файлу .env. __dirname - это глобальная переменная в Node.js, которая представляет путь к текущей директории, в которой находится исполняемый файл.
// require("dotenv").config({ path: envPath }) //  загружает содержимое файла .env и помещает его в переменные окружения. Модуль dotenv позволяет загружать переменные окружения из файла .env в процесс Node.js
// const { telegramToken, lpTrackerToken } = process.env // Деструктуризация telegramToken и lpTrackerToken изenv файла

// const fetch = require('node-fetch'); // Подключаю библиотеку запросов

// const { Telegraf } = require('telegraf'); // Подключаю библиотеку Telegraf
// const bot = new Telegraf(telegramToken); // создает новый экземпляр класса Telegraf и присваивает его переменной bot. В скобках (telegramToken) указывается аргумент, который передается в конструктор класса


// bot.command('lead', async (ctx) => {
//     // Отправляем сообщение "Введите ID лида"
//     await ctx.reply('Введите ID лида'); // Вывод сообщения в Телеграм Простыми словами await - пожалуйста подожди пока эта операция не будет завершена

//     // Ожидаем ответ пользователя
//     bot.on('text', async (ctx) => {
//         const leadId = ctx.message.text; // Получаем ID лида из сообщения пользователя

//         try {
//             const response = await fetch(`https://direct.lptracker.ru/lead/${leadId}`, { headers: { token: lpTrackerToken } });
//             const data = await response.json();
//             // console.log(data);
//             const { id, contact, created_at, custom } = data.result;
//             const message = `ID лида: ${id}\nИмя лида: ${contact.name}\nНомер телефона: ${contact.details.find(detail => detail.type === 'phone').data}\nДата и время выезда на заказ: ${custom.find(object => object.name == 'Дата выполнения сделки').value}\nАдрес заказа: ${custom.find(object => object.name == 'Адрес').value}\nПараметры заказа: ${custom.find(object => object.name == 'Важная информация').value}\nДата создания: ${created_at}`;
//             await ctx.reply(message).catch(err => console.log(err));
//         } catch (error) {
//             console.error('Ошибка при получении данных из LPTracker:', error);
//         }
//     });
// });



// bot.command('list', async (ctx) => {
//     try {
//         const response = await fetch("https://direct.lptracker.ru/lead/103451/list?offset=0&limit=10&sort[updated_at]=3&filter[created_at_from]=1535529725", { headers: { token: lpTrackerToken } });
//         const data = await response.json();
//         // console.log(data.result);


//         data.result.forEach(function (item) {
//             var idList = item.id.toString();
//             var address = item.custom.find(object => object.name == 'Адрес');
//             var phone = item.contact.details.find(detail => detail.type === 'phone').data;
//             var name = item.contact.name;
//             var parametrs = item.custom.find(object => object.name == 'Важная информация').value;
//             var message = 'ID лида: ' + idList + '\nИмя клиента: ' + name + '\nАдрес клиента: ' + address.value + '\nТелефон клиента: ' + phone + '\nПараметры заказа: ' + parametrs;// объединяем id и адрес в одну строку
//             ctx.reply(message).catch(err => console.log(err));
//         });

//     } catch (error) {
//         console.log("Ошибка при получении данных из LPTracker: " + error);
//     }
// });

// bot.launch() 

// Как работает forEach, ввожу data.result.forEach(function (item) { где data - это JSON result - первый объект или массив .forEach(function и (item) - как единица элемента
// Дальше в var прописываю переменные = item - единица, без этого НЕ РАБОТАЕТ!, после прописывается весь путь после data.result
// Если переменная из объекта custom просто так до неё будет не достучаться, значит вывожу по примеру item.custom.find(object => object.name == 'Адрес');
// Вывод всех переменных в одну осуществляется по аналогичному принципу
// var message = 'ID лида: ' + idList + '\nИмя клиента: ' + name + '\nАдрес клиента: ' + address.value + '\nТелефон клиента: ' + phone + '\nПараметры заказа: ' + parametrs;
// ctx.reply(message).catch(err => console.log(err)); - вывод сообщения в Телеграм


// const path = require("path")
// var envPath = path.join(__dirname, ".env")
// require("dotenv").config({ path: envPath })
// const { telegramToken, lpTrackerToken } = process.env

// const fetch = require('node-fetch');

// const { Telegraf } = require('telegraf');
// const bot = new Telegraf(telegramToken);

// // bot.command("getid", ctx => ctx.reply(ctx.from.id.toString())) // Отправка сообщения пользователю по id

// bot.on('text', async (ctx) => { // Ответ при вводе любого текста
//     try {
//         const response = await fetch("https://direct.lptracker.ru/lead/79158984", { headers: { token: lpTrackerToken } }); // выполняется запрос к указанному URL с использованием функции fetch
//         const data = await response.json(); // После получения ответа от сервера, используется метод .json() для преобразования ответа в формат JSON. Затем данные из ответа сохраняются в переменную data.
//         console.log(data)
//         const { id, contact, created_at, custom } = data.result;
//         const message = `ID лида: ${id}\nИмя лида: ${contact.name}\nНомер телефона: ${contact.details.find(detail => detail.type === 'phone').data}\nДата и время выезда на заказ: ${custom.find(object => object.name == 'Дата выполнения сделки').value}\nАдрес заказа: ${custom.find(object => object.name == 'Адрес').value }\nПараметры заказа: ${custom.find(object => object.name == 'Важная информация').value }\nДата создания: ${created_at}`;
//         await ctx.reply(message).catch(err => console.log(err))
//     }
//     catch (error) { // Обработка ошибки
//         console.error('Ошибка при получении данных из LPTracker:', error);
//     }
// });

// bot.launch() 




// const { Telegraf } = require('telegraf');
// const fetch = require('node-fetch');

// const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// const chatId = '1013645358';
// const lpTrackerToken = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// const bot = new Telegraf(telegramToken);

// async function sendMessage(message) { // Копируемое
//     try {
//         await bot.telegram.sendMessage(chatId, message);
//         console.log('Сообщение успешно отправлено в Telegram');
//     } catch (error) {
//         console.error('Ошибка при отправке сообщения в Telegram:', error);
//     }
// }

// bot.on('text', async (ctx) => { // Ответ при вводе любого текста

//     try {
//         const url = `https://direct.lptracker.ru/lead/79061902`; // url лида
//         const headers = { // используется для передачи заголовков в HTTP-запросах
//             token: lpTrackerToken // Токен lptracker
//         }; // Закрыл объект
//         const response = await fetch(url, { headers }); // выполняется запрос к указанному URL с использованием функции fetch
//         const data = await response.json(); // После получения ответа от сервера, используется метод .json() для преобразования ответа в формат JSON. Затем данные из ответа сохраняются в переменную data.
//         const lead = data.result; // Далее, предполагается, что в полученных данных есть свойство result, и оно присваивается переменной lead         
//             const message = ` 
//                 ID лида: ${lead.id} 
//                 Имя лида: ${lead.contact.name}
//                 Контакт ID: ${lead.contact.details.find(detail => detail.type === 'phone').data}
//                 Дата создания: ${lead.created_at}
//             `;
//             await sendMessage(message);
//     } catch (error) { // Обработка ошибки
//         console.error('Ошибка при получении данных из LPTracker:', error);
//     }
// });

//  bot.launch() // Запуск бота







// // const { Telegraf } = require('telegraf');
// // const axios = require('axios');

// // const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
// // const chatId = '1013645358';
// // const lpTrackerToken = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// // bot.hears('getLeads', async (ctx) => {
// //     try {
// //         const response = await axios.get('https://direct.lptracker.ru/lead/103451/list?offset=10&limit=1&sort[updated_at]=3&filter[created_at_from]=1535529725');
// //         const leads = response.data;
// //         return ctx.replyWithJSON(leads);
// //     } catch (error) {
// //         ctx.reply(error.message);
// //     }
// // });

// // bot.launch();








// // const { Telegraf } = require('telegraf');
// // const fetch = require('node-fetch');

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';
// // const lpTrackerToken = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// // const bot = new Telegraf(telegramToken);

// // async function sendMessage(message) {
// //     try {
// //         await bot.telegram.sendMessage(chatId, message);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }

// // bot.command('edit', async (ctx) => {
// //     try {
// //         await ctx.reply('Введите номер лида');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // });

// // bot.on('text', async (ctx) => {
// //     const leadNumber = ctx.message.text;

// //     try {
// //         const url = `https://direct.lptracker.ru/lead/${leadNumber}`;
// //         const headers = {
// //             token: lpTrackerToken
// //         };
// //         const response = await fetch(url, { headers });
// //         const data = await response.json();

// //         if (data.status === 'success') {
// //             const lead = data.result;
// //             const formattedDate = new Date(lead.created_at).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
// //             const message = `
// //                 ID лида: ${lead.id}
// //                 Имя лида: ${lead.contact.name}
// //                 Контакт ID: ${lead.contact.details.find(detail => detail.type === 'phone').data}
// //                 Дата создания: ${lead.created_at}
// //             `;
// //             await sendMessage(message);
// //         } else {
// //             const errorMessage = `Ошибка при получении данных о лиде: ${data.errors[0].message}`;
// //             await sendMessage(errorMessage);
// //         }
// //     } catch (error) {
// //         console.error('Ошибка при получении данных из LPTracker:', error);
// //     }
// // });

// // bot.launch().then(() => {
// //     console.log('Бот успешно запущен');
// // }).catch((error) => {
// //     console.error('Ошибка при запуске бота:', error);
// // });







// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';

// // // Создание экземпляра объекта TelegramBot
// // const bot = new TelegramBot(telegramToken, { polling: true });

// // // Функция для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }
// // // Ваш код для получения данных
// // fetch('https://652e50390b8d8ddac0b12649.mockapi.io/person/', {
// //     method: 'GET',
// //     headers: { 'content-type': 'application/json' },
// // })
// //     .then((res) => {
// //         if (res.ok) {
// //             return res.json();
// //         } else {
// //             throw new Error('Error: ' + res.status);
// //         }
// //     })
// //     .then((data) => {
// //         console.log(data);

// //         const message = JSON.stringify(data);

// //     })
// //     .catch((error) => {
// //         console.error(error);
// //     });

// // bot.onText(/\/edit/, async (msg) => {
// //     const chatId = msg.chat.id;

// //     try {
// //         await bot.sendMessage(chatId, 'Введите номер лида');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // });

// // bot.on('message', async (msg) => {
// //     const chatId = msg.chat.id;
// //     const messageText = msg.text;

// //     if (messageText) {
// //         try {
// //             const leadNumber = messageText;
// //             const url = `https://652e50390b8d8ddac0b12649.mockapi.io/person/${leadNumber}`;
// //             const response = await axios.get(url);
// //             const data = response.data;

// //             const message = JSON.stringify(data);
// //             await sendMessage(message);
// //         } catch (error) {
// //             console.error('Ошибка при получении данных из MockAPI:', error);
// //         }
// //     }
// // });




// // const TelegramBot = require('node-telegram-bot-api'); // Вывод элемента по номеру id
// // const axios = require('axios');

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';

// // // Создание экземпляра объекта TelegramBot
// // const bot = new TelegramBot(telegramToken, { polling: true });

// // // Функция для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }
// // // Ваш код для получения данных
// // fetch('https://652e50390b8d8ddac0b12649.mockapi.io/person/', {
// //     method: 'GET',
// //     headers: { 'content-type': 'application/json' },
// // })
// //     .then((res) => {
// //         if (res.ok) {
// //             return res.json();
// //         } else {
// //             throw new Error('Error: ' + res.status);
// //         }
// //     })
// //     .then((data) => {
// //         console.log(data);

// //         const message = JSON.stringify(data);
        
// //     })
// //     .catch((error) => {
// //         console.error(error);
// //     });

// // bot.onText(/\/edit/, async (msg) => {
// //     const chatId = msg.chat.id;

// //     try {
// //         await bot.sendMessage(chatId, 'Введите номер лида');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // });

// // bot.on('message', async (msg) => {
// //     const chatId = msg.chat.id;
// //     const messageText = msg.text;

// //     if (messageText) {
// //         try {
// //             const leadNumber = messageText;
// //             const url = `https://652e50390b8d8ddac0b12649.mockapi.io/person/${leadNumber}`;
// //             const response = await axios.get(url);
// //             const data = response.data;

// //             const message = JSON.stringify(data);
// //             await sendMessage(message);
// //         } catch (error) {
// //             console.error('Ошибка при получении данных из MockAPI:', error);
// //         }
// //     }
// // });





// // const axios = require('axios'); // Получение лида

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';

// // // Функция для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }

// // const url = 'https://direct.lptracker.ru/lead/61488688;';
// // const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// // axios.get(url, {
// //     headers: {
// //         'token': token
// //     }
// // })
// //     .then(response => {
// //         console.log(response.data);
// //         const message = JSON.stringify(response.data);
// //         const result = response.data.result; // Получение массива "result" из ответа

// //         const resultes = response.data.result; // Получение массива "result" из ответа


// //         sendMessage(message);
// //     })
// //     .catch(error => {
// //         console.error(error);
// //     });





// // const TelegramBot = require('node-telegram-bot-api'); // Вывод лидов с оплатой и без

// // const axios = require('axios'); // Рабочая версия версия вывода лидов № 3

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';

// // const bot = new TelegramBot(telegramToken, { polling: true });

// // //Функция для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }

// // fetch('https://direct.lptracker.ru/lead/62156971/', {
// //     method: 'GET',
// //     headers: { 'content-type': 'application/json' },
// // })
// //     .then((res) => {
// //         if (res.ok) {
// //             return res.json();
// //         } else {
// //             throw new Error('Error: ' + res.status);
// //         }
// //     })
// //     .then((data) => {
// //         console.log(data);

// //         const message = JSON.stringify(data);

// //     })
// //     .catch((error) => {
// //         console.error(error);
// //     });


// // const url = 'https://direct.lptracker.ru/lead/62156971/'; // const url = 'https://direct.lptracker.ru/lead/78949162';
// // const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// // bot.onText(/\/payments/, async (msg) => {
// //     const chatId = msg.chat.id;

// //     axios.get(url, {
// //         headers: {
// //             'token': token
// //         }
// //     })
// //         .then(response => { // мы получаем ответ от запроса и сохраняем данные о лидах в переменную leadData
// //             console.log(response.data); // Также выводим данные ответа в консоль с помощью console.log(response.data)
// //             const leadData = response.data.result; // Данные о лидах в переменную leadData

// //             leadData.forEach(lead => { // метод forEach для перебора каждого элемента массива leadData
// //                 const ids = lead.contact.id
// //                 const phone = lead.contact.details.find(detail => detail.type === 'phone').data; // Для извлечения информации о телефоне мы используем метод find для поиска объекта с типом 'phone' в массиве lead.contact.details. Затем мы получаем значение свойства data этого объекта и сохраняем его в переменную phone.
// //                 const name = lead.contact.name; // Переменная имени
// //                 const money = [];
// //                 for (let i = 0; i < lead.payments.length; i++) {
// //                     money.push(lead.payments[i].sum);
// //                 }

// //                 const createdAt = lead.created_at; // Переменная даты

// //                 console.log('id:', ids);
// //                 console.log('Телефон:', phone);
// //                 console.log('Имя:', name);
// //                 console.log('Оплата:', money);
// //                 console.log('Дата создания:', createdAt);

// //                 // Отправка сообщения в Telegram
// //                 const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

// //                 const telegramData = {
// //                     chat_id: chatId,
// //                     text: `id: ${ids}\nТелефон: ${phone}\nИмя: ${name}\nОплата: ${money}\nДата создания: ${createdAt}`,
// //                 };

// //                 axios.post(telegramUrl, telegramData)
// //                     .then(() => {
// //                         console.log('Сообщение успешно отправлено в Telegram');
// //                     })
// //                     .catch(error => {
// //                         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //                     });
// //             });
// //         })
// //         .catch(error => {
// //             console.error('Ошибка при получении данных:', error);
// //         });
// // });




// // const TelegramBot = require('node-telegram-bot-api'); // Вывод лидов с оплатой и без

// // const axios = require('axios'); // Рабочая версия версия вывода лидов № 3

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';

// // const bot = new TelegramBot(telegramToken, { polling: true });

// // //Функция для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }

// // fetch('https://direct.lptracker.ru/lead/103451/list?offset01&limit=3&sort[updated_at]=3&filter[created_at_from]=1535529725', {
// //     method: 'GET',
// //     headers: { 'content-type': 'application/json' },
// // })
// //     .then((res) => {
// //         if (res.ok) {
// //             return res.json();
// //         } else {
// //             throw new Error('Error: ' + res.status);
// //         }
// //     })
// //     .then((data) => {
// //         console.log(data);

// //         const message = JSON.stringify(data);

// //     })
// //     .catch((error) => {
// //         console.error(error);
// //     });


// // const url = 'https://direct.lptracker.ru/lead/103451/list?offset01&limit=10&sort[updated_at]=3&filter[created_at_from]=1535529725'; // const url = 'https://direct.lptracker.ru/lead/78949162';
// // const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// // bot.onText(/\/payments/, async (msg) => {
// //     const chatId = msg.chat.id;

// //     axios.get(url, {
// //         headers: {
// //             'token': token
// //         }
// //     })
// //         .then(response => { // мы получаем ответ от запроса и сохраняем данные о лидах в переменную leadData
// //             console.log(response.data); // Также выводим данные ответа в консоль с помощью console.log(response.data)
// //             const leadData = response.data.result; // Данные о лидах в переменную leadData

// //             leadData.forEach(lead => { // метод forEach для перебора каждого элемента массива leadData
// //                 const ids = lead.contact.id
// //                 const phone = lead.contact.details.find(detail => detail.type === 'phone').data; // Для извлечения информации о телефоне мы используем метод find для поиска объекта с типом 'phone' в массиве lead.contact.details. Затем мы получаем значение свойства data этого объекта и сохраняем его в переменную phone.
// //                 const name = lead.contact.name; // Переменная имени
// //                 const money = [];
// //                 for (let i = 0; i < lead.payments.length; i++) {
// //                     money.push(lead.payments[i].sum);
// //                 }

// //                 const createdAt = lead.created_at; // Переменная даты

// //                 console.log('id:', ids);
// //                 console.log('Телефон:', phone);
// //                 console.log('Имя:', name);
// //                 console.log('Оплата:', money);
// //                 console.log('Дата создания:', createdAt);

// //                 // Отправка сообщения в Telegram
// //                 const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

// //                 const telegramData = {
// //                     chat_id: chatId,
// //                     text: `id: ${ids}\nТелефон: ${phone}\nИмя: ${name}\nОплата: ${money}\nДата создания: ${createdAt}`,
// //                 };

// //                 axios.post(telegramUrl, telegramData)
// //                     .then(() => {
// //                         console.log('Сообщение успешно отправлено в Telegram');
// //                     })
// //                     .catch(error => {
// //                         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //                     });
// //             });
// //         })
// //         .catch(error => {
// //             console.error('Ошибка при получении данных:', error);
// //         });
// // });




// // const TelegramBot = require('node-telegram-bot-api');
// // const axios = require('axios');

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358'; // Замените на ваш chat_id

// // axios.get('https://api.example.com/leads')
// //   .then(response => {
// //     const leadData = response.data;

// //     leadData.forEach(lead => {
// //       const ids = lead.details.map(item => item.id);
// //       const phone = lead.contact.details.find(detail => detail.type === 'phone').data;
// //       const name = lead.contact.name;
// //       const money = lead.payments[0].sum;

// //       const createdAt = lead.created_at;

// //       console.log('id:', ids);
// //       console.log('Телефон:', phone);
// //       console.log('Имя:', name);
// //       console.log('Оплата:', money);
// //       console.log('Дата создания:', createdAt);

// //       const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

// //       const telegramData = {
// //         chat_id: chatId,
// //         text: `id: ${ids}\nТелефон: ${phone}\nИмя: ${name}\nОплата: ${money}\nДата создания: ${createdAt}`,
// //       };

// //       axios.post(telegramUrl, telegramData)
// //         .then(() => {
// //           console.log('Сообщение успешно отправлено в Telegram');
// //         })
// //         .catch(error => {
// //           console.error('Ошибка при отправке сообщения в Telegram:', error);
// //         });
// //     });
// //   })
// //   .catch(error => {
// //     console.error('Ошибка при получении данных:', error);
// //   });





// // const TelegramBot = require('node-telegram-bot-api'); // Вывод лидов с оплатой и без

// // const axios = require('axios'); // Рабочая версия версия вывода лидов № 3

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';

// // const bot = new TelegramBot(telegramToken, { polling: true });

// // //Функция для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }

// // fetch('https://direct.lptracker.ru/lead/103451/list?offset01&limit=3&sort[updated_at]=3&filter[created_at_from]=1535529725', {
// //     method: 'GET',
// //     headers: { 'content-type': 'application/json' },
// // })
// //     .then((res) => {
// //         if (res.ok) {
// //             return res.json();
// //         } else {
// //             throw new Error('Error: ' + res.status);
// //         }
// //     })
// //     .then((data) => {
// //         console.log(data);

// //         const message = JSON.stringify(data);

// //     })
// //     .catch((error) => {
// //         console.error(error);
// //     });


// // const url = 'https://direct.lptracker.ru/lead/103451/list?offset01&limit=10&sort[updated_at]=3&filter[created_at_from]=1535529725'; // const url = 'https://direct.lptracker.ru/lead/78949162';
// // const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// // bot.onText(/\/payments/, async (msg) => {
// //     const chatId = msg.chat.id;

// //     axios.get(url, {
// //         headers: {
// //             'token': token
// //         }
// //     })
// //         .then(response => { // мы получаем ответ от запроса и сохраняем данные о лидах в переменную leadData
// //             console.log(response.data); // Также выводим данные ответа в консоль с помощью console.log(response.data)
// //             const leadData = response.data.result; // Данные о лидах в переменную leadData

// //             leadData.forEach(lead => { // метод forEach для перебора каждого элемента массива leadData
// //                 const ids = lead.contact.id
// //                 const phone = lead.contact.details.find(detail => detail.type === 'phone').data; // Для извлечения информации о телефоне мы используем метод find для поиска объекта с типом 'phone' в массиве lead.contact.details. Затем мы получаем значение свойства data этого объекта и сохраняем его в переменную phone.
// //                 const name = lead.contact.name; // Переменная имени
// //                 const money = [];
// //                 for (let i = 0; i < lead.payments.length; i++) {
// //                     money.push(lead.payments[i].sum);
// //                 }

// //                 const createdAt = lead.created_at; // Переменная даты

// //                 console.log('id:', ids);
// //                 console.log('Телефон:', phone);
// //                 console.log('Имя:', name);
// //                 console.log('Оплата:', money);
// //                 console.log('Дата создания:', createdAt);

// //                 // Отправка сообщения в Telegram
// //                 const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

// //                 const telegramData = {
// //                     chat_id: chatId,
// //                     text: `id: ${ids}\nТелефон: ${phone}\nИмя: ${name}\nОплата: ${money}\nДата создания: ${createdAt}`,
// //                 };

// //                 axios.post(telegramUrl, telegramData)
// //                     .then(() => {
// //                         console.log('Сообщение успешно отправлено в Telegram');
// //                     })
// //                     .catch(error => {
// //                         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //                     });
// //             });
// //         })
// //         .catch(error => {
// //             console.error('Ошибка при получении данных:', error);
// //         });
// // });




// // const TelegramBot = require('node-telegram-bot-api'); // Вывод оплаченных лидов

// // const axios = require('axios'); // Рабочая версия версия вывода лидов № 3

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';

// // const bot = new TelegramBot(telegramToken, { polling: true });

// // // Функция для отправки сообщения в Telegram
// // // async function sendMessage(message) {
// // //     try {
// // //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// // //         const data = {
// // //             chat_id: chatId,
// // //             text: message,
// // //         };

// // //         await axios.post(url, data);
// // //         console.log('Сообщение успешно отправлено в Telegram');
// // //     } catch (error) {
// // //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// // //     }
// // // }

// // fetch('https://direct.lptracker.ru/lead/103451/list?offset01&limit=3&sort[updated_at]=3&filter[created_at_from]=1535529725', {
// //     method: 'GET',
// //     headers: { 'content-type': 'application/json' },
// // })
// //     .then((res) => {
// //         if (res.ok) {
// //             return res.json();
// //         } else {
// //             throw new Error('Error: ' + res.status);
// //         }
// //     })
// //     .then((data) => {
// //         console.log(data);

// //         const message = JSON.stringify(data);

// //     })
// //     .catch((error) => {
// //         console.error(error);
// //     });


// // const url = 'https://direct.lptracker.ru/lead/103451/list?offset01&limit=10&sort[updated_at]=3&filter[created_at_from]=1535529725'; // const url = 'https://direct.lptracker.ru/lead/78949162';
// // const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// // bot.onText(/\/payments/, async (msg) => {
// //     const chatId = msg.chat.id;

// //     axios.get(url, {
// //         headers: {
// //             'token': token
// //         }
// //     })
// //         .then(response => { // мы получаем ответ от запроса и сохраняем данные о лидах в переменную leadData
// //             console.log(response.data); // Также выводим данные ответа в консоль с помощью console.log(response.data)
// //             const leadData = response.data.result; // Данные о лидах в переменную leadData

// //             leadData.forEach(lead => { // метод forEach для перебора каждого элемента массива leadData
// //                 const ids = lead.contact.id
// //                 const phone = lead.contact.details.find(detail => detail.type === 'phone').data; // Для извлечения информации о телефоне мы используем метод find для поиска объекта с типом 'phone' в массиве lead.contact.details. Затем мы получаем значение свойства data этого объекта и сохраняем его в переменную phone.
// //                 const name = lead.contact.name; // Переменная имени
// //                 const money = lead.payments[0].sum;
// //                 const createdAt = lead.created_at; // Переменная даты

// //                 console.log('id:', ids);
// //                 console.log('Телефон:', phone);
// //                 console.log('Имя:', name);
// //                 console.log('Оплата:', money);
// //                 console.log('Дата создания:', createdAt);

// //                 // Отправка сообщения в Telegram
// //                 const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

// //                 const telegramData = {
// //                     chat_id: chatId,
// //                     text: `id: ${ids}\nТелефон: ${phone}\nИмя: ${name}\nОплата: ${money}\nДата создания: ${createdAt}`,
// //                 };

// //                 axios.post(telegramUrl, telegramData)
// //                     .then(() => {
// //                         console.log('Сообщение успешно отправлено в Telegram');
// //                     })
// //                     .catch(error => {
// //                         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //                     });
// //             });
// //         })
// //         .catch(error => {
// //             console.error('Ошибка при получении данных:', error);
// //         });
// // });




// // const TelegramBot = require('node-telegram-bot-api'); // Отправляет список лидов c id по команде /today

// // const axios = require('axios'); // Рабочая версия версия вывода лидов № 3

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';

// // const bot = new TelegramBot(telegramToken, { polling: true });

// // // Функция для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }

// // fetch('https://direct.lptracker.ru/lead/103451/list?offset01&limit=3&sort[updated_at]=3&filter[created_at_from]=1535529725', {
// //     method: 'GET',
// //     headers: { 'content-type': 'application/json' },
// // })
// //     .then((res) => {
// //         if (res.ok) {
// //             return res.json();
// //         } else {
// //             throw new Error('Error: ' + res.status);
// //         }
// //     })
// //     .then((data) => {
// //         console.log(data);

// //         const message = JSON.stringify(data);

// //     })
// //     .catch((error) => {
// //         console.error(error);
// //     });


// // const url = 'https://direct.lptracker.ru/lead/103451/list?offset01&limit=10&sort[updated_at]=3&filter[created_at_from]=1535529725'; // const url = 'https://direct.lptracker.ru/lead/78949162';
// // const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// // bot.onText(/\/listleads/, async (msg) => {
// //     const chatId = msg.chat.id;

// // axios.get(url, {
// //     headers: {
// //         'token': token
// //     }
// // })
// //     .then(response => { // мы получаем ответ от запроса и сохраняем данные о лидах в переменную leadData
// //         console.log(response.data); // Также выводим данные ответа в консоль с помощью console.log(response.data)
// //         const leadData = response.data.result; // Данные о лидах в переменную leadData

// //         leadData.forEach(lead => { // метод forEach для перебора каждого элемента массива leadData
// //             const ids = lead.contact.id
// //             const phone = lead.contact.details.find(detail => detail.type === 'phone').data; // Для извлечения информации о телефоне мы используем метод find для поиска объекта с типом 'phone' в массиве lead.contact.details. Затем мы получаем значение свойства data этого объекта и сохраняем его в переменную phone.
// //             const name = lead.contact.name; // Переменная имени
// //             const createdAt = lead.created_at; // Переменная даты

// //             console.log('id:', ids);
// //             console.log('Телефон:', phone);
// //             console.log('Имя:', name);
// //             console.log('Дата создания:', createdAt);

// //             // Отправка сообщения в Telegram
// //             const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

// //             const telegramData = {
// //                 chat_id: chatId,
// //                 text: `id: ${ids}\nТелефон: ${phone}\nИмя: ${name}\nДата создания: ${createdAt}`,
// //             };

// //             axios.post(telegramUrl, telegramData)
// //                 .then(() => {
// //                     console.log('Сообщение успешно отправлено в Telegram');
// //                 })
// //                 .catch(error => {
// //                     console.error('Ошибка при отправке сообщения в Telegram:', error);
// //                 });
// //         });
// //     })
// //     .catch(error => {
// //         console.error('Ошибка при получении данных:', error);
// //     });

// // });




// // const axios = require('axios'); // Рабочая версия версия вывода лидов № 2

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';

// // // Функция для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }

// // const url = 'https://direct.lptracker.ru/lead/103451/list?offset01&limit=3&sort[updated_at]=3&filter[created_at_from]=1535529725'; // const url = 'https://direct.lptracker.ru/lead/78949162';
// // const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';



// // axios.get(url, {
// //     headers: {
// //         'token': token
// //     }
// // })
// //     .then(response => { // мы получаем ответ от запроса и сохраняем данные о лидах в переменную leadData
// //         console.log(response.data); // Также выводим данные ответа в консоль с помощью console.log(response.data)
// //         const leadData = response.data.result; // Данные о лидах в переменную leadData

// //         leadData.forEach(lead => { // метод forEach для перебора каждого элемента массива leadData
// //             const phone = lead.contact.details.find(detail => detail.type === 'phone').data; // Для извлечения информации о телефоне мы используем метод find для поиска объекта с типом 'phone' в массиве lead.contact.details. Затем мы получаем значение свойства data этого объекта и сохраняем его в переменную phone.
// //             const name = lead.contact.name; // Переменная имени
// //             const createdAt = lead.created_at; // Переменная даты

// //             console.log('Телефон:', phone);

// //             console.log('Имя:', name);
// //             console.log('Дата создания:', createdAt);

// //             // Отправка сообщения в Telegram
// //             const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

// //             const telegramData = {
// //                 chat_id: chatId,
// //                 text: `Телефон: ${phone}\nИмя: ${name}\nДата создания: ${createdAt}`,
// //             };

// //             axios.post(telegramUrl, telegramData)
// //                 .then(() => {
// //                     console.log('Сообщение успешно отправлено в Telegram');
// //                 })
// //                 .catch(error => {
// //                     console.error('Ошибка при отправке сообщения в Telegram:', error);
// //                 });
// //         });
// //     })
// //     .catch(error => {
// //         console.error('Ошибка при получении данных:', error);
// //     });





// // const axios = require('axios'); // Рабочая версия вывода лидов

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';

// // // Функция для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }

// // const url = 'https://direct.lptracker.ru/lead/103451/list?offset01&limit=3&sort[updated_at]=3&filter[created_at_from]=1535529725'; // const url = 'https://direct.lptracker.ru/lead/78949162';
// // const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';



// // axios.get(url, {
// //     headers: {
// //         'token': token
// //     }
// // })
// //     .then(response => { // мы получаем ответ от запроса и сохраняем данные о лидах в переменную leadData
// //         console.log(response.data); // Также выводим данные ответа в консоль с помощью console.log(response.data)
// //         const leadData = response.data.result; // Данные о лидах в переменную leadData
 
// //         leadData.forEach(lead => { // метод forEach для перебора каждого элемента массива leadData
// //             const phone = lead.contact.details.find(detail => detail.type === 'phone').data; // Для извлечения информации о телефоне мы используем метод find для поиска объекта с типом 'phone' в массиве lead.contact.details. Затем мы получаем значение свойства data этого объекта и сохраняем его в переменную phone.
// //             const name = lead.contact.name; // Переменная имени
// //             const createdAt = lead.created_at; // Переменная даты

// //             console.log('Телефон:', phone); 
            
// //             console.log('Имя:', name);
// //             console.log('Дата создания:', createdAt);

// //             // Отправка сообщения в Telegram
// //             const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

// //             const telegramData = {
// //                 chat_id: chatId,
// //                 text: `Телефон: ${phone}\nИмя: ${name}\nДата создания: ${createdAt}`,
// //             };

// //             axios.post(telegramUrl, telegramData)
// //                 .then(() => {
// //                     console.log('Сообщение успешно отправлено в Telegram');
// //                 })
// //                 .catch(error => {
// //                     console.error('Ошибка при отправке сообщения в Telegram:', error);
// //                 });
// //         });
// //     })
// //     .catch(error => {
// //         console.error('Ошибка при получении данных:', error);
// //     });









// // const axios = require('axios'); // Получение лида

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';

// // // Функция для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }

// // const url = 'https://direct.lptracker.ru/lead/103451/list?offset=1&limit=3&sort[updated_at]=3&filter[created_at_from]=1535529725'; // const url = 'https://direct.lptracker.ru/lead/78949162';
// // const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// // axios.get(url, {
// //     headers: {
// //         'token': token
// //     }
// // })
// //     .then(response => {
// //         console.log(response.data);
// //         const message = JSON.stringify(response.data);
// //         const result = response.data.result; // Получение массива "result" из ответа

// //         const resultes = response.data.result; // Получение массива "result" из ответа


// //         sendMessage(message);
// //     })
// //     .catch(error => {
// //         console.error(error);
// //     });





// // const axios = require('axios'); // Получение лида

// // const telegramToken = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';
// // const chatId = '1013645358';

// // fetch('https://direct.lptracker.ru/lead/', {
// //     method: 'GET',
// //     headers: { 'content-type': 'application/json' },
// // })
// //     .then((res) => {
// //         if (res.ok) {
// //             return res.json();
// //         } else {
// //             throw new Error('Error: ' + res.status);
// //         }
// //     })
// //     .then((data) => {
// //         console.log(data);

// //         const message = JSON.stringify(data);

// //     })
// //     .catch((error) => {
// //         console.error(error);
// //     });

// // // Функция для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }

// // const url = 'https://direct.lptracker.ru/lead/78949162';
// // const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// // axios.get(url, {
// //     headers: {
// //         'token': token
// //     }
// // })
// //     .then(response => {
// //         console.log(response.data);
// //         const message = JSON.stringify(response.data);
// //         sendMessage(message);
// //     })
// //     .catch(error => {
// //         console.error(error);
// //     });



// // const TelegramBot = require('node-telegram-bot-api'); // Вывод элемента по номеру id
// // const axios = require('axios');

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';

// // // Создание экземпляра объекта TelegramBot
// // const bot = new TelegramBot(telegramToken, { polling: true });

// // // Функция для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }
// // // Ваш код для получения данных
// // fetch('https://652e50390b8d8ddac0b12649.mockapi.io/person/', {
// //     method: 'GET',
// //     headers: { 'content-type': 'application/json' },
// // })
// //     .then((res) => {
// //         if (res.ok) {
// //             return res.json();
// //         } else {
// //             throw new Error('Error: ' + res.status);
// //         }
// //     })
// //     .then((data) => {
// //         console.log(data);

// //         const message = JSON.stringify(data);
        
// //     })
// //     .catch((error) => {
// //         console.error(error);
// //     });

// // bot.onText(/\/edit/, async (msg) => {
// //     const chatId = msg.chat.id;

// //     try {
// //         await bot.sendMessage(chatId, 'Введите номер лида');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // });

// // bot.on('message', async (msg) => {
// //     const chatId = msg.chat.id;
// //     const messageText = msg.text;

// //     if (messageText) {
// //         try {
// //             const leadNumber = messageText;
// //             const url = `https://652e50390b8d8ddac0b12649.mockapi.io/person/${leadNumber}`;
// //             const response = await axios.get(url);
// //             const data = response.data;

// //             const message = JSON.stringify(data);
// //             await sendMessage(message);
// //         } catch (error) {
// //             console.error('Ошибка при получении данных из MockAPI:', error);
// //         }
// //     }
// // });






// // const axios = require('axios');
// // const TelegramBot = require('node-telegram-bot-api');

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const lptrackerToken = 'oztqO48VzagvMeIh7EJCxwc10lFoGRlE';

// // const bot = new TelegramBot(telegramToken, { polling: true });

// // bot.onText(/\/createlead/, async (msg) => {
// //     try {
// //         const chatId = msg.chat.id;
// //         const contact_id = 'YOUR_CONTACT_ID';
// //         const project_id = 'YOUR_PROJECT_ID';
// //         const funnel_id = 'YOUR_FUNNEL_ID';
// //         const lead_create_date = '2023-10-23';
// //         const deal_date = '2023-10-24';
// //         const lead_owner_id = 'YOUR_LEAD_OWNER_ID';

// //         const leadData = {
// //             contact_id,
// //             project_id,
// //             funnel_id,
// //             lead_create_date,
// //             deal_date,
// //             view_id: 123,
// //             view: {
// //                 source: 'someSource',
// //                 campaign: 'someCampaign',
// //                 keyword: 'someKeyword'
// //             },
// //             custom: {
// //                 custom_field_id: 'YOUR_CUSTOM_FIELD_ID',
// //                 custom_field_value: 'YOUR_CUSTOM_FIELD_VALUE'
// //             },
// //             payments: [
// //                 {
// //                     category: 'someCategory',
// //                     purpose: 'paymentPurpose',
// //                     sum: 123.12
// //                 }
// //             ],
// //             owner: lead_owner_id
// //         };

// //         const response = await axios.post('https://direct.lptracker.ru/lead', leadData, {
// //             headers: {
// //                 'Authorization': `Bearer ${lptrackerToken}`,
// //             },
// //         });

// //         if (response.status === 201) {
// //             bot.sendMessage(chatId, 'Лид успешно создан в Lptracker!');
// //         } else {
// //             bot.sendMessage(chatId, 'Ошибка при создании лида в Lptracker.');
// //         }
// //     } catch (error) {
// //         console.error(error);
// //         bot.sendMessage(chatId, 'Произошла ошибка при отправке запроса.');
// //     }
// // });

// // console.log('Bot is running...');





// // const TelegramBot = require('node-telegram-bot-api'); // Кривое удаление
// // const axios = require('axios'); // Получение лида

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';
// // const url = 'https://direct.lptracker.ru/lead/78912351';
// // const token = 'oztqO48VzagvMeIh7EJCxwc10lFoGRlE';

// // const bot = new TelegramBot(telegramToken, { polling: true });

// // // Функция для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }

// // fetch('https://direct.lptracker.ru/lead/', {
// //     method: 'GET',
// //     headers: { 'content-type': 'application/json' },
// // })
// //     .then((res) => {
// //         if (res.ok) {
// //             return res.json();
// //         } else {
// //             throw new Error('Error: ' + res.status);
// //         }
// //     })
// //     .then((data) => {
// //         console.log(data);

// //         const message = JSON.stringify(data);

// //     })
// //     .catch((error) => {
// //         console.error(error);
// //     });

// // bot.onText(/\/delete/, async (msg) => {
// //     const chatId = msg.chat.id;

// //     try {
// //         await bot.sendMessage(chatId, 'Введите номер лида');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // });

// // bot.on('message', async (msg) => {
// //     const chatId = msg.chat.id;
// //     const messageText = msg.text;

// //     if (messageText) {
// //         try {
// //             const leadNumber = messageText;

// //             const url = `https://direct.lptracker.ru/lead/${leadNumber}`;
// //             const response = await axios.delete(url);
// //             const data = response.data;

// //             const message = JSON.stringify(data);
// //             await sendMessage("Лид успешно удалён!");
// //         } catch (error) {
// //             console.error('Ошибка при получении данных из MockAPI:', error);
// //         }
// //     }
// // });









// // const TelegramBot = require('node-telegram-bot-api'); // Кривое удаление рабочее
// // const axios = require('axios'); // Получение лида

// // const telegramToken = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const chatId = '1013645358';
// // const url = 'https://direct.lptracker.ru/lead/78930509';
// // const token = 'oztqO48VzagvMeIh7EJCxwc10lFoGRlE';

// // const bot = new TelegramBot(telegramToken, { polling: true });

// // // Функция для отправки сообщения в Telegram
// // // Определение функции для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }


// // fetch('https://direct.lptracker.ru/lead/', { 
// //     method: 'GET',
// //     headers: { 'content-type': 'application/json' },
// // })
// //     .then((res) => {
// //         if (res.ok) {
// //             return res.json();
// //         } else {
// //             throw new Error('Error: ' + res.status);
// //         }
// //     })
// //     .then((data) => {
// //         console.log(data);

// //         const message = JSON.stringify(data);

// //     })
// //     .catch((error) => {
// //         console.error(error);
// //     });



// // axios.delete(url, {
// //     headers: {
// //         'token': token
// //     }
// // })
// //     .then(response => {
// //         console.log(response.data);
// //         const message = JSON.stringify(response.data);
// //         sendMessage(message);
// //     })
// //     .catch(error => {
// //         console.error(error);
// //     });

// // bot.onText(/\/delete/, async (msg) => {
// //     const chatId = msg.chat.id;

// //     try {
// //         await bot.sendMessage(chatId, 'Введите номер лида');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // });

// // bot.on('message', async (msg) => {
// //     const chatId = msg.chat.id;
// //     const messageText = msg.text;

// //     if (messageText) {
// //         try {
// //             const leadNumber = messageText;
            
// //             // const url = `https://direct.lptracker.ru/lead/${leadNumber}`;
// //             // console.log(leadNumber)                                            
// //             const response = await axios.delete(url);
// //             const data = response.data;

// //             const message = JSON.stringify(data);
// //             await sendMessage("Лид успешно удалён!");
// //         } catch (error) {
// //             console.error('Ошибка при получении данных из MockAPI:', error);
// //         }
// //     }
// // });



// // const axios = require('axios'); // Получение лида

// // const telegramToken = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';
// // const chatId = '1013645358';

// // // Функция для отправки сообщения в Telegram
// // async function sendMessage(message) {
// //     try {
// //         const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
// //         const data = {
// //             chat_id: chatId,
// //             text: message,
// //         };

// //         await axios.post(url, data);
// //         console.log('Сообщение успешно отправлено в Telegram');
// //     } catch (error) {
// //         console.error('Ошибка при отправке сообщения в Telegram:', error);
// //     }
// // }

// // const url = 'https://direct.lptracker.ru/lead/78949162';
// // const token = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';

// // axios.get(url, {
// //     headers: {
// //         'token': token
// //     }
// // })
// //     .then(response => {
// //         console.log(response.data);
// //         const message = JSON.stringify(response.data);
// //         sendMessage(message);
// //     })
// //     .catch(error => {
// //         console.error(error);
// //     });





// // const TelegramBot = require('node-telegram-bot-api');
// // const axios = require('axios');

// // const token = '6387626529:AAFIZv733tOtthdvuiNHg2VFnwJl0u83RWk';
// // const bot = new TelegramBot(token, {
// //     polling: true
// // });

// // bot.onText(/\/start/, (msg) => {
// //     const { id } = msg.chat;

// //     const lptrackerToken = 'veCOpQNX2WGZCPdime85tsOjSdCrtGCM';
// //     const lptrackerApiUrl = 'https://direct.lptracker.ru/lead/103451/list?offset=10&limit=1&sort[updated_at]=3&filter[created_at_from]=1535529725';

// //     axios.get(lptrackerApiUrl, {
// //         headers: {
// //             Authorization: lptrackerToken
// //         }
// //     })
// //         .then(response => {
// //             bot.sendMessage(id, `Результат запроса:\n${response.data}`);
// //         })
// //         .catch(error => {
// //             bot.sendMessage(id, `Ошибка выполнения запроса: ${error.message}`);
// //         });
// // });


// // const TelegramBot = require('node-telegram-bot-api');
// // const { exec } = require('child_process');

// // const token = '6383490209:AAHL-fDgEIp3ZvGw8gc8ZsP_ibuffBFthtw';
// // const bot = new TelegramBot(token, {
// //     polling: true
// // });

// // bot.onText(/\/start/, (msg) => {
// //     const { id } = msg.chat;

// //     exec(
// //         'curl -H "oW8lBtSOcTXNsYztY97l6sNQlIhqgBfH" https://direct.lptracker.ru/lead/103451/list?offset=10&limit=1&sort[updated_at]=3&filter[created_at_from]=1535529725',
// //         (error, stdout, stderr) => {
// //             if (error) {
// //                 bot.sendMessage(id, `Ошибка выполнения запроса: ${error.message}`);
// //                 return;
// //             }
// //             if (stderr) {
// //                 bot.sendMessage(id, `Ошибка выполнения запроса: ${stderr}`);
// //                 return;
// //             }
// //             bot.sendMessage(id, `Результат запроса:\n${stdout}`);
// //         }
// //     );
// // });



// // const { Telegraf } = require('telegraf');
// // const fs = require('fs');

// // const bot = new Telegraf('6383490209:AAHL-fDgEIp3ZvGw8gc8ZsP_ibuffBFthtw'); // Токен бота из BotFather

// // const data = fs.readFileSync('./result.json', 'utf-8');
// // const jsonData = JSON.parse(data);
// // const name = jsonData.name;
// // const dataValue = jsonData.details[0].data;
// // const createdAt = jsonData.created_at;

// // bot.start((ctx) => {
// //     const message = `Клиент, ${name}! Номер телефона клиента ${dataValue} время создания заявки ${createdAt}.`;
// //     ctx.reply(message);
// // });

// // bot.launch();

// // process.once('SIGINT', () => bot.stop('SIGINT'));
// // process.once('SIGTERM', () => bot.stop('SIGTERM'));





// // const { Telegraf } = require('telegraf');

// // const bot = new Telegraf('6383490209:AAHL-fDgEIp3ZvGw8gc8ZsP_ibuffBFthtw'); // Токен бота из BotFather

// // bot.start((ctx) => {
// //     ctx.reply('Welcome'); // Сообщение после нажатия на кнопку /start
// // });



// // bot.on('text', (ctx) => {
// //     const userMessage = ctx.message.text; // Получаем текст сообщения пользователя

// //     if (userMessage === "Свободен") { // Если введено Привет
// //         ctx.reply('Вы назначены на заказ...параметры...просим подготовить'); // Вывести Ваш заказ принят
// //     }
// //     else if (userMessage === "Скоро свободен") {
// //         ctx.reply('Отправляю вам заказ на время...');
// //     }
// //     else if (userMessage === "Занят") {
// //         ctx.reply('Напишите как освободитесь');
// //     }
// //     else {
// //         ctx.reply('Я вас не понимаю, исправьте ошибки в вашем сообщении!'); // Иначе Ваш заказ не принят
// //     }
// // });

// // bot.launch();

// // process.once('SIGINT', () => bot.stop('SIGINT'));
// // process.once('SIGTERM', () => bot.stop('SIGTERM'));





// // const axios = require('axios'); // Авторизация

// // const data = {
// //     login: 'dm93vtb@yahoo.com',
// //     password: 'qu62268500',
// //     service: "ServiceName",
// //     version: '1.0'
// // };

// // axios.post('https://direct.lptracker.ru/login', data)
// //     .then(response => {
// //         console.log(response.data);
// //     })
// //     .catch(error => {
// //         console.error(error);
// //     });



// var custom = [
//     {
//         id: 2079680,
//         name: 'Дата лида',
//         type: 'date',
//         value: '27.10.2023 14:48:32'
//     },
//     { id: 2079681, name: 'Контакты', type: 'contact', value: null },
//     { id: 2079682, name: 'Оплаты', type: 'deal_amount', value: null },
//     {
//         id: 2079683,
//         name: 'Шаг воронки',
//         type: 'funnel',
//         value: '1875527'
//     },
//     {
//         id: 2079684,
//         name: 'Дата шага',
//         type: 'funnel_date',
//         value: null
//     },
//     {
//         id: 2079685,
//         name: 'Владелец лида',
//         type: 'owner',
//         value: [Object]
//     },
//     {
//         id: 2079686,
//         name: 'Тип захвата',
//         type: 'name',
//         value: 'Созданная вручную'
//     },
//     {
//         id: 2079687,
//         name: 'Источник',
//         type: 'platform',
//         value: '[Дмитрий (Руководитель)]'
//     },
//     { id: 2079688, name: 'Файлы', type: 'file', value: null },
//     {
//         id: 2079689,
//         name: 'Обновление профайла',
//         type: 'profile',
//         value: null
//     },
//     { id: 2079690, name: 'Телефония', type: 'telephony', value: null },
//     { id: 2079691, name: 'Комментарии', type: 'comments', value: null },
//     { id: 2079692, name: 'Приоритет', type: 'priority', value: null },
//     {
//         id: 2079693,
//         name: 'Дата последнего звонка',
//         type: 'last_call',
//         value: null
//     },
//     {
//         id: 2079694,
//         name: 'Дата первой оплаты',
//         type: 'payday',
//         value: null
//     },
//     { id: 2079696, name: 'Причина отказа', type: 'text', value: null },
//     {
//         id: 2079697,
//         name: 'Затраты по сделке',
//         type: 'funnel_margin',
//         value: null
//     },
//     {
//         id: 2079698,
//         name: 'Важная информация',
//         type: 'text',
//         value: 'Пару перчаток, и моющее средство'
//     },
//     {
//         id: 2079699,
//         name: 'Название лида/сделки',
//         type: 'lead_name',
//         value: null
//     },
//     { id: 2096169, name: 'Текст', type: 'text', value: null },
//     {
//         id: 2096191,
//         name: 'Дата выполнения сделки',
//         type: 'date',
//         value: null
//     },
//     { id: 2096192, name: 'Объём/площадь', type: 'number', value: null },
//     {
//         id: 2096193,
//         name: 'Комментарий к постколлу',
//         type: 'text',
//         value: null
//     },
//     { id: 2096194, name: 'Нюансы', type: 'text', value: null },
//     {
//         id: 2096195,
//         name: 'Допрасход на продажу',
//         type: 'text',
//         value: null
//     },
//     {
//         id: 2096196,
//         name: 'Допрасход на произодство',
//         type: 'text',
//         value: null
//     },
//     {
//         id: 2096197,
//         name: 'Допрасход репутация',
//         type: 'text',
//         value: null
//     },
//     {
//         id: 2098925,
//         name: 'Процент оператора',
//         type: 'number',
//         value: null
//     },
//     {
//         id: 2098926,
//         name: 'Процент исполнителя',
//         type: 'number',
//         value: null
//     },
//     { id: 2098947, name: 'Город', type: 'cats', value: [Array] },
//     { id: 2098949, name: 'Вид уборки', type: 'cats', value: [Array] },
//     { id: 2098950, name: 'Исполнитель', type: 'cats', value: [Array] },
//     { id: 2098951, name: 'Повторы/партнеры', type: 'cats', value: [] },
//     { id: 2098952, name: 'Была допродажа', type: 'cats', value: [] },
//     { id: 2098953, name: 'Отправить смс', type: 'cats', value: [] },
//     { id: 2098954, name: 'Почему не заказ', type: 'cats', value: [] },
//     { id: 2098975, name: 'Причина отмены', type: 'cats', value: [] },
//     {
//         id: 2099025,
//         name: 'Почему некорректный',
//         type: 'cats',
//         value: []
//     },
//     { id: 2099026, name: 'Создатель сделки', type: 'cats', value: [] },
//     { id: 2099067, name: 'Недозвоны', type: 'cats', value: [] },
//     {
//         id: 2099109,
//         name: 'IB автодозвон по лидам с ',
//         type: 'cats',
//         value: []
//     },
//     { id: 2099110, name: 'Причина  отказа', type: 'cats', value: [] },
//     { id: 2099151, name: 'Другое', type: 'number', value: null },
//     {
//         id: 2099152,
//         name: 'Балл постколла',
//         type: 'number',
//         value: null
//     },
//     {
//         id: 2099153,
//         name: 'Сделка выполнена',
//         type: 'progressbar',
//         value: null
//     },
//     {
//         id: 2099174,
//         name: 'Лид выполнен',
//         type: 'progressbar',
//         value: null
//     }
// ]

// var res = custom.find(object => object.name == 'Важная информация')
// console.log(res.value)