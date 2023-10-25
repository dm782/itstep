const { Telegraf } = require('telegraf');
const axios = require ('axios');

const bot = new Telegraf('6648621180:AAHCQocIasatJUiOgHV6qsLh6AQu_BItbjo');

bot.start((ctx) => ctx.reply('send me ur geolocation'));

bot.on('message', async (ctx) => {
    console.log(ctx.message);
    if (ctx.message.location) {
        const weatherAPIUrl = "https://api.openweathermap.org/data/2.5/weather?q=Vitebsk&units=metric&appid=317bb621238efc6011949771e08baac0";   // const weatherAPIUrl = `https://openweathermap.org/data/2.5/weather?lat=${c
        const response = await axios.get(weatherAPIUrl);
        ctx.reply(`${response.data.name}: ${response.data.weather[0].main} ${response.data.main.temp} °C`);
    }
});

bot.launch();
