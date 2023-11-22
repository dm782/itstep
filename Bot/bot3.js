const { Telegraf } = require('telegraf');
const bot = new Telegraf('shdoJLIGn7PLho4nwvOq7D8QTBRrJKa1');

// Добавьте обработчики событий, если необходимо

(async function () {
    var order = { name: "Дмитрий Митин", adres: "Ленина 38", info: "Ведро тряпка швабра" };

    var worker = workers.find(object => object.name == order.name);

    if (worker) {
        var chatId = worker.chatId;
        await bot.telegram.sendMessage(chatId, JSON.stringify(order));
    } else {
        console.log("Работник не найден");
    }
})();
