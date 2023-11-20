const path = require("path"); // Подключаю библиотеку path
var envPath = path.join(__dirname, ".env") // создает переменную envPath, которая содержит путь к файлу .env. __dirname - это глобальная переменная в Node.js, которая представляет путь к текущей директории, в которой находится исполняемый файл.
require("dotenv").config({ path: envPath }) //  загружает содержимое файла .env и помещает его в переменные окружения. Модуль dotenv позволяет загружать переменные окружения из файла .env в процесс Node.js
const { telegramToken, lpTrackerToken } = process.env // Деструктуризация telegramToken и lpTrackerToken изenv файла

const fetch = require('node-fetch'); // Подключаю библиотеку запросов

const { Telegraf } = require('telegraf'); // Подключаю библиотеку Telegraf
const bot = new Telegraf(telegramToken); // создает новый экземпляр класса Telegraf и присваивает его переменной bot. В скобках (telegramToken) указывается аргумент, который передается в конструктор класса

var cron = require('node-cron');

var fs = require("fs")

var orders = JSON.parse(fs.readFileSync(path.join(__dirname, "orders.json"), "utf-8"))

var time = new Date()
var date = time.getDate()
if (date < 10) date = "0" + date
var month = time.getMonth() + 1
if (month == 13) month = 1
if (month < 10) month = "0" + month
var year = time.getFullYear()

var hour = time.getHours() 
if (hour < 10) hour = "0" + hour
var minute = time.getMinutes() 
if (minute < 10) minute = "0" + minute

var timeNow = `${date}.${month}.${year} ${hour}:${minute}`

// console.log(orders[0].time === timeNow);

orders.forEach(order => {
    console.log(order.time === timeNow)
});