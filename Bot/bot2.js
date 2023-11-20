var fs = require("fs")
const path = require("path"); // Подключаю библиотеку path
var envPath = path.join(__dirname, ".env") // создает переменную envPath, которая содержит путь к файлу .env. __dirname - это глобальная переменная в Node.js, которая представляет путь к текущей директории, в которой находится исполняемый файл.
require("dotenv").config({ path: envPath }) //  загружает содержимое файла .env и помещает его в переменные окружения. Модуль dotenv позволяет загружать переменные окружения из файла .env в процесс Node.js
const { telegramToken, lpTrackerToken } = process.env // Деструктуризация telegramToken и lpTrackerToken изenv файла


const fetch = require('node-fetch'); // Подключаю библиотеку запросов
const { Telegraf } = require('telegraf'); // Подключаю библиотеку Telegraf
const bot = new Telegraf(telegramToken); // создает новый экземпляр класса Telegraf и присваивает его переменной bot. В скобках (telegramToken) указывается аргумент, который передается в конструктор класса
var ordersPath = path.join(__dirname, "orders.json")




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
    return newOrders[0].id != oldOrders[0].id
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
            // This function will be executed when the user clicks the "Отправить чек для оплаты" button
            await ctx.reply('Пожалуйста, отправьте фотографию чека')
            console.log(newOrderIds[0], "Нажатый id")
        })

        bot.on('photo', async (ctx) => {
            // This function will be executed when the user sends a photo
            try {
                const dataTwo = await ctx.telegram.getFile(ctx.message.photo[0].file_id)
                const fileLink = await ctx.telegram.getFileLink(dataTwo.file_id)
                const fileResponse = await fetch(fileLink)
                const fileBuffer = await fileResponse.buffer()

                const base64Data = fileBuffer.toString('base64')

                const data = {
                    name: 'file1.jpg',
                    mime: 'image/jpeg',
                    data: base64Data,
                    custom_field_id: 2079688
                }

                const uploadResponse = await fetch(`https://direct.lptracker.ru/lead/${newOrderIds[i]}/file`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': lpTrackerToken
                    },
                    body: JSON.stringify(data)
                })

                const result = await uploadResponse.json()
                console.log('Результат:', result)
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error)
                ctx.reply('Произошла ошибка при отправке фото чека')
            }
        })

        bot.action('look', async (ctx) => {
            // This function will be executed when the user clicks the "Отправить чек для оплаты" button
            await ctx.reply('Пожалуйста, пришлите фотографию внешнего вида')
            console.log(newOrderIds[0], "Нажатый id")
        })

        bot.on('photo', async (ctx) => {
            bot.action('look', async (ctx) => {
            // This function will be executed when the user sends a photo
            try {
                const dataTwo = await ctx.telegram.getFile(ctx.message.photo[0].file_id)
                const fileLink = await ctx.telegram.getFileLink(dataTwo.file_id)
                const fileResponse = await fetch(fileLink)
                const fileBuffer = await fileResponse.buffer()

                const base64Data = fileBuffer.toString('base64')

                const data = {
                    name: 'file2.jpg',
                    mime: 'image/jpeg',
                    data: base64Data,
                    custom_field_id: 2116594
                }

                const uploadResponse = await fetch(`https://direct.lptracker.ru/lead/${newOrderIds[i]}/file`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': lpTrackerToken
                    },
                    body: JSON.stringify(data)
                })

                const result = await uploadResponse.json()
                console.log('Результат:', result)
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error)
                ctx.reply('Произошла ошибка при отправке фото чека')
            }
        })
        })
        

        if (worker[i][0] === "Абсолют Новосибирск") {
            bot.telegram.sendMessage(chatId, message, { reply_markup: keyboard });
        }
    }


    console.log(JSON.stringify(obj.id));




    newOrderIds.forEach(newOrderId => {
        if (!oldOrderIds.includes(newOrderId)) newIds.push(newOrderId)
    })
    return newIds
}


setInterval(fetchDataAndSaveToFile, 100000);


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
