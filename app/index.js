const Telegraf = require('telegraf');

let config = {
    "token": "930886942:AAGupiVd3KdVCKsVFCzEdUxbKSAW1xE5d3I", 
    "admin": 319423380 // id владельца бота
};

const bot = new Telegraf(config.token, {

    }
);

let replyText = {
    "helloAdmin": "Доброе утро, создатель. Чем могу помочь? ^^",
    "helloUser":  "Приветствую, отправьте мне сообщение. Я передам его хозяину! *-*",
    "replyWrong": "Для ответа пользователю используйте функцию Ответить/Reply."
};

let isAdmin = (userId) => {
    return userId == config.admin;
};

let forwardToAdmin = (ctx) => {
    if (isAdmin(ctx.message.from.id)) {
        ctx.reply(replyText.replyWrong);
    } else {
        ctx.forwardMessage(config.admin, ctx.from.id, ctx.message.id);
    }
};

bot.start((ctx) => {
    ctx.reply(isAdmin(ctx.message.from.id)
        ? replyText.helloAdmin
        : replyText.helloUser);
});

bot.on('message', (ctx) => {
    if (ctx.message.reply_to_message
        && ctx.message.reply_to_message.forward_from
        && isAdmin(ctx.message.from.id)) {
        ctx.telegram.sendCopy(ctx.message.reply_to_message.forward_from.id, ctx.message);
    } else {
        forwardToAdmin(ctx);
    }
});
bot.launch();