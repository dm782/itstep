const { Scenes } = require("telegraf");

const lookScene = new Scenes.BaseScene("lookScene")



lookScene.action('look', async (ctx) => {

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
        ctx.scene.leave()
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error)
        ctx.reply('Произошла ошибка при отправке фото чека')
    }
})

if (worker[i][0] === "Абсолют Новосибирск") {
    bot.telegram.sendMessage(chatId, message, { reply_markup: keyboard });
}

module.exports = lookScene