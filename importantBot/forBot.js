const axios = require('axios');

// Замените <TOKEN> на токен вашего Telegram бота
const botToken = '6383490209:AAHL-fDgEIp3ZvGw8gc8ZsP_ibuffBFthtw';
const chatId = '@MyLPTbot'; // ID чата, в который вы хотите отправить сообщение

// Пример JSON-данных
const jsonData = {
    name: 'John Doe',
    age: 30,
    city: 'New York'
};

// Преобразование JSON в строку
const message = JSON.stringify(jsonData);

// Отправка сообщения в Telegram бот
axios.post(`https://api.telegram.org/bot${'6383490209:AAHL-fDgEIp3ZvGw8gc8ZsP_ibuffBFthtw'}/sendMessage`
, {
    chat_id: chatId,
    text: message
})
    .then(response => {
        console.log('Сообщение успешно отправлено в Telegram бот:', response.data);
    })
    .catch(error => {
        console.error('Ошибка при отправке сообщения в Telegram бот:', error);
    });
