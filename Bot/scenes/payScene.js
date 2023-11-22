const { Scenes } = require("telegraf");

const payScene = new Scenes.BaseScene("payScene")

// payScene.enter(ctx => {
//     ctx.reply("Отправьте фото чека")
// })
let keyboard = {
    inline_keyboard: [
        [{ text: "Отправить фотографию внешнего вида", callback_data: "look" }],
        [{ text: "Отправить чек для оплаты", callback_data: "pay" }]
    ]
};

const chatId = '1013645358';

payScene.on('photo', async (ctx) => {

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
        ctx.scene.leave()
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error)
        ctx.reply('Произошла ошибка при отправке фото чека')
    }
    // const message = 'Your message content here';
    // ctx.telegram.sendMessage(chatId, message, { reply_markup: keyboard });

})


module.exports = payScene