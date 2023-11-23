var fs = require("fs")
const path = require("path"); // Подключаю библиотеку path
var envPath = path.join(__dirname, ".env") // создает переменную envPath, которая содержит путь к файлу .env. __dirname - это глобальная переменная в Node.js, которая представляет путь к текущей директории, в которой находится исполняемый файл.
require("dotenv").config({ path: envPath }) //  загружает содержимое файла .env и помещает его в переменные окружения. Модуль dotenv позволяет загружать переменные окружения из файла .env в процесс Node.js
const { telegramToken, lpTrackerToken } = process.env // Деструктуризация telegramToken и lpTrackerToken изenv файла


const fetch = require('node-fetch'); // Подключаю библиотеку запросов
const { Scenes, session, Telegraf } = require('telegraf'); // Подключаю библиотеку Telegraf
const bot = new Telegraf(telegramToken); // создает новый экземпляр класса Telegraf и присваивает его переменной bot. В скобках (telegramToken) указывается аргумент, который передается в конструктор класса
var ordersPath = path.join(__dirname, "orders.json");

const payScene = require("./scenes/payScene");
const lookScene = require("./scenes/lookScene");

const stage = new Scenes.Stage([lookScene, payScene])
bot.use(session())
bot.use(stage.middleware())

bot.start(ctx => {
    ctx.reply("Что хотите отправить?", { reply_markup: { inline_keyboard: [[{ text: "Фото чека", callback_data: "pay" }], [{ text: "Фото вн.вида", callback_data: "look" }]] } })
})

bot.action('pay', async (ctx) => {
    await ctx.scene.enter('payScene')
})

bot.action('look', async (ctx) => {
    await ctx.scene.enter('lookScene')
})

async function fetchDataAndSaveToFile() {
    const response = await fetch("https://direct.lptracker.ru/lead/103451/list?sort[created_at]=3", { headers: { token: lpTrackerToken } });
    const data = await response.json(); // Преобразование ответа в JSON

    if (recivedNewOrder(data.result)) {
        var newIds = findNewOrders(data.result)
        newIds.forEach(newId => console.log(newId))
    }
}


function recivedNewOrder(newOrders) {
    var oldOrders = JSON.parse(fs.readFileSync(ordersPath, "utf-8"))
    return newOrders[0]?.id != oldOrders[0]?.id
}


function findNewOrders(newOrders) {
    var newIds = []
    var oldOrders = JSON.parse(fs.readFileSync(ordersPath, "utf-8"))
    var oldOrderIds = oldOrders.map(oldOrder => oldOrder.id)
    var newOrderIds = newOrders.map(newOrder => newOrder.id)
    var newOrderPhone = newOrders.map(newOrder => newOrder.contact?.details?.find(detail => detail.type === 'phone')?.data)
    var adress = newOrders.map(newOrder => newOrder.custom.find(object => object.name == 'Адрес').value)
    var info = newOrders.map(newOrder => newOrder.custom.find(object => object.name == 'Важная информация').value);
    var worker = newOrders.map(newOrder => newOrder.custom.find(object => object.name == 'Исполнитель').value);
    console.log(worker)
    oldOrderIds = oldOrderIds.map(Number)
    firstElemOld = oldOrderIds[0]




    var arrayNewLeads = [];
    var i = 0;


    while (newOrderIds[i] !== firstElemOld) {
        var obj = {
            id: newOrderIds[i],
            "Телефон клиента": '+' + newOrderPhone[i],
            "Адрес клиента": adress[i],
            "Информация по заказа": info[i],
            "Исполнитель": worker[i]
        };
        arrayNewLeads.push(obj);
        i++;
    }



    const chatId = '1013645358';

    for (let i = 0; i < arrayNewLeads.length; i++) {
        let message = JSON.stringify(arrayNewLeads[i]);
        message = message.replace(/^{/, '').replace(/}$/, '');

        let keyboard = {
            inline_keyboard: [
                [{ text: "Отправить фотографию внешнего вида", callback_data: "look" }],
                [{ text: "Отправить чек для оплаты", callback_data: "pay" }]
            ]
        };

        bot.action('pay', async (ctx) => {
            await ctx.reply('Фото чека');
            await ctx.scene.enter('payScene')
        });

        bot.action('look', async (ctx) => {
            await ctx.reply('Фото внешнего вида');
            await ctx.scene.enter('lookScene')
        });

        if (worker[i][0] === "Абсолют Новосибирск") {
            bot.telegram.sendMessage(chatId, message, { reply_markup: keyboard }).catch(err => console.log(err));
        }
        
        try {
            const ord = JSON.parse(`{${message}}`); // Add missing curly braces to make it a valid JSON object
            
            (async function () {
                var workers = require("./workers.json");
                var order = { name: "Anar" };
                var chatId = workers.find(object => object.name == order.name).chatId;
                if (ord && ord["Телефон клиента"]) {
                    bot.telegram.sendMessage(chatId, `Телефон: ${ord["Телефон клиента"]} \n Адрес клиента: ${ord["Адрес клиента"]}\n Информация по заказа: ${ord["Информация по заказа"]}`, { reply_markup: keyboard });
                } else {
                    console.error('Телефон клиента property not found in the JSON object.');
                }

            })();
        } catch (error) {
            console.error('Error parsing message:', error);
        }

    }



    console.log(JSON.stringify(obj.id));




    newOrderIds.forEach(newOrderId => {
        if (!oldOrderIds.includes(newOrderId)) newIds.push(newOrderId)
    })
    return newIds
}

// var workers = require("./workers.json");

// (async function () {
//     var order = { name: "Мама", adres: "Ленина 38", info: "Ведро тряпка швабра" };
//     var chatId = workers.find(object => object.name == order.name).chatId;
//     bot.telegram.sendMessage(chatId, `Name: ${order.name}\nAdres: ${order.adres}\nInfo: ${order.info}`);
// })();




// setInterval(fetchDataAndSaveToFile, 100000);


fetchDataAndSaveToFile()


bot.launch();

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
