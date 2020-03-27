const Telegraf = require('telegraf');
const bot = new Telegraf('930886942:AAGupiVd3KdVCKsVFCzEdUxbKSAW1xE5d3I');

bot.hears('ping'.toLowerCase(), ctx => {
    return ctx.reply('Pong!');
});
bot.on('message', (ctx) => {
     // убеждаемся что это админ ответил на сообщение пользователя
     if (ctx.message.reply_to_message
        && ctx.message.reply_to_message.forward_from
        && isAdmin(ctx.message.from.id)) {
        // кому отправляем
        let userId = ctx.message.reply_to_message.forward_from.id;
        //  проверяем что пришло и отправляем соответствующим методом
        switch (ctx.updateSubTypes[0]) {
            case 'text':
                ctx.telegram.sendMessage(
                    userId,
                    ctx.message.text
                );
                break;
            case 'sticker':
                ctx.telegram.sendSticker(
                    userId,
                    ctx.message.sticker.file_id
                );
                break;
            case 'photo':
                let file = ctx.message.photo.length - 1;
                ctx.telegram.sendPhoto(
                    userId,
                    ctx.message.photo[file].file_id,
                    {
                        'caption': ctx.message.caption
                    }
                );
                break;
            case 'document':
                ctx.telegram.sendDocument(
                    userId,
                    ctx.message.document.file_id,
                    {
                        'caption': ctx.message.caption
                    }
                );
                break;
            case 'voice':
                ctx.telegram.sendVoice(
                    userId,
                    ctx.message.voice.file_id,
                    {
                        'caption': ctx.message.caption
                    }
                );
                break;
            case 'video_note':
                ctx.telegram.sendVideoNote(
                    userId,
                    ctx.message.video_note.file_id
                );
                break;
            case 'video':
                ctx.telegram.sendVideo(
                    userId,
                    ctx.message.video.file_id,
                    {
                        'caption': ctx.message.caption
                    }
                );
                break;
            case 'audio':
                ctx.telegram.sendAudio(
                    userId,
                    ctx.message.audio.file_id,
                    {
                        'caption': ctx.message.caption
                    }
                );
                break;
            default:
                console.log('other');
    }
    } else {
        forwardToAdmin(ctx);
    }
});

bot.startPolling();
